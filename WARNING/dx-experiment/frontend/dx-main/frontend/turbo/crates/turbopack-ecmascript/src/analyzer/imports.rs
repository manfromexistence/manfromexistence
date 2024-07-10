use std::{collections::BTreeMap, fmt::Display, mem::take};

use indexmap::{IndexMap, IndexSet};
use once_cell::sync::Lazy;
use swc_core::{
    common::{source_map::Pos, Span},
    ecma::{
        ast::*,
        atoms::{js_word, JsWord},
        visit::{Visit, VisitWith},
    },
};
use turbo_tasks::Vc;
use turbopack_core::{issue::IssueSource, source::Source};

use super::{JsValue, ModuleValue};
use crate::utils::unparen;

#[turbo_tasks::value(serialization = "auto_for_input")]
#[derive(Default, Debug, Clone, Hash, PartialOrd, Ord)]
pub struct ImportAnnotations {
    // TODO store this in more structured way
    #[turbo_tasks(trace_ignore)]
    map: BTreeMap<JsWord, Option<JsWord>>,
}

/// Enables a specified transtion for the annotated import
static ANNOTATION_TRANSITION: Lazy<JsWord> = Lazy::new(|| "transition".into());

/// Changes the chunking type for the annotated import
static ANNOTATION_CHUNKING_TYPE: Lazy<JsWord> = Lazy::new(|| "chunking-type".into());

impl ImportAnnotations {
    fn insert(&mut self, key: JsWord, value: Option<JsWord>) {
        self.map.insert(key, value);
    }

    fn clear(&mut self) {
        self.map.clear();
    }

    /// Returns the content on the transition annotation
    pub fn transition(&self) -> Option<&str> {
        self.map
            .get(&ANNOTATION_TRANSITION)
            .and_then(|w| w.as_ref().map(|w| &**w))
    }

    /// Returns the content on the chunking-type annotation
    pub fn chunking_type(&self) -> Option<&str> {
        self.map
            .get(&ANNOTATION_CHUNKING_TYPE)
            .and_then(|w| w.as_ref().map(|w| &**w))
    }
}

impl Display for ImportAnnotations {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut it = self.map.iter();
        if let Some((k, v)) = it.next() {
            if let Some(v) = v {
                write!(f, "{{ {k}: {v}")?
            } else {
                write!(f, "{{ {k}")?
            }
        } else {
            return f.write_str("{}");
        };
        for (k, v) in it {
            if let Some(v) = v {
                write!(f, "; {k}: {v}")?
            } else {
                write!(f, "; {k}")?
            }
        }
        f.write_str(" }")
    }
}

#[derive(Debug)]
pub(crate) enum Reexport {
    Star,
    Namespace { exported: JsWord },
    Named { imported: JsWord, exported: JsWord },
}

/// The storage for all kinds of imports.
///
/// Note that when it's initialized by calling `analyze`, it only contains ESM
/// import/exports.
#[derive(Default, Debug)]
pub(crate) struct ImportMap {
    /// Map from identifier to (index in references, exported symbol)
    imports: IndexMap<Id, (usize, JsWord)>,

    /// Map from identifier to index in references
    namespace_imports: IndexMap<Id, usize>,

    /// List of (index in references, imported symbol, exported symbol)
    reexports: Vec<(usize, Reexport)>,

    /// Ordered list of imported symbols
    references: IndexSet<ImportMapReference>,

    /// True, when the module has exports
    has_exports: bool,
}

#[derive(Debug, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub(crate) enum ImportedSymbol {
    ModuleEvaluation,
    Symbol(JsWord),
    Namespace,
}

#[derive(Debug, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub(crate) struct ImportMapReference {
    pub module_path: JsWord,
    pub imported_symbol: ImportedSymbol,
    pub annotations: ImportAnnotations,
    pub issue_source: Option<Vc<IssueSource>>,
}

impl ImportMap {
    pub fn is_esm(&self) -> bool {
        self.has_exports || !self.imports.is_empty() || !self.namespace_imports.is_empty()
    }

