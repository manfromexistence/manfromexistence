module.exports = {

"[project]/postcss.config.mjs [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/postcss.config.mjs'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[externals]/ [external] (path, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("path");

module.exports = mod;
}}),
"[project]/postcss.config.mjs/transform.ts { CONFIG => \"[project]/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>transform),
    "init": (()=>init)
});
(()=>{
    const e = new Error("Cannot find module '@vercel/turbopack/postcss'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
// @ts-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$postcss$2e$config$2e$mjs__$5b$postcss$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/postcss.config.mjs [postcss] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (path, cjs)");
;
;
;
const contextDir = process.cwd();
function toPath(file) {
    const relPath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__["relative"])(contextDir, file);
    if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__["isAbsolute"])(relPath)) {
        throw new Error(`Cannot depend on path (${file}) outside of root directory (${contextDir})`);
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__["sep"] !== "/" ? relPath.replaceAll(__TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$path$2c$__cjs$29$__["sep"], "/") : relPath;
}
let processor;
const init = async (ipc)=>{
    let config = __TURBOPACK__imported__module__$5b$project$5d2f$postcss$2e$config$2e$mjs__$5b$postcss$5d$__$28$ecmascript$29$__["default"];
    if (typeof config === "function") {
        config = await config({
            env: "development"
        });
    }
    if (typeof config === "undefined") {
        throw new Error("PostCSS config is undefined (make sure to export an function or object from config file)");
    }
    let plugins;
    if (Array.isArray(config.plugins)) {
        plugins = config.plugins.map((plugin)=>{
            if (Array.isArray(plugin)) {
                return plugin;
            } else if (typeof plugin === "string") {
                return [
                    plugin,
                    {}
                ];
            } else {
                return plugin;
            }
        });
    } else if (typeof config.plugins === "object") {
        plugins = Object.entries(config.plugins).filter(([, options])=>options);
    } else {
        plugins = [];
    }
    const loadedPlugins = plugins.map((plugin)=>{
        if (Array.isArray(plugin)) {
            const [arg, options] = plugin;
            let pluginFactory = arg;
            if (typeof pluginFactory === "string") {
                pluginFactory = __turbopack_external_require__(pluginFactory);
            }
            if (pluginFactory.default) {
                pluginFactory = pluginFactory.default;
            }
            return pluginFactory(options);
        }
        return plugin;
    });
    processor = postcss(loadedPlugins);
};
async function transform(ipc, cssContent, name) {
    const { css, map, messages } = await processor.process(cssContent, {
        from: name,
        to: name,
        map: {
            inline: false,
            annotation: false
        }
    });
    const assets = [];
    for (const msg of messages){
        switch(msg.type){
            case "asset":
                assets.push({
                    file: msg.file,
                    content: msg.content,
                    sourceMap: typeof msg.sourceMap === "string" ? msg.sourceMap : JSON.stringify(msg.sourceMap)
                });
                break;
            case "file-dependency":
            case "missing-dependency":
                ipc.sendInfo({
                    type: "fileDependency",
                    path: toPath(msg.file)
                });
                break;
            case "build-dependency":
                ipc.sendInfo({
                    type: "buildDependency",
                    path: toPath(msg.file)
                });
                break;
            case "dir-dependency":
                ipc.sendInfo({
                    type: "dirDependency",
                    path: toPath(msg.dir),
                    glob: msg.glob
                });
                break;
            case "context-dependency":
                ipc.sendInfo({
                    type: "dirDependency",
                    path: toPath(msg.file),
                    glob: "**"
                });
                break;
            default:
                break;
        }
    }
    return {
        css,
        map: JSON.stringify(map),
        assets
    };
}
}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/at-rule.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/at-rule.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/tokenize.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/tokenize.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/terminal-highlight.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/terminal-highlight.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/css-syntax-error.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/css-syntax-error.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/stringifier.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/stringifier.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/stringify.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/stringify.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/node.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/node.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/comment.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/comment.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/document.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/document.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/lazy-result.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/lazy-result.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/list.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/list.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/rule.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/rule.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/parser.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/parser.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/parse.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/parse.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/warning.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/warning.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/result.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/result.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/postcss.js [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/postcss.js'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/postcss.mjs [postcss] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/node_modules/.pnpm/postcss@8.5.1/node_modules/postcss/lib/postcss.mjs'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__df9ecf._.js.map