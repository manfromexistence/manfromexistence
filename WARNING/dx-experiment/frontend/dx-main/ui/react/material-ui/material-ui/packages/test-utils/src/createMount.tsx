/* eslint-env mocha */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMTestUtils from 'react-dom/test-utils';
import { Test, Suite } from 'mocha';
import { mount as enzymeMount, MountRendererProps } from 'enzyme';

interface ModeProps {
  /**
   * this is essentially children. However, we can't use children because then
   * using `wrapper.setProps({ children })` would work differently if this component
   * would be the root.
   */
  __element: React.ReactElement;
  __strict: boolean;
}

/**
 * Can't just mount <React.Fragment>{node}</React.Fragment>
 * because that swallows wrapper.setProps
 *
 * why class component:
 * https://github.com/airbnb/enzyme/issues/2043
 */
// eslint-disable-next-line react/prefer-stateless-function
class Mode extends React.Component<ModeProps> {
  render() {
    // Excess props will come from e.g. enzyme setProps
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { __element, __strict, ...other } = this.props;
    const Component = __strict ? React.StrictMode : React.Fragment;

    return <Component>{React.cloneElement(__element, other)}</Component>;
  }
}

interface CreateMountOptions extends MountRendererProps {
  mount?: typeof enzymeMount;
  strict?: boolean;
}
// Generate an enhanced mount function.
export default function createMount(options: CreateMountOptions = {}) {
  const { mount = enzymeMount, strict: globalStrict = true, ...globalEnzymeOptions } = options;

  let container: HTMLElement | null = null;

  function computeTestName(test: Test | undefined) {
    let current: Test | Suite | undefined = test;
    const titles: string[] = [];
    while (current != null) {
      titles.push(current.title);
      current = current.parent;
    }

    return titles.filter(Boolean).reverse().join(' -> ');
  }

  // save stack to re-use in test-hooks
  const { stack: createMountStack } = new Error();

  /**
   * Flag whether `createMount` was called in a suite i.e. describe() block.
   * For legacy reasons `createMount` might accidentally be called in a before(Each) hook.
   */
  let wasCalledInSuite = false;
  before(() => {
    wasCalledInSuite = true;
  });

  beforeEach(() => {
    if (!wasCalledInSuite) {
      const error = new Error(
        'Unable to run `before` hook for `createMount`. This usually indicates that `createMount` was called in a `before` hook instead of in a `describe()` block.',
      );
      error.stack = createMountStack;
      throw error;
    }
  });

  beforeEach(function beforeEachMountTest() {
    container = document.createElement('div');
    container.setAttribute('data-test', computeTestName(this.currentTest));
    document.body.insertBefore(container, document.body.firstChild);
  });

  afterEach(() => {
    ReactDOMTestUtils.act(() => {
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.unmountComponentAtNode(container!);
    });
    container!.parentElement!.removeChild(container!);
    container = null;
  });

  const mountWithContext = function mountWithContext(
    node: React.ReactElement,
    localOptions: Omit<CreateMountOptions, 'mount'> = {},
  ) {
    const { strict = globalStrict, ...localEnzymeOptions } = localOptions;

    if (container === null) {
      throw new Error(
        `Tried to mount without setup. Mounting inside before() is not allowed. Try mounting in beforeEach or better: in each test`,
      );
    }
    ReactDOMTestUtils.act(() => {
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.unmountComponentAtNode(container!);
    });

    // some tests require that no other components are in the tree
    // e.g. when doing .instance(), .state() etc.
    const wrapper = mount(
      strict == null ? node : <Mode __element={node} __strict={Boolean(strict)} />,
      {
        attachTo: container,
        ...globalEnzymeOptions,
        ...localEnzymeOptions,
      },
    );
    const originalUnmount = wrapper.unmount;

    wrapper.unmount = () => {
      // flush effect cleanup functions
      ReactDOMTestUtils.act(() => {
        originalUnmount.call(wrapper);
      });

      return wrapper;
    };

    return wrapper;
  };

  return mountWithContext;
}
