# Migrating from deprecated APIs

<p class="description">Learn how to migrate away from recently deprecated APIs before they become breaking changes.</p>

## Why you should migrate

Features become deprecated over time as maintainers make improvements to the APIs.
Migrating to these improved APIs results in a better developer experience, so it's in your best interest to stay up to date.
Deprecated APIs often become breaking changes in subsequent major versions, so the sooner you migrate, the smoother the next major update will be.

## Migrating

Material UI provides the `deprecations/all` codemod to help you stay up to date with minimal effort.

```bash
npx @mui/codemod@latest deprecations/all <path>
```

This command runs all the current [deprecations codemods](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#deprecations), automatically migrating to the updated API.
You can run this codemod as often as necessary to keep up with the latest changes.

:::info

If you need to manually migrate from a deprecated API, you can find examples below for all deprecations that have been added in Material UI v5.
If you need to run a specific codemod, those are also linked below.

:::

## Package-wide deprecated APIs

### Inner element overrides

The `slots` and `slotProps` APIs are in the process of being standardized.
The analogous APIs—`components`, `componentsProps`, `<SlotName>Component`, and `<SlotName>Props`—are going to be deprecated and eventually removed.
This improves the developer experience through consistency, predictability, and reduced cognitive load.

### Composed CSS classes

The composed CSS classes are going to be deprecated and eventually removed in favor of atomic class alternatives.
For example, the `.MuiAccordionSummary-contentGutters` class was deprecated in favor of the `.MuiAccordionSummary-gutters` and `.MuiAccordionSummary-content` classes.
This improves the developer experience by reducing bloat and cognitive load.

## Accordion

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

### TransitionComponent

The Accordion's `TransitionComponent` was deprecated in favor of `slots.transition`:

```diff
 <Accordion
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
 />
```

### TransitionProps

The Accordion's `TransitionProps` was deprecated in favor of `slotProps.transition`:

```diff
 <Accordion
-  TransitionProps={{ unmountOnExit: true }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

## AccordionSummary

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-summary-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/accordion-summary-classes <path>
```

### .MuiAccordionSummary-contentGutters

The AccordionSummary's `.MuiAccordionSummary-contentGutters` class was deprecated in favor of the `.MuiAccordionSummary-gutters` and `.MuiAccordionSummary-content` classes.
Bear in mind that the `.MuiAccordionSummary-gutters` class is applied to the component's root, whereas the `.MuiAccordionSummary-contentGutters` and `.MuiAccordionSummary-content` classes are applied to the content element.

```diff
-.MuiAccordionSummary-root .MuiAccordionSummary-contentGutters
+.MuiAccordionSummary-root.MuiAccordionSummary-gutters .MuiAccordionSummary-content
 />
```

```diff
 import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

 MuiAccordionSummary: {
   styleOverrides: {
     root: {
-      [`& .${accordionSummaryClasses.contentGutters}`]: {
+      [`&.${accordionSummaryClasses.gutters} .${accordionSummaryClasses.content}`]: {
         color: 'red',
        },
     },
   },
 },
```

## Alert

Use the [alert-props](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-props) and [alert-classes](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-classes) codemods below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/alert-props <path>
npx @mui/codemod@latest deprecations/alert-classes <path>
```

### components

The Alert's `components` was deprecated in favor of `slots`:

```diff
 <Alert
-  components={{ CloseButton: CustomButton }}
+  slots={{ closeButton: CustomButton }}
 />
```

### componentsProps

The Alert's `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Alert
-  componentsProps={{ closeButton: { testid: 'test-id' } }}
+  slotProps={{ closeButton: { testid: 'test-id' } }}
 />
```

### Composed CSS classes

The CSS classes that composed the `severity` (or `variant`) and `color` prop values were removed.

Here's how to migrate:

```diff
-.MuiAlert-standardSuccess
+.MuiAlert-standard.MuiAlert-colorSuccess
-.MuiAlert-standardInfo
+.MuiAlert-standard.MuiAlert-colorInfo
-.MuiAlert-standardWarning
+.MuiAlert-standard.MuiAlert-colorWarning
-.MuiAlert-standardError
+.MuiAlert-standard.MuiAlert-colorError
-.MuiAlert-outlinedSuccess
+.MuiAlert-outlined.MuiAlert-colorSuccess
-.MuiAlert-outlinedInfo
+.MuiAlert-outlined.MuiAlert-colorInfo
-.MuiAlert-outlinedWarning
+.MuiAlert-outlined.MuiAlert-colorWarning
-.MuiAlert-outlinedError
+.MuiAlert-outlined.MuiAlert-colorError
-.MuiAlert-filledSuccess
+.MuiAlert-filled.MuiAlert-colorSuccess
-.MuiAlert-filledInfo
+.MuiAlert-filled.MuiAlert-colorInfo
-.MuiAlert-filledWarning
+.MuiAlert-filled.MuiAlert-colorWarning
-.MuiAlert-filledError
+.MuiAlert-filled.MuiAlert-colorError
```

```diff
 import { alertClasses } from '@mui/material/Alert';

 MuiAlert: {
   styleOverrides: {
     root: {
-      [`&.${alertClasses.standardSuccess}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorSuccess}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.standardInfo}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorInfo}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.standardWarning}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorWarning}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.standardError}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorError}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.outlinedSuccess}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorSuccess}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.outlinedInfo}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorInfo}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.outlinedWarning}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorWarning}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.outlinedError}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorError}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.filledSuccess}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorSuccess}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.filledInfo}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorInfo}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.filledWarning}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorWarning}`]: {
         color: 'red',
        },
-      [`&.${alertClasses.filledError}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorError}`]: {
         color: 'red',
        },
     },
   },
 },
```

## Avatar

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#avatar-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/avatar-props <path>
```

### imgProps

The Avatar's `imgProps` was deprecated in favor of `slotProps.img`:

```diff
 <Avatar
-  imgProps={{
-    onError: () => {},
-    onLoad: () => {},
+  slotProps={{
+    img: {
+      onError: () => {},
+      onLoad: () => {},
+    }
   }}
 />;
```

## Backdrop

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#backdrop-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/backdrop-props <path>
```

### TransitionComponent

The Backdrop's `TransitionComponent` prop was deprecated in favor of `slots.transition`:

```diff
 <Slider
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
```

## Badge

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#badge-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/badge-props <path>
```

### components

The Badge's `components` was deprecated in favor of `slots`:

```diff
 <Badge
-  components={{ root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 />
```

### componentsProps

The Badge's `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Badge
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

## Button

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#button-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/button-classes <path>
```

### Composed CSS classes

The CSS classes composing the `variant` and `color` prop values, as well as those composing the `variant` and `size` prop values, along with the `icon` size CSS classes, have been removed.

Here's how to migrate:

```diff
-.MuiButton-textInherit
+.MuiButton-text.MuiButton-colorInherit
-.MuiButton-textPrimary
+.MuiButton-text.MuiButton-colorPrimary
-.MuiButton-textSecondary
+.MuiButton-text.MuiButton-colorSecondary
-.MuiButton-textSuccess
+.MuiButton-text.MuiButton-colorSuccess
-.MuiButton-textError
+.MuiButton-text.MuiButton-colorError
-.MuiButton-textInfo
+.MuiButton-text.MuiButton-colorInfo
-.MuiButton-textWarning
+.MuiButton-text.MuiButton-colorWarning
-.MuiButton-outlinedInherit
+.MuiButton-outlined.MuiButton-colorInherit
-.MuiButton-outlinedPrimary
+.MuiButton-outlined.MuiButton-colorPrimary
-.MuiButton-outlinedSecondary
+.MuiButton-outlined.MuiButton-colorSecondary
-.MuiButton-outlinedSuccess
+.MuiButton-outlined.MuiButton-colorSuccess
-.MuiButton-outlinedError
+.MuiButton-outlined.MuiButton-colorError
-.MuiButton-outlinedInfo
+.MuiButton-outlined.MuiButton-colorInfo
-.MuiButton-outlinedWarning
+.MuiButton-outlined.MuiButton-colorWarning
-.MuiButton-containedInherit
+.MuiButton-contained.MuiButton-colorInherit
-.MuiButton-containedPrimary
+.MuiButton-contained.MuiButton-colorPrimary
-.MuiButton-containedSecondary
+.MuiButton-contained.MuiButton-colorSecondary
-.MuiButton-containedSuccess
+.MuiButton-contained.MuiButton-colorSuccess
-.MuiButton-containedError
+.MuiButton-contained.MuiButton-colorError
-.MuiButton-containedInfo
+.MuiButton-contained.MuiButton-colorInfo
-.MuiButton-containedWarning
+.MuiButton-contained.MuiButton-colorWarning
-.MuiButton-textSizeSmall
+.MuiButton-text.MuiButton-sizeSmall
-.MuiButton-textSizeMedium
+.MuiButton-text.MuiButton-sizeMedium
-.MuiButton-textSizeLarge
+.MuiButton-text.MuiButton-sizeLarge
-.MuiButton-outlinedSizeSmall
+.MuiButton-outlined.MuiButton-sizeSmall
-.MuiButton-outlinedSizeMedium
+.MuiButton-outlined.MuiButton-sizeMedium
-.MuiButton-outlinedSizeLarge
+.MuiButton-outlined.MuiButton-sizeLarge
-.MuiButton-containedSizeSmall
+.MuiButton-contained.MuiButton-sizeSmall
-.MuiButton-containedSizeMedium
+.MuiButton-contained.MuiButton-sizeMedium
-.MuiButton-containedSizeLarge
+.MuiButton-contained.MuiButton-sizeLarge
-.MuiButton-root .MuiButton-iconSizeSmall
+.MuiButton-root.MuiButton-sizeSmall > .MuiButton-icon
-.MuiButton-root .MuiButton-iconSizeMedium
+.MuiButton-root.MuiButton-sizeMedium > .MuiButton-icon
-.MuiButton-root .MuiButton-iconSizeLarge
+.MuiButton-root.MuiButton-sizeLarge > .MuiButton-icon
```

```diff
 import { buttonClasses } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`&.${buttonClasses.textInherit}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorInherit}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textPrimary}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textSecondary}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textSuccess}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textError}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorError}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textInfo}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorInfo}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textWarning}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorWarning}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedInherit}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorInherit}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedPrimary}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedSecondary}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedSuccess}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedError}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorError}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedInfo}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorInfo}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedWarning}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorWarning}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedInherit}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorInherit}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedPrimary}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedSecondary}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedSuccess}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedError}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorError}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedInfo}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorInfo}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedWarning}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorWarning}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedSizeSmall}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedSizeMedium}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.containedSizeLarge}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textSizeSmall}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textSizeMedium}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.textSizeLarge}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedSizeSmall}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedSizeMedium}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
        },
-      [`&.${buttonClasses.outlinedSizeLarge}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
        },