    pub fn get_import(&self, id: &Id) -> Option<JsValue> {
        if let Some((i, i_sym)) = self.imports.get(id) {
            let r = &self.references[*i];
            return Some(JsValue::member(
                Box::new(JsValue::Module(ModuleValue {
                    module: r.module_path.clone(),
                    annotations: r.annotations.clone(),
                })),
                Box::new(i_sym.clone().into()),
            ));
        }
        if let Some(i) = self.namespace_imports.get(id) {
            let r = &self.references[*i];
            return Some(JsValue::Module(ModuleValue {
                module: r.module_path.clone(),
                annotations: r.annotations.clone(),
            }));
        }
        None
    }

    // TODO this could return &str instead of String to avoid cloning
    pub fn get_binding(&self, id: &Id) -> Option<(usize, Option<String>)> {
        if let Some((i, i_sym)) = self.imports.get(id) {
            return Some((*i, Some(i_sym.to_string())));
        }
        if let Some(i) = self.namespace_imports.get(id) {
            return Some((*i, None));
        }
        None
    }

    pub fn references(&self) -> impl Iterator<Item = &ImportMapReference> {
        self.references.iter()
    }

    pub fn reexports(&self) -> impl Iterator<Item = (usize, &Reexport)> {
        self.reexports.iter().map(|(i, r)| (*i, r))
    }

    /// Analyze ES import
    pub(super) fn analyze(m: &Program, source: Option<Vc<Box<dyn Source>>>) -> Self {
        let mut data = ImportMap::default();

        m.visit_with(&mut Analyzer {
            data: &mut data,
            current_annotations: ImportAnnotations::default(),
            source,
        });

        data
    }
}

struct Analyzer<'a> {
    data: &'a mut ImportMap,
    current_annotations: ImportAnnotations,
    source: Option<Vc<Box<dyn Source>>>,
}

impl<'a> Analyzer<'a> {
    fn ensure_reference(
        &mut self,
        span: Span,
        module_path: JsWord,
        imported_symbol: ImportedSymbol,
        annotations: ImportAnnotations,
    ) -> usize {
        let issue_source = self
            .source
            .map(|s| IssueSource::from_swc_offsets(s, span.lo.to_usize(), span.hi.to_usize()));

        let r = ImportMapReference {
            module_path,
            imported_symbol,
            issue_source,
            annotations,
        };
        if let Some(i) = self.data.references.get_index_of(&r) {
            i
        } else {
            let i = self.data.references.len();
            self.data.references.insert(r);
            i
        }
    }
}

fn to_word(name: &ModuleExportName) -> JsWord {
    match name {
        ModuleExportName::Ident(ident) => ident.sym.clone(),
        ModuleExportName::Str(str) => str.value.clone(),
    }
}

