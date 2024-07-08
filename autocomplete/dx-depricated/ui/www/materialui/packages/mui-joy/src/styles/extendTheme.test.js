import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import { extendTheme, useTheme, CssVarsProvider, styled } from '@mui/joy/styles';

describe('extendTheme', () => {
  it('the output contains required fields', () => {
    const result = extendTheme();
    Object.keys(result).forEach((field) => {
      expect([
        'attribute',
        'breakpoints',
        'containerQueries',
        'colorSchemeSelector',
        'components',
        'colorSchemes',
        'defaultColorScheme',
        'focus',
        'fontSize',
        'fontFamily',
        'fontWeight',
        'lineHeight',
        'getCssVar',
        'spacing',
        'radius',
        'shadow',
        'shadowRing',
        'shadowChannel',
        'shadowOpacity',
        'zIndex',
        'typography',
        'variants',
        'cssVarPrefix',
        'palette',
        'vars',
        'getColorSchemeSelector',
        'unstable_sxConfig',
        'unstable_sx',
        'shouldSkipGeneratingVar',
        'generateStyleSheets',
        'generateThemeVars',
        'generateSpacing',
        'applyStyles',
      ]).to.includes(field);
    });
  });

  it('should have the vars object', () => {
    const theme = extendTheme();
    const keys = [
      'radius',
      'shadow',
      'focus',
      'fontFamily',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'palette',
      'shadowRing',
      'shadowChannel',
    ];

    Object.keys(keys).forEach((key) => {
      expect(theme[key]).to.deep.equal(theme.vars[key]);
    });
  });

  it('should have joy default css var prefix', () => {
    const theme = extendTheme();
    expect(theme.cssVarPrefix).to.equal('joy');
    expect(theme.typography['body-md'].fontSize).to.equal('var(--joy-fontSize-md, 1rem)');
  });

  it('should have custom css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: 'foo' });
    expect(theme.cssVarPrefix).to.equal('foo');
    expect(theme.typography['body-md'].fontSize).to.equal('var(--foo-fontSize-md, 1rem)');
  });

  it('should have no css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: '' });
    expect(theme.cssVarPrefix).to.equal('');
    expect(theme.typography['body-md'].fontSize).to.equal('var(--fontSize-md, 1rem)');
  });

  it('should accept custom fontSize value', () => {
    const theme = extendTheme({ fontSize: { md: '2rem' } });
    expect(theme.cssVarPrefix).to.equal('joy');
    expect(theme.typography['body-md'].fontSize).to.equal('var(--joy-fontSize-md, 2rem)');
  });

  it('should have custom --variant-borderWidth', () => {
    const theme = extendTheme({
      variants: { outlined: { primary: { '--variant-borderWidth': '3px' } } },
    });
    expect(theme.variants.outlined.primary).to.contain({
      '--variant-borderWidth': '3px',
    });
  });

  it('should have correct font family', () => {
    const theme = extendTheme({ fontFamily: { body: 'JetBrains Mono' } });
    expect(theme.typography['body-md']).to.deep.equal({
      fontFamily: 'var(--joy-fontFamily-body, JetBrains Mono)',
      fontSize: 'var(--joy-fontSize-md, 1rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-secondary, var(--joy-palette-neutral-700, #32383E))',
    });
  });

  describe('spacing', () => {
    it('produce spacing token by default', () => {
      const theme = extendTheme();
      expect(theme.vars.spacing).to.equal('var(--joy-spacing, 8px)');
      expect(theme.spacing(2)).to.equal('calc(2 * var(--joy-spacing, 8px))');
    });

    it('turn number to pixel', () => {
      const theme = extendTheme({ spacing: 4 });
      expect(theme.vars.spacing).to.equal('var(--joy-spacing, 4px)');
      expect(theme.spacing(2)).to.equal('calc(2 * var(--joy-spacing, 4px))');
    });

    it('can be customized as a string', () => {
      const theme = extendTheme({ spacing: '0.5rem' });
      expect(theme.vars.spacing).to.equal('var(--joy-spacing, 0.5rem)');
      expect(theme.spacing(2)).to.equal('calc(2 * var(--joy-spacing, 0.5rem))');
    });

    it('uses the provided value if it is a string', () => {
      const theme = extendTheme({ spacing: '0.5rem' });
      expect(theme.spacing('1rem')).to.equal('1rem');
    });

    it('can be customized as an array', () => {
      const theme = extendTheme({ spacing: [0, 1, 2, 4, 8, 16, 32] });
      expect(theme.vars.spacing).to.deep.equal([
        'var(--joy-spacing-0, 0px)',
        'var(--joy-spacing-1, 1px)',
        'var(--joy-spacing-2, 2px)',
        'var(--joy-spacing-3, 4px)',
        'var(--joy-spacing-4, 8px)',
        'var(--joy-spacing-5, 16px)',
        'var(--joy-spacing-6, 32px)',
      ]);
      expect(theme.spacing(2)).to.equal('var(--joy-spacing-2, 2px)');
    });

    it('can be customized as a function', () => {
      const theme = extendTheme({ spacing: (factor) => `${0.25 * factor}rem` });
      expect(theme.vars.spacing).to.deep.equal('var(--joy-spacing, 0.25rem)');
      expect(theme.spacing(2)).to.equal('calc(2 * var(--joy-spacing, 0.25rem))');
    });
  });

  describe('theme.unstable_sx', () => {
    const { render } = createRenderer();

    let originalMatchmedia;
    const storage = {};

    beforeEach(() => {
      originalMatchmedia = window.matchMedia;
      // Create mocks of localStorage getItem and setItem functions
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: (key) => storage[key],
          setItem: (key, value) => {
            storage[key] = value;
          },
        },
        configurable: true,
      });
      window.matchMedia = () => ({
        addListener: () => {},
        removeListener: () => {},
      });
    });

    afterEach(() => {
      window.matchMedia = originalMatchmedia;
    });

    const customTheme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              500: 'rgb(0, 0, 255)',
            },
          },
        },
      },
    });

    it('bgcolor', () => {
      let styles = {};

      function Test() {
        const theme = useTheme();
        styles = theme.unstable_sx({ bgcolor: 'primary.500' });
        return null;
      }

      render(
        <CssVarsProvider theme={customTheme}>
          <Test />
        </CssVarsProvider>,
      );

      expect(styles).to.deep.equal({
        backgroundColor: 'var(--joy-palette-primary-500)',
      });
    });

    it('borderRadius', () => {
      let styles = {};

      function Test() {
        const theme = useTheme();
        styles = theme.unstable_sx({ borderRadius: 'md' });
        return null;
      }

      render(
        <CssVarsProvider theme={customTheme}>
          <Test />
        </CssVarsProvider>,
      );

      expect(styles).to.deep.equal({
        // No default value as the CssVarsProvider is used
        borderRadius: 'var(--joy-radius-md)',
      });
    });

    it('applyStyles', () => {
      const attribute = 'data-custom-color-scheme';
      let darkStyles = {};
      const Test = styled('div')(({ theme }) => {
        darkStyles = theme.applyStyles('dark', {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        });
        return null;
      });

      render(
        <CssVarsProvider attribute={attribute}>
          <Test />
        </CssVarsProvider>,
      );

      expect(darkStyles).to.deep.equal({
        [`*:where([${attribute}="dark"]) &`]: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      });
    });
  });
});
