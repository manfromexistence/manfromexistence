const eslint = require('eslint');
const rule = require('./mui-name-matches-component-name');

const ruleTester = new eslint.RuleTester({ parser: require.resolve('@typescript-eslint/parser') });
ruleTester.run('mui-name-matches-component-name', rule, {
  valid: [
    `
      const StaticDateRangePicker = React.forwardRef(function StaticDateRangePicker<TDate>(
        inProps: StaticDateRangePickerProps<TDate>,
        ref: React.Ref<HTMLDivElement>,
      ) {
        const props = useThemeProps({ props: inProps, name: 'MuiStaticDateRangePicker' });
      });
    `,
    `
      function CssBaseline(inProps) {
        useThemeProps({ props: inProps, name: 'MuiCssBaseline' });
      }
    `,
    `
    const Container = createContainer({
      createStyledComponent: styled('div', {
        name: 'MuiContainer',
        slot: 'Root',
        overridesResolver: (props, styles) => {
          const { ownerState } = props;

          return [
            styles.root,
            ownerState.fixed && styles.fixed,
            ownerState.disableGutters && styles.disableGutters,
          ];
        },
      }),
      useThemeProps: (inProps) => useThemeProps({ props: inProps, name: 'MuiContainer' }),
    });
    `,
    `
    const Grid2 = createGrid2({
      createStyledComponent: styled('div', {
        name: 'MuiGrid2',
        overridesResolver: (props, styles) => styles.root,
      }),
      componentName: 'MuiGrid2',
      useThemeProps: (inProps) => useThemeProps({ props: inProps, name: 'MuiGrid2' }),
    }) as OverridableComponent<Grid2TypeMap>;
    `,
    `
    const useThemeProps = createUseThemeProps('MuiBadge');
    `,
    {
      code: `
        const StaticDateRangePicker = React.forwardRef(function StaticDateRangePicker<TDate>(
          inProps: StaticDateRangePickerProps<TDate>,
          ref: React.Ref<HTMLDivElement>,
        ) {
          const props = useDatePickerDefaultizedProps(inProps, 'MuiStaticDateRangePicker');
        });
      `,
      options: [{ customHooks: ['useDatePickerDefaultizedProps'] }],
    },
    {
      code: `
        function useDatePickerDefaultizedProps(props, name) {
          useThemeProps({ props, name });
        }
      `,
      options: [{ customHooks: ['useDatePickerDefaultizedProps'] }],
    },
  ],
  invalid: [
    {
      code: `
        const StaticDateRangePicker = React.forwardRef(function StaticDateRangePicker<TDate>(
          inProps: StaticDateRangePickerProps<TDate>,
          ref: React.Ref<HTMLDivElement>,
        ) {
          const props = useThemeProps({ props: inProps, name: 'MuiPickersDateRangePicker' });
        });
      `,
      errors: [
        {
          message:
            "Expected `name` to be 'MuiStaticDateRangePicker' but instead got 'MuiPickersDateRangePicker'.",
          type: 'Literal',
        },
      ],
    },
    {
      code: 'useThemeProps({ props: inProps })',
      errors: [
        {
          message: 'Unable to find `name` property. Did you forget to pass `name`?',
          type: 'ObjectExpression',
        },
      ],
    },
    {
      code: 'useThemeProps({ props: inProps, name })',
      errors: [
        {
          message:
            'Unable to resolve `name`. Please hardcode the `name` i.e. use a string literal.',
          type: 'Identifier',
        },
      ],
    },
    {
      code: "useThemeProps({ props: inProps, name: 'MuiPickersDateRangePicker' })",
      errors: [{ message: 'Unable to find component for this call.', type: 'CallExpression' }],
    },
    {
      code: `
        const StaticDateRangePicker = React.forwardRef(function StaticDateRangePicker<TDate>(
          inProps: StaticDateRangePickerProps<TDate>,
          ref: React.Ref<HTMLDivElement>,
        ) {
          const props = useDatePickerDefaultizedProps(inProps);
        });
      `,
      options: [{ customHooks: ['useDatePickerDefaultizedProps'] }],
      errors: [
        {
          message:
            "Unable to find name argument. Expected `useDatePickerDefaultizedProps(firstParameter, 'MuiComponent')`.",
          type: 'Identifier',
        },
      ],
    },
    {
      code: `
        const StaticDateRangePicker = React.forwardRef(function StaticDateRangePicker<TDate>(
          inProps: StaticDateRangePickerProps<TDate>,
          ref: React.Ref<HTMLDivElement>,
        ) {
          const props = useDatePickerDefaultizedProps(inProps, 'MuiPickersDateRangePicker');
        });
      `,
      options: [{ customHooks: ['useDatePickerDefaultizedProps'] }],
      errors: [
        {
          message:
            "Expected `name` to be 'MuiStaticDateRangePicker' but instead got 'MuiPickersDateRangePicker'.",
          type: 'Literal',
        },
      ],
    },
    {
      code: `
        const useThemeProps = createUseThemeProps();

        const Badge = React.forwardRef(function Badge(inProps, ref) {
          const props = useThemeProps({ props: inProps, name: 'MuiBadge' });
        });
      `,
      errors: [
        {
          message:
            'Unable to resolve `name`. Please hardcode the `name` i.e. use a string literal.',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: `
        const useThemeProps = createUseThemeProps({ name: 'MuiBadge' });

        const Badge = React.forwardRef(function Badge(inProps, ref) {
          const props = useThemeProps({ props: inProps, name: 'MuiBadge' });
        });
      `,
      errors: [
        {
          message:
            'Unable to resolve `name`. Please hardcode the `name` i.e. use a string literal.',
          type: 'ObjectExpression',
        },
      ],
    },
  ],
});