impl Visit for Analyzer<'_> {
    fn visit_module_item(&mut self, n: &ModuleItem) {
        if let ModuleItem::Stmt(Stmt::Expr(ExprStmt { expr, .. })) = n {
            if let Expr::Lit(Lit::Str(s)) = unparen(expr) {
                if s.value.starts_with("TURBOPACK") {
                    let value = &*s.value;
                    let value = value["TURBOPACK".len()..].trim();
                    if !value.starts_with('{') || !value.ends_with('}') {
                        // TODO report issue
                    } else {
                        value[1..value.len() - 1]
                            .trim()
                            .split(';')
                            .map(|p| p.trim())
                            .filter(|p| !p.is_empty())
                            .for_each(|part| {
                                if let Some(colon) = part.find(':') {
                                    self.current_annotations.insert(
                                        part[..colon].trim_end().into(),
                                        Some(part[colon + 1..].trim_start().into()),
                                    );
                                } else {
                                    self.current_annotations.insert(part.into(), None);
                                }
                            })
                    }
                    n.visit_children_with(self);
                    return;
                }
            }
        }
        n.visit_children_with(self);
        self.current_annotations.clear();
    }

    fn visit_import_decl(&mut self, import: &ImportDecl) {
        let annotations = take(&mut self.current_annotations);
        self.ensure_reference(
            import.span,
            import.src.value.clone(),
            ImportedSymbol::ModuleEvaluation,
            annotations.clone(),
        );

        for s in &import.specifiers {
            let symbol = get_import_symbol_from_import(s);
            let i = self.ensure_reference(
                import.span,
                import.src.value.clone(),
                symbol,
                annotations.clone(),
            );

            let (local, orig_sym) = match s {
                ImportSpecifier::Named(ImportNamedSpecifier {
                    local, imported, ..
                }) => match imported {
                    Some(imported) => (local.to_id(), orig_name(imported)),
                    _ => (local.to_id(), local.sym.clone()),
                },
                ImportSpecifier::Default(s) => (s.local.to_id(), "default".into()),
                ImportSpecifier::Namespace(s) => {
                    self.data.namespace_imports.insert(s.local.to_id(), i);
                    continue;
                }
            };

            self.data.imports.insert(local, (i, orig_sym));
        }
    }

    fn visit_export_all(&mut self, export: &ExportAll) {
        self.data.has_exports = true;

        let annotations = take(&mut self.current_annotations);
        self.ensure_reference(
            export.span,
            export.src.value.clone(),
            ImportedSymbol::ModuleEvaluation,
            annotations.clone(),
        );
        let i = self.ensure_reference(
            export.span,
            export.src.value.clone(),
            ImportedSymbol::Namespace,
            annotations,
        );
        self.data.reexports.push((i, Reexport::Star));
    }

    fn visit_named_export(&mut self, export: &NamedExport) {
        self.data.has_exports = true;
        if let Some(ref src) = export.src {
            let annotations = take(&mut self.current_annotations);

            self.ensure_reference(
                export.span,
                src.value.clone(),
                ImportedSymbol::ModuleEvaluation,
                annotations.clone(),
            );

            for spec in export.specifiers.iter() {
                let symbol = get_import_symbol_from_export(spec);

                let i = self.ensure_reference(
                    export.span,
                    src.value.clone(),
                    symbol,
                    annotations.clone(),
                );

                match spec {
                    ExportSpecifier::Namespace(n) => {
                        self.data.reexports.push((
                            i,
                            Reexport::Namespace {
                                exported: to_word(&n.name),
                            },
                        ));
                    }
                    ExportSpecifier::Default(d) => {
                        self.data.reexports.push((
                            i,
                            Reexport::Named {
                                imported: js_word!("default"),
                                exported: d.exported.sym.clone(),
                            },
                        ));
                    }
                    ExportSpecifier::Named(n) => {
                        self.data.reexports.push((
                            i,
                            Reexport::Named {
                                imported: to_word(&n.orig),
                                exported: to_word(n.exported.as_ref().unwrap_or(&n.orig)),
                            },
                        ));
                    }
                }
            }
        }
    }

    fn visit_export_decl(&mut self, _: &ExportDecl) {
        self.data.has_exports = true;
    }
    fn visit_export_default_decl(&mut self, _: &ExportDefaultDecl) {
        self.data.has_exports = true;
    }
    fn visit_export_default_expr(&mut self, _: &ExportDefaultExpr) {
        self.data.has_exports = true;
    }
    fn visit_stmt(&mut self, _: &Stmt) {
        // don't visit children
    }
}

pub(crate) fn orig_name(n: &ModuleExportName) -> JsWord {
    match n {
        ModuleExportName::Ident(v) => v.sym.clone(),
        ModuleExportName::Str(v) => v.value.clone(),
    }
}

fn get_import_symbol_from_import(specifier: &ImportSpecifier) -> ImportedSymbol {
    match specifier {
        ImportSpecifier::Named(ImportNamedSpecifier {
            local, imported, ..
        }) => ImportedSymbol::Symbol(match imported {
            Some(imported) => orig_name(imported),
            _ => local.sym.clone(),
        }),
        ImportSpecifier::Default(..) => ImportedSymbol::Symbol(js_word!("default")),
        ImportSpecifier::Namespace(..) => ImportedSymbol::Namespace,
    }
}

fn get_import_symbol_from_export(specifier: &ExportSpecifier) -> ImportedSymbol {
    match specifier {
        ExportSpecifier::Named(ExportNamedSpecifier { orig, .. }) => {
            ImportedSymbol::Symbol(orig_name(orig))
        }
        ExportSpecifier::Default(..) => ImportedSymbol::Symbol(js_word!("default")),
        ExportSpecifier::Namespace(..) => ImportedSymbol::Namespace,
    }
}
