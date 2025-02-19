# @udecode/plate-ui

## 0.0.3

### Patch Changes

- [#3697](https://github.com/udecode/plate/pull/3697) by [@zbeyens](https://github.com/zbeyens) – shadcn sync

## 34.0.2

### Patch Changes

- [#3239](https://github.com/udecode/plate/pull/3239) by [@kumarajay0412](https://github.com/kumarajay0412) – refactor node type determination logic in turn-into-dropdown component

- [#3239](https://github.com/udecode/plate/pull/3239) by [@kumarajay0412](https://github.com/kumarajay0412) – refactor type determination logic in turn-into-dropdown component

## 31.0.0

### Minor Changes

- [#3040](https://github.com/udecode/plate/pull/3040) by [@zbeyens](https://github.com/zbeyens) – Updated minor dependencies

## 30.6.2

### Patch Changes

- [`a350e4364`](https://github.com/udecode/plate/commit/a350e436441389471bd5ff633221db71dd6c7241) by [@zbeyens](https://github.com/zbeyens) – `npx @udecode/plate-ui@latest init` should now create `plate-components.json` instead of `components.json`

## 30.3.3

### Patch Changes

- [#2913](https://github.com/udecode/plate/pull/2913) by [@zbeyens](https://github.com/zbeyens) – fix tw prefix

## 30.2.0

### Minor Changes

- [#2887](https://github.com/udecode/plate/pull/2887) by [@zbeyens](https://github.com/zbeyens) – add automatic config detection for Next.js, add support for devDependencies

## 30.1.1

### Patch Changes

- [#2879](https://github.com/udecode/plate/pull/2879) by [@zbeyens](https://github.com/zbeyens) – 🔧 add `@udecode/cn` dependency to cli `init`

## 30.1.0

### Minor Changes

- [#2877](https://github.com/udecode/plate/pull/2877) by [@zbeyens](https://github.com/zbeyens) –
  - add support for `plate-components.json` to avoid conflict with shadcn's `components.json`. If `plate-components.json` does not exist, `components.json` will be used.
  - add support for custom ui dir in `components.json`: use `aliases > plate-ui`.

## 29.0.0

### Minor Changes

- [#2829](https://github.com/udecode/plate/pull/2829) by [@zbeyens](https://github.com/zbeyens) –
  - Remove `utils` aliases: `@udecode/cn` dependency is now used
  - Remove `clsx` dependency

## 28.1.0

### Minor Changes

- [#2824](https://github.com/udecode/plate/pull/2824) by [@zbeyens](https://github.com/zbeyens) –
  - add support for custom tailwind prefix
  - minify build

## 24.1.1

### Patch Changes

- [`7b13d52a`](https://github.com/udecode/plate/commit/7b13d52a1de3639098eb19bbb2e2cba26659b988) by [@zbeyens](https://github.com/zbeyens) –
  - Fixes #2641

## 24.1.0

### Minor Changes

- [#2642](https://github.com/udecode/plate/pull/2642) by [@zbeyens](https://github.com/zbeyens) –
  - Add command `-a` for adding all available components

## 22.0.3

### Patch Changes

- [#2499](https://github.com/udecode/plate/pull/2499) by [@zbeyens](https://github.com/zbeyens) – use single quote instead of double quote

## 22.0.0

### Major Changes

- [#2471](https://github.com/udecode/plate/pull/2471) by [@zbeyens](https://github.com/zbeyens) – This package is now a CLI to generate components. Install it as a dev dependency. See https://platejs.org/docs/components/cli.
