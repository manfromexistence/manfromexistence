# @udecode/slate-react

## 41.0.5

### Patch Changes

- [`e57256d45ab53c7fb1cb76b8824e815301ee10c0`](https://github.com/udecode/plate/commit/e57256d45ab53c7fb1cb76b8824e815301ee10c0) by [@zbeyens](https://github.com/zbeyens) – Type

## 41.0.0

### Major Changes

- [#3830](https://github.com/udecode/plate/pull/3830) by [@felixfeng33](https://github.com/felixfeng33) – Rename `findNodePath` to `findPath` since the addition of `findNodePath` in the headless lib.

  We recommend using `findPath` mostly when subscribing to its value (e.g. in a React component) as it has O(path.length) complexity, compared to O(n) for the traversal-based `findNodePath`. This optimization is particularly important in:

  - Render functions of Plate components where using `findNodePath` would increase the initial render time by O(n²)
  - Key press handlers where using `findNodePath` would increase the handling time by O(n)

  where n is the number of nodes in the editor.

### Patch Changes

- [#3830](https://github.com/udecode/plate/pull/3830) by [@felixfeng33](https://github.com/felixfeng33) – Update `TRenderElementProps`, `TRenderLeafProps` types

## 40.3.1

## 40.2.8

## 40.0.0

### Major Changes

- [#3744](https://github.com/udecode/plate/pull/3744) by [@zbeyens](https://github.com/zbeyens) –
  - Add `slate-dom` as a peer dependency
  - Update `slate-react` peer dependency to `>=0.111.0`

## 39.2.1

## 39.1.4

### Patch Changes

- [#3616](https://github.com/udecode/plate/pull/3616) by [@zbeyens](https://github.com/zbeyens) –
  - Add `setNode`

## 39.0.0

## 38.0.4

## 38.0.3

## 38.0.1

## 37.0.0

### Major Changes

- [#3420](https://github.com/udecode/plate/pull/3420) by [@zbeyens](https://github.com/zbeyens) – Types:

  - Remove `TReactEditor` type, as it's now integrated into the main `TEditor` type in `@udecode/slate`. Use `TEditor` instead.
  - Replace `V extends Value` with `E extends TEditor` for improved type inference
  - NEW `TEditableProps`, `TRenderElementProps`

## 36.0.6

## 36.0.3

### Patch Changes

- [#3346](https://github.com/udecode/plate/pull/3346) by [@yf-yang](https://github.com/yf-yang) – feat: expose onValueChange and onSelectionChange from Slate component, following https://github.com/ianstormtaylor/slate/pull/5526

## 33.0.0

## 32.0.1

## 31.0.0

## 29.0.1

## 29.0.0

## 25.0.0

## 24.4.0

### Minor Changes

- [#2675](https://github.com/udecode/plate/pull/2675) by [@zbeyens](https://github.com/zbeyens) – Support slate-react 0.99.0

## 24.3.6

## 24.3.5

## 24.3.2

## 24.3.1

## 24.3.0

## 24.0.0

### Minor Changes

- [#2629](https://github.com/udecode/plate/pull/2629) by [@zbeyens](https://github.com/zbeyens) –
  - Add `focusEditorEdge` transform. Focus the editor at the start or end of the document.

## 23.7.4

## 22.0.2

## 22.0.1

### Patch Changes

- [`cc893ea`](https://github.com/udecode/plate/commit/cc893ea408c3d9abcef5b67cb00fa2b93a5686fe) by [@zbeyens](https://github.com/zbeyens) – Upgraded peer dep `"slate-react": ">=0.95.0"` (patch to v22).

## 21.4.1

## 21.3.0

## 21.0.0

## 19.7.1
