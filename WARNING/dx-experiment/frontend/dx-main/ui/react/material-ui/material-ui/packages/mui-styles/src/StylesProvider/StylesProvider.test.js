import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { create, SheetsRegistry } from 'jss';
import { createMount, strictModeDoubleLoggingSuppressed } from '@mui-internal/test-utils';
import StylesProvider, { StylesContext } from './StylesProvider';
import makeStyles from '../makeStyles';
import createGenerateClassName from '../createGenerateClassName';

function Test() {
  const options = React.useContext(StylesContext);
  return <span data-options={options} />;
}

function getOptions(wrapper) {
  return wrapper.find('span').props()['data-options'];
}

describe('StylesProvider', () => {
  const mount = createMount();
  let generateClassName;

  beforeEach(() => {
    generateClassName = createGenerateClassName();
  });

  it('should provide the options', () => {
    const wrapper = mount(
      <StylesProvider disableGeneration>
        <Test />
      </StylesProvider>,
    );
    expect(getOptions(wrapper).disableGeneration).to.equal(true);
  });

  it('should merge the themes', () => {
    const wrapper = mount(
      <StylesProvider>
        <StylesProvider disableGeneration>
          <Test />
        </StylesProvider>
      </StylesProvider>,
    );
    expect(getOptions(wrapper).disableGeneration).to.equal(true);
  });

  it('should handle injectFirst', () => {
    const wrapper = mount(
      <StylesProvider injectFirst>
        <Test />
      </StylesProvider>,
    );
    expect(getOptions(wrapper).jss.options.insertionPoint.nodeType).to.equal(8);
  });

  describe('server-side', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    const useStyles = makeStyles({ root: { display: 'flex' } });
    function Button(props) {
      const classes = useStyles();
      return <button type="button" className={classes.root} {...props} />;
    }

    function assertRendering(markup, sheetsRegistry) {
      expect(markup.match('Hello World')).not.to.equal(null);
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.toString().length > 10).to.equal(true);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({
        root: 'makeStyles-root-1',
      });
    }

    it('should be able to extract the styles', () => {
      const sheetsRegistry = new SheetsRegistry();

      const markup = ReactDOMServer.renderToString(
        <StylesProvider
          sheetsManager={new Map()}
          sheetsRegistry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <Button>Hello World</Button>
        </StylesProvider>,
      );

      assertRendering(markup, sheetsRegistry);
    });

    it('should be able to cache the sheets between two requests', () => {
      const sheetsCache = new Map();

      const sheetsRegistry1 = new SheetsRegistry();
      const markup1 = ReactDOMServer.renderToString(
        <StylesProvider
          sheetsManager={new Map()}
          sheetsCache={sheetsCache}
          sheetsRegistry={sheetsRegistry1}
          generateClassName={generateClassName}
        >
          <Button>Hello World</Button>
        </StylesProvider>,
      );
      assertRendering(markup1, sheetsRegistry1);

      const sheetsRegistry2 = new SheetsRegistry();
      const markup2 = ReactDOMServer.renderToString(
        <StylesProvider
          sheetsManager={new Map()}
          sheetsCache={sheetsCache}
          sheetsRegistry={sheetsRegistry2}
          generateClassName={generateClassName}
        >
          <Button>Hello World</Button>
        </StylesProvider>,
      );
      assertRendering(markup2, sheetsRegistry2);

      // The most important check:
      expect(sheetsRegistry1.registry[0]).to.equal(sheetsRegistry2.registry[0]);
    });
  });

  it('should accept a custom JSS instance', () => {
    const jss = create();
    const wrapper = mount(
      <StylesProvider jss={jss}>
        <Test />
      </StylesProvider>,
    );
    expect(getOptions(wrapper).jss).to.equal(jss);
  });

  describe('warnings', () => {
    it('should support invalid input', () => {
      const jss = create();

      expect(() => {
        mount(
          <StylesProvider injectFirst jss={jss}>
            <Test />
          </StylesProvider>,
        );
      }).toErrorDev([
        'MUI: You cannot use the jss and injectFirst props at the same time',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: You cannot use the jss and injectFirst props at the same time',
      ]);
    });
  });
});