-      [`& .${buttonClasses.iconSizeSmall}`]: {
+      [`&.${buttonClasses.sizeSmall} > .${buttonClasses.icon}`]: {
         color: 'red',
        },
-      [`& .${buttonClasses.iconSizeMedium}`]: {
+      [`&.${buttonClasses.sizeMedium} > .${buttonClasses.icon}`]: {
         color: 'red',
        },
-      [`& .${buttonClasses.iconSizeLarge}`]: {
+      [`&.${buttonClasses.sizeLarge} > .${buttonClasses.icon}`]: {
         color: 'red',
        },
     },
   },
 },
```

## ButtonGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#button-group-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/button-group-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `orientation` | `variant` and `grouped`
- `color`, `variant` and `grouped`

Here's how to migrate:

```diff
-.MuiButtonGroup-root .MuiButtonGroup-groupedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedVertical
+.MuiButtonGroup-root.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedText
+.MuiButtonGroup-root.MuiButtonGroup-text > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextVertical
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextPrimary
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextSecondary
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlined
+.MuiButtonGroup-root.MuiButtonGroup-outlined > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedVertical
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedPrimary
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedSecondary
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContained
+.MuiButtonGroup-root.MuiButtonGroup-contained > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedVertical
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedPrimary
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedSecondary
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
```

```diff

 import { buttonGroupClasses } from '@mui/material/ButtonGroup';

  MuiButtonGroup: {
   styleOverrides: {
     root: {
-      [`& .${buttonGroupClasses.groupedHorizontal}`]: {
+      [`&.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedVertical}`]: {
+      [`&.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedText}`]: {
+      [`&.${buttonGroupClasses.text} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextHorizontal}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextVertical}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextPrimary}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedTextSecondary}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlined}`]: {
+      [`&.${buttonGroupClasses.outlined} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedHorizontal}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedVertical}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedPrimary}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedOutlinedSecondary}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContained}`]: {
+      [`&.${buttonGroupClasses.contained} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedHorizontal}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedVertical}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedPrimary}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${buttonGroupClasses.groupedContainedSecondary}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
        },
   },
  },

```

## Chip

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#chip-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/chip-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `variant` | `clickable` | `deletable` and `color`
- `avatar` and `color` | `size`
- `icon` and `color` | `size`
- `deleteIcon` and `color` | `size`
- `label` and `size`

Here's how to migrate:

```diff
-.MuiChip-clickableColorPrimary
+.MuiChip-clickable.MuiChip-colorPrimary
-.MuiChip-clickableColorSecondary
+.MuiChip-clickable.MuiChip-colorSecondary
-.MuiChip-deletableColorPrimary
+.MuiChip-deletable.MuiChip-colorPrimary
-.MuiChip-deletableColorSecondary
+.MuiChip-deletable.MuiChip-colorSecondary
-.MuiChip-outlinedPrimary
+.MuiChip-outlined.MuiChip-colorPrimary
-.MuiChip-outlinedSecondary
+.MuiChip-outlined.MuiChip-colorSecondary
-.MuiChip-filledPrimary
+.MuiChip-filled.MuiChip-colorPrimary
-.MuiChip-filledSecondary
+.MuiChip-filled.MuiChip-colorSecondary
-.MuiChip-root .MuiChip-avatarSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-avatar
-.MuiChip-root .MuiChip-iconSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-icon
-.MuiChip-root .MuiChip-iconMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-icon
-.MuiChip-root .MuiChip-iconColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-icon
-.MuiChip-root .MuiChip-iconColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-icon
-.MuiChip-root .MuiChip-labelSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-label
-.MuiChip-root .MuiChip-labelMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-label
-.MuiChip-root .MuiChip-deleteIconSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconOutlinedColorPrimary
+.MuiChip-root.MuiChip-outlined.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconOutlinedColorSecondary
+.MuiChip-root.MuiChip-outlined.MuiChip-colorSecondary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconFilledColorPrimary
+.MuiChip-root.MuiChip-filled.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconFilledColorSecondary
+.MuiChip-root.MuiChip-filled.MuiChip-colorSecondary > .MuiChip-deleteIcon
```

```diff

 import { chipClasses } from '@mui/material/Chip';

  MuiChip: {
   styleOverrides: {
     root: {
-      [`&.${chipClasses.clickableColorPrimary}`]: {
+      [`&.${chipClasses.clickable}.${chipClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${chipClasses.clickableColorSecondary}`]: {
+      [`&.${chipClasses.clickable}.${chipClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`&.${chipClasses.deletableColorPrimary}`]: {
+      [`&.${chipClasses.deletable}.${chipClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${chipClasses.deletableColorSecondary}`]: {
+      [`&.${chipClasses.deletable}.${chipClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`&.${chipClasses.outlinedPrimary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${chipClasses.outlinedSecondary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`&.${chipClasses.filledPrimary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${chipClasses.filledSecondary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.avatarSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.avatar}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.avatarMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.avatar}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.avatarColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.avatar}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.avatarColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.avatar}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.iconSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.icon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.iconMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.icon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.iconColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.icon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.iconColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.icon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.labelSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.label}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.labelMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.label}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconOutlinedColorPrimary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconOutlinedColorSecondary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconFilledColorPrimary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
        },
-      [`& .${chipClasses.deleteIconFilledColorSecondary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
     },
     },
   },
  },

```

## Divider

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#divider-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/divider-props <path>
```

### light

The Divider's `light` prop was deprecated, Use `sx={{ opacity : "0.6" }}` (or any opacity):

```diff
 <Divider
-  light
+  sx={{ opacity : "0.6" }}
 />
```

## PaginationItem

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#pagination-item-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/pagination-item-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `variant` and `color` prop values were removed.

Here's how to migrate:

```diff
-.MuiPaginationItem-textPrimary
+.MuiPaginationItem-text.MuiPaginationItem-colorPrimary
-.MuiPaginationItem-outlinedPrimary
+.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary
-.MuiPaginationItem-textSecondary
+.MuiPaginationItem-text.MuiPaginationItem-colorSecondary
-.MuiPaginationItem-outlinedSecondary
+.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary
```

```diff
 import { paginationItemClasses } from '@mui/material/PaginationItem';

 MuiPaginationItem: {
   styleOverrides: {
     root: {
-      [`&.${paginationItemClasses.textPrimary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${paginationItemClasses.outlinedPrimary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
        },
-      [`&.${paginationItemClasses.textSecondary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
        },
-      [`&.${paginationItemClasses.outlinedSecondary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
        },
     },
   },
 },
```

## Slider

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#slider-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/slider-props <path>
```

### components

The Slider's `components` was deprecated in favor of `slots`:

```diff
 <Slider
-  components={{ Track: CustomTrack }}
+  slots={{ track: CustomTrack }}
 />
```

### componentsProps

The Slider's `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Slider
-  componentsProps={{ track: { testid: 'test-id' } }}
+  slotProps={{ track: { testid: 'test-id' } }}
 />
```

## ToggleButtonGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#toggle-button-group-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/toggle-button-group-classes <path>
```

### Composed CSS classes

The CSS classes composing the `orientation` prop value and `grouped` CSS class have been removed.

Here's how to migrate:

```diff
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedHorizontal
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-horizontal > .MuiToggleButtonGroup-grouped
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedVertical
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-vertical > .MuiToggleButtonGroup-grouped
```

```diff

 import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';

  MuiButtonGroup: {
   styleOverrides: {
     root: {
-      [`& .${toggleButtonGroupClasses.groupedHorizontal}`]: {
+      [`&.${toggleButtonGroupClasses.horizontal} > .${toggleButtonGroupClasses.grouped}`]: {
          color: 'red',
        },
-      [`& .${toggleButtonGroupClasses.groupedVertical}`]: {
+      [`&.${toggleButtonGroupClasses.vertical} > .${toggleButtonGroupClasses.grouped}`]: {
          color: 'red',
        },
   },
  },
```

## StepLabel

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#step-label-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/step-label-props <path>
```

### componentsProps

The StepLabel's `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <StepLabel
-  componentsProps={{ label: labelProps }}
+  slotProps={{ label: labelProps }}
 />
```

### StepIconComponent

The StepLabel's `StepIconComponent` was deprecated in favor of `slots.stepIcon`:

```diff
 <StepLabel
-  StepIconComponent={StepIconComponent}
+  slots={{ stepIcon: StepIconComponent }}
 />
```

### StepIconProps

The StepLabel's `StepIconProps` was deprecated in favor of `slotProps.stepIcon`:

```diff
 <StepLabel
-  StepIconProps={StepIconProps}
+  slotProps={{ stepIcon: StepIconProps }}
 />
```

## StepConnector

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#step-connector-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@next deprecations/step-connector-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `line` CSS class and `orientation` prop values were removed.

Here's how to migrate:

```diff
- .MuiStepConnector-lineHorizontal
+.MuiStepConnector-horizontal > .MuiStepConnector-line
- .MuiStepConnector-lineVertical
+.MuiStepConnector-vertical > .MuiStepConnector-line
```

```diff
 import { stepConnectorClasses } from '@mui/material/StepConnector';

 MuiStepConnector: {
   styleOverrides: {
     root: {
-      [`& .${stepConnectorClasses.lineHorizontal}`]: {
+      [`&.${stepConnectorClasses.horizontal} > .${stepConnectorClasses.line}`]: {
         color: 'red',
        },
-      [`& .${stepConnectorClasses.lineVertical}`]: {
+      [`&.${stepConnectorClasses.vertical} > .${stepConnectorClasses.line}`]: {
         color: 'red',
        },
     },
   },
 },
```
