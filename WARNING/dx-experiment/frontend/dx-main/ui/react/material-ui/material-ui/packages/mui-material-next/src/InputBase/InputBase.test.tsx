import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui-internal/test-utils';
import FormControl, { useFormControl } from '@mui/material-next/FormControl';
// TODO v6: replace with material-next/InputAdornment
import InputAdornment from '@mui/material/InputAdornment';
// TODO v6: replace with material-next/TextField
import TextField from '@mui/material/TextField';
// TODO v6: replace with material-next/Select
import Select from '@mui/material/Select';
import InputBase, { inputBaseClasses as classes } from '@mui/material-next/InputBase';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import {
  InputBaseInputSlotPropsOverrides,
  InputBaseOwnerState,
  InputBaseProps,
} from './InputBase.types';
import describeConformance from '../../test/describeConformance';

describe('<InputBase />', () => {
  const { render } = createRenderer();

  describeConformance(<InputBase />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInputBase',
    testVariantProps: { size: 'small' },
    testLegacyComponentsProp: false,
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    slots: {
      root: { expectedClassName: classes.root },
      input: { expectedClassName: classes.input, testWithElement: 'input' },
    },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render an <input /> inside the div', () => {
    const { container } = render(<InputBase />);
    const input = container.querySelector('input');
    expect(input).to.have.attribute('type', 'text');
    expect(input).to.have.class(classes.input);
    expect(input).not.to.have.attribute('required');
  });

  it('should add the right class when size is small', () => {
    const { container } = render(<InputBase size="small" />);
    expect(container.firstChild).to.have.class(classes.sizeSmall);
  });

  describe('multiline', () => {
    describe('warning if multiline related props are passed without specifying the multiline prop', () => {
      ['rows', 'minRows', 'maxRows'].forEach((multilineProp) => {
        it(`warns if ${multilineProp} is passed without specifying multiline`, () => {
          const multilineErrorMessage = `MUI: You have set multiline props on an single-line input.\nSet the \`multiline\` prop if you want to render a multi-line input.\nOtherwise they will be ignored.\nIgnored props: ${multilineProp}`;
          expect(() => {
            render(<InputBase {...{ [multilineProp]: 1 }} />);
          }).toErrorDev([
            multilineErrorMessage,
            // React 18 Strict Effects run mount effects twice
            React.version.startsWith('18') && multilineErrorMessage,
          ]);
        });
      });
    });

    it('should render a `textbox` with `aria-multiline`', () => {
      render(<InputBase multiline />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      // implicit `aria-multiline`
      expect(textarea).to.have.tagName('textarea');
    });

    it('should render a `textbox` with `aria-multiline` if `rows` is specified', () => {
      render(<InputBase multiline rows={4} />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      // implicit `aria-multiline`
      expect(textarea).to.have.tagName('textarea');
    });

    it('should forward the value to the textarea', () => {
      render(<InputBase multiline maxRows={4} value="Hello" />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      expect(textarea).to.have.value('Hello');
    });

    it('should preserve state when changing rows', () => {
      const { setProps } = render(<InputBase multiline />);
      const textarea = screen.getByRole('textbox', { hidden: false });
      act(() => {
        textarea.focus();
      });

      setProps({ rows: 4 });

      expect(textarea).toHaveFocus();
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      const { container } = render(<InputBase disabled />);
      const input = container.querySelector('input');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.class(classes.disabled);
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { getByRole, setProps } = render(
        <InputBase onBlur={handleBlur} onFocus={handleFocus} />,
      );

      act(() => {
        getByRole('textbox').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });

      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });
  });

  describe('prop: readonly', () => {
    it('should render a readonly <input />', () => {
      const { getByRole } = render(<InputBase readOnly />);
      const input = getByRole('textbox');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.class(classes.readOnly);
      expect(input).to.have.property('readOnly');
    });
  });

  it('should fire event callbacks', () => {
    const handleChange = spy();
    const handleFocus = spy();
    const handleBlur = spy();
    const handleKeyUp = spy();
    const handleKeyDown = spy();
    const { getByRole } = render(
      <InputBase
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />,
    );
    const input = getByRole('textbox');

    // TODO v6: refactor this test with @testing-library/user-event
    // simulating user input: gain focus, key input (keydown, (input), change, keyup), blur
    act(() => {
      input.focus();
    });
    expect(handleFocus.callCount).to.equal(1);

    fireEvent.keyDown(input, { key: 'a' });
    expect(handleKeyDown.callCount).to.equal(1);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange.callCount).to.equal(1);

    fireEvent.keyUp(input, { key: 'a' });
    expect(handleKeyUp.callCount).to.equal(1);

    act(() => {
      input.blur();
    });
    expect(handleBlur.callCount).to.equal(1);
  });

  describe('controlled', () => {
    it('should considered [] as controlled', () => {
      const { getByRole } = render(<InputBase value={[]} />);
      const input = getByRole('textbox');

      expect(input).to.have.property('value', '');
      fireEvent.change(input, { target: { value: 'do not work' } });
      expect(input).to.have.property('value', '');
    });
  });

  describe('errors', () => {
    it("throws on change if the target isn't mocked", () => {
      /**
       * This component simulates a custom input component that hides the inner
       * input value for security reasons e.g. react-stripe-element.
       *
       * A ref is exposed to trigger a change event instead of using fireEvent.change
       */
      const BadInputComponent = React.forwardRef(function BadInputComponent(
        props: {
          onChange: (arg: Record<string, unknown>) => void;
        },
        ref,
      ) {
        const { onChange } = props;

        // simulates const handleChange = () => onChange({}) and passing that
        // handler to the onChange prop of `input`
        React.useImperativeHandle(ref, () => () => onChange({}));

        return <input />;
      });

      BadInputComponent.propTypes = {
        onChange: PropTypes.func.isRequired,
      };

      const triggerChangeRef = React.createRef<HTMLInputElement>();

      expect(() => {
        render(
          <InputBase
            slots={{ input: BadInputComponent }}
            slotProps={{
              input: {
                ref: triggerChangeRef,
              },
            }}
          />,
        );
      }).toErrorDev([
        'MUI: You have provided a `slots.input` to the input component\nthat does not correctly handle the `ref` prop.\nMake sure the `ref` prop is called with a HTMLInputElement.',
        // React 18 Strict Effects run mount effects twice
        React.version.startsWith('18') &&
          'MUI: You have provided a `slots.input` to the input component\nthat does not correctly handle the `ref` prop.\nMake sure the `ref` prop is called with a HTMLInputElement.',
      ]);
    });
  });

  // for InputBase, the `component` prop is called `inputComponent` so it's skipped
  // in describeConformance and manually tested here
  describe('prop: inputComponent', () => {
    it('should accept any html component', () => {
      const { getByTestId } = render(
        <InputBase
          inputComponent="span"
          slotProps={{
            input: { 'data-testid': 'input-component' } as InputBaseInputSlotPropsOverrides,
          }}
        />,
      );
      expect(getByTestId('input-component')).to.have.property('nodeName', 'SPAN');
    });

    it('should inject onBlur and onFocus', () => {
      let injectedProps: Record<string, unknown> = {};

      const MyInputBase = React.forwardRef(function MyInputBase(
        props: { ownerState: InputBaseOwnerState } & Record<string, unknown>,
        ref: React.ForwardedRef<HTMLInputElement>,
      ) {
        injectedProps = props;
        const { ownerState, ...other } = props;
        return <input ref={ref} {...other} />;
      });

      render(<InputBase inputComponent={MyInputBase} />);

      expect(typeof injectedProps.onBlur).to.equal('function');
      expect(typeof injectedProps.onFocus).to.equal('function');
    });

    describe('target mock implementations', () => {
      it('can just mock the value', () => {
        const MockedValue = React.forwardRef(function MockedValue(
          props: {
            onChange: React.ChangeEventHandler<HTMLInputElement>;
          },
          ref: React.ForwardedRef<HTMLInputElement>,
        ) {
          const { onChange } = props;

          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange({
              target: { value: event.target.value },
            } as React.ChangeEvent<HTMLInputElement>);
          };

          return <input ref={ref} onChange={handleChange} />;
        });
        MockedValue.propTypes = { onChange: PropTypes.func.isRequired };

        function FilledState(props: { 'data-testid': string }) {
          const formControlContext = useFormControl();
          return <span {...props}>filled: {String(formControlContext?.filled)}</span>;
        }

        const { getByRole, getByTestId } = render(
          <FormControl>
            <FilledState data-testid="filled" />
            <InputBase inputComponent={MockedValue} />
          </FormControl>,
        );
        expect(getByTestId('filled')).to.have.text('filled: false');

        fireEvent.change(getByRole('textbox'), { target: { value: 1 } });
        expect(getByTestId('filled')).to.have.text('filled: true');
      });

      it("can expose the input component's ref through the inputComponent prop", () => {
        const FullTarget = React.forwardRef(function FullTarget(
          props: { ownerState: InputBaseOwnerState } & Record<string, unknown>,
          ref: React.ForwardedRef<HTMLInputElement>,
        ) {
          const { ownerState, ...otherProps } = props;
          return <input ref={ref} {...otherProps} />;
        });

        function FilledState(props: { 'data-testid': string }) {
          const formControlContext = useFormControl();
          return <span {...props}>filled: {String(formControlContext?.filled)}</span>;
        }

        const { getByRole, getByTestId } = render(
          <FormControl>
            <FilledState data-testid="filled" />
            <InputBase inputComponent={FullTarget} />
          </FormControl>,
        );
        expect(getByTestId('filled')).to.have.text('filled: false');

        fireEvent.change(getByRole('textbox'), { target: { value: 1 } });
        expect(getByTestId('filled')).to.have.text('filled: true');
      });
    });
  });

  describe('with FormControl', () => {
    it('should have the formControl class', () => {
      const { getByTestId } = render(
        <FormControl>
          <InputBase data-testid="root" />
        </FormControl>,
      );
      expect(getByTestId('root')).to.have.class(classes.formControl);
    });

    describe('callbacks', () => {
      it('should fire the onClick prop', () => {
        const handleClick = spy();
        const handleFocus = spy();
        const { getByTestId } = render(
          <FormControl>
            <InputBase data-testid="root" onClick={handleClick} onFocus={handleFocus} />
          </FormControl>,
        );

        fireEvent.click(getByTestId('root'));
        expect(handleClick.callCount).to.equal(1);
        expect(handleFocus.callCount).to.equal(1);
      });
    });

    describe('error', () => {
      it('should be overridden by props', () => {
        function InputBaseInErrorForm(props: InputBaseProps) {
          return (
            <FormControl error>
              <InputBase data-testid="root" {...props} />
            </FormControl>
          );
        }

        const { getByTestId, setProps } = render(<InputBaseInErrorForm />);
        expect(getByTestId('root')).to.have.class(classes.error);

        setProps({ error: false });
        expect(getByTestId('root')).not.to.have.class(classes.error);

        setProps({ error: true });
        expect(getByTestId('root')).to.have.class(classes.error);
      });
    });

    describe('size', () => {
      it('should have the inputSizeSmall class in a dense context', () => {
        const { container } = render(
          <FormControl size="small">
            <InputBase />
          </FormControl>,
        );
        expect(container.querySelector('input')).to.have.class(classes.inputSizeSmall);
      });

      it('should be overridden by props', () => {
        function InputBaseInFormWithMargin(props: InputBaseProps) {
          return (
            <FormControl size="medium">
              <InputBase {...props} />
            </FormControl>
          );
        }
        const { container, setProps } = render(<InputBaseInFormWithMargin />);
        expect(container.querySelector('input')).not.to.have.class(classes.inputSizeSmall);

        setProps({ size: 'small' });
        expect(container.querySelector('input')).to.have.class(classes.inputSizeSmall);
      });

      it('has an inputHiddenLabel class to further reduce margin', () => {
        const { getByRole } = render(
          <FormControl hiddenLabel margin="dense">
            <InputBase />
          </FormControl>,
        );

        expect(getByRole('textbox')).to.have.class(classes.inputHiddenLabel);
      });
    });

    describe('required', () => {
      it('should have the aria-required prop with value true', () => {
        const { container } = render(
          <FormControl required>
            <InputBase />
          </FormControl>,
        );
        const input = container.querySelector('input');
        expect(input).to.have.property('required', true);
      });
    });

    type TestFormController = {
      onFocus: () => {};
      onBlur: () => {};
    };

    describe('focused', () => {
      it('prioritizes context focus', () => {
        const FormController = React.forwardRef((props, ref) => {
          const { onBlur, onFocus } = useFormControl() ?? {};

          React.useImperativeHandle(ref, () => ({ onBlur, onFocus }), [onBlur, onFocus]);

          return null;
        });
        const controlRef = React.createRef<TestFormController>();
        const { getByRole, getByTestId } = render(
          <FormControl>
            <FormController ref={controlRef} />
            <InputBase data-testid="root" />
          </FormControl>,
        );

        act(() => {
          getByRole('textbox').focus();
        });
        expect(getByTestId('root')).to.have.class(classes.focused);

        act(() => {
          controlRef.current?.onBlur();
        });

        expect(getByTestId('root')).not.to.have.class(classes.focused);

        act(() => {
          controlRef.current?.onFocus();
        });

        expect(getByTestId('root')).to.have.class(classes.focused);
      });

      it('propagates focused state', () => {
        function FocusedStateLabel(props: { 'data-testid': string; htmlFor: string }) {
          const formControlContext = useFormControl();
          return <label {...props}>focused: {String(formControlContext?.focused)}</label>;
        }
        const { getByRole, getByTestId } = render(
          <FormControl>
            <FocusedStateLabel data-testid="label" htmlFor="input" />
            <InputBase id="input" />
          </FormControl>,
        );
        expect(getByTestId('label')).to.have.text('focused: false');

        act(() => {
          getByRole('textbox').focus();
        });
        expect(getByTestId('label')).to.have.text('focused: true');

        act(() => {
          getByRole('textbox').blur();
        });
        expect(getByTestId('label')).to.have.text('focused: false');
      });
    });

    it('propagates filled state when uncontrolled', () => {
      function FilledStateLabel(props: { 'data-testid': string }) {
        const formControlContext = useFormControl();
        return <label {...props}>filled: {String(formControlContext?.filled)}</label>;
      }
      const { getByRole, getByTestId } = render(
        <FormControl>
          <FilledStateLabel data-testid="label" />
          <InputBase />
        </FormControl>,
      );
      expect(getByTestId('label')).to.have.text('filled: false');
      const textbox = getByRole('textbox');

      fireEvent.change(textbox, { target: { value: 'material' } });
      expect(getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(textbox, { target: { value: '0' } });
      expect(getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(textbox, { target: { value: '' } });
      expect(getByTestId('label')).to.have.text('filled: false');
    });

    it('propagates filled state when controlled', () => {
      function FilledStateLabel(props: { 'data-testid': string }) {
        const formControlContext = useFormControl();
        return <label {...props}>filled: {String(formControlContext?.filled)}</label>;
      }
      function ControlledInputBase(props: InputBaseProps) {
        return (
          <FormControl>
            <FilledStateLabel data-testid="label" />
            <InputBase {...props} />
          </FormControl>
        );
      }
      const { getByTestId, setProps } = render(<ControlledInputBase value="" />);
      expect(getByTestId('label')).to.have.text('filled: false');

      setProps({ value: 'material' });
      expect(getByTestId('label')).to.have.text('filled: true');

      setProps({ value: 0 });
      expect(getByTestId('label')).to.have.text('filled: true');

      setProps({ value: '' });
      expect(getByTestId('label')).to.have.text('filled: false');
    });

    describe('registering input', () => {
      it("should warn if more than one input is rendered regardless how it's nested", () => {
        expect(() => {
          render(
            <FormControl>
              <InputBase />
              <div>
                {/* should work regardless how it's nested */}
                <InputBase />
              </div>
            </FormControl>,
          );
        }).toErrorDev([
          'MUI: There are multiple `InputBase` components inside a FormControl.\nThis creates visual inconsistencies, only use one `InputBase`.',
          // React 18 Strict Effects run mount effects twice
          React.version.startsWith('18') &&
            'MUI: There are multiple `InputBase` components inside a FormControl.\nThis creates visual inconsistencies, only use one `InputBase`.',
        ]);
      });

      it('should not warn if only one input is rendered', () => {
        expect(() => {
          render(
            <FormControl>
              <InputBase />
            </FormControl>,
          );
        }).not.toErrorDev();
      });
    });
  });

  describe('prop: slotProps', () => {
    it('should apply the props on the input', () => {
      const { container } = render(
        <InputBase slotProps={{ input: { className: 'foo', maxLength: 5 } }} />,
      );
      const input = container.querySelector('input');
      expect(input).to.have.class('foo');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.property('maxLength', 5);
    });

    it('should be able to get a ref', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const { container } = render(<InputBase slotProps={{ input: { ref: inputRef } }} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });

    it('should not repeat the same classname', () => {
      const { container } = render(<InputBase slotProps={{ input: { className: 'foo' } }} />);
      const input = container.querySelector('input');
      const matches = input?.className.match(/foo/g);
      expect(input).to.have.class('foo');
      expect(matches).to.have.length(1);
    });
  });

  describe('prop: slots and slotProps', () => {
    it('should call slotProps.input.onChange callback with all params sent from custom inputComponent', () => {
      const INPUT_VALUE = 'material';
      const OUTPUT_VALUE = 'test';
      /**
       * This component simulates the integration of react-select with Input
       * react-select has a custom onChange that is essentially "(string, string) => void"
       * https://github.com/mui/material-ui/issues/18130
       */
      const MyInputBase = React.forwardRef(function MyInputBase(
        props: {
          onChange: (...args: string[]) => void;
        },
        ref: React.ForwardedRef<HTMLInputElement>,
      ) {
        const { onChange, ...other } = props;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value, OUTPUT_VALUE);
        };

        return <input ref={ref} onChange={handleChange} {...other} />;
      });

      MyInputBase.propTypes = {
        onChange: PropTypes.func.isRequired,
      };

      let outputArguments: string[] = [];
      function parentHandleChange(...args: string[]) {
        outputArguments = args;
      }

      const { getByRole } = render(
        <InputBase
          inputComponent={MyInputBase}
          slotProps={{
            input: {
              onChange: parentHandleChange as unknown as React.ChangeEventHandler<HTMLInputElement>,
            },
          }}
        />,
      );
      const textbox = getByRole('textbox');
      fireEvent.change(textbox, { target: { value: INPUT_VALUE } });

      expect(outputArguments.length).to.equal(2);
      expect(outputArguments[0]).to.equal(INPUT_VALUE);
      expect(outputArguments[1]).to.equal(OUTPUT_VALUE);
    });
  });

  describe('prop: startAdornment, prop: endAdornment', () => {
    it('should render adornment before input', () => {
      const { getByTestId } = render(
        <InputBase
          startAdornment={
            <InputAdornment data-testid="adornment" position="start">
              $
            </InputAdornment>
          }
        />,
      );

      expect(getByTestId('adornment')).not.to.equal(null);
    });

    it('should render adornment after input', () => {
      const { getByTestId } = render(
        <InputBase
          endAdornment={
            <InputAdornment data-testid="adornment" position="end">
              $
            </InputAdornment>
          }
        />,
      );

      expect(getByTestId('adornment')).not.to.equal(null);
    });

    // TODO v6: use material-next/Select
    it('should allow a Select as an adornment', () => {
      render(
        <InputBase
          value=""
          name="text"
          endAdornment={
            <InputAdornment position="end">
              <Select value="" name="suffix" />
            </InputAdornment>
          }
          variant="standard"
        />,
      );
    });
  });

  describe('prop: inputRef', () => {
    it('should be able to access the native input', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase inputRef={inputRef} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });

    it('should be able to access the native textarea', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase multiline inputRef={inputRef} />);
      expect(inputRef.current).to.equal(container.querySelector('textarea'));
    });
  });

  describe('prop: focused', () => {
    // TODO v6: requires material-next/TextField
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('should render correct border color with a customized primary color supplied to CssVarsProvider', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const theme = extendTheme({
        colorSchemes: {
          light: {
            palette: {
              primary: {
                main: 'rgb(0, 191, 165)',
              },
            },
          },
        },
      });
      const { getByRole } = render(
        <CssVarsProvider theme={theme}>
          {/* TODO v6: use material-next/TextField */}
          <TextField focused label="Your email" />
        </CssVarsProvider>,
      );

      // this `fieldset` is the (internal) NotchedOutline component
      const fieldset = getByRole('textbox').nextSibling;
      expect(fieldset).toHaveComputedStyle({
        borderTopColor: 'rgb(0, 191, 165)',
        borderRightColor: 'rgb(0, 191, 165)',
        borderBottomColor: 'rgb(0, 191, 165)',
        borderLeftColor: 'rgb(0, 191, 165)',
      });
    });
  });
});
