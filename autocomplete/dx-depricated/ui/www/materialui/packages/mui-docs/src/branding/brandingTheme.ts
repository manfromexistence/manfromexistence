import type { CSSObject } from '@mui/system';
import type {} from '@mui/material/themeCssVarsAugmentation';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { createTheme, ThemeOptions, Theme, alpha } from '@mui/material/styles';

interface ApplyDarkStyles {
  (scheme: CSSObject): CSSObject;
}

declare module '@mui/material/styles' {
  interface Theme {
    applyDarkStyles: ApplyDarkStyles;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    primaryDark: PaletteColor;
    gradients: {
      radioSubtle: string;
      linearSubtle: string;
    };
  }

  interface TypeText {
    tertiary: string;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
    fontFamilyCode?: string;
    fontFamilySystem?: string;
  }

  interface Typography {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
    fontFamilyCode: string;
    fontFamilySystem: string;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    grey: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    danger: true;
  }
  interface SvgIconPropsSizeOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xl2: true;
    xl3: true;
    xl4: true;
  }
}

// TODO: enable this once types conflict is fixed
// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     code: true;
//   }
// }

const defaultTheme = createTheme();

export const blue = {
  50: 'hsl(210, 100%, 96%)',
  100: 'hsl(210, 100%, 90%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 70%)',
  400: 'hsl(210, 100%, 60%)',
  main: 'hsl(210, 100%, 45%)',
  500: 'hsl(210, 100%, 45%)',
  600: 'hsl(210, 100%, 42%)',
  700: 'hsl(210, 100%, 38%)',
  800: 'hsl(210, 100%, 30%)',
  900: 'hsl(210, 100%, 23%)',
};
export const blueDark = {
  50: 'hsl(210, 14%, 92%)',
  100: 'hsl(210, 14%, 87%)',
  200: 'hsl(210, 14%, 72%)',
  300: 'hsl(210, 14%, 56%)',
  main: 'hsl(210, 14%, 56%)',
  400: 'hsl(210, 14%, 36%)',
  500: 'hsl(210, 14%, 28%)',
  600: 'hsl(210, 14%, 22%)',
  700: 'hsl(210, 14%, 13%)',
  800: 'hsl(210, 14%, 9%)',
  900: 'hsl(210, 14%, 7%)',
};
export const grey = {
  50: 'hsl(215, 15%, 97%)',
  100: 'hsl(215, 15%, 92%)',
  200: 'hsl(215, 15%, 89%)',
  300: 'hsl(215, 15%, 82%)',
  400: 'hsl(215, 15%, 75%)',
  500: 'hsl(215, 15%, 65%)',
  600: 'hsl(215, 15%, 50%)',
  700: 'hsl(215, 15%, 40%)',
  800: 'hsl(215, 15%, 22%)',
  900: 'hsl(215, 15%, 12%)',
};
export const error = {
  50: 'hsl(355, 98%, 97%)',
  100: 'hsl(355, 98%, 93%)',
  200: 'hsl(355, 98%, 87%)',
  300: 'hsl(355, 98%, 80%)',
  400: 'hsl(355, 98%, 74%)',
  500: 'hsl(355, 98%, 66%)',
  main: 'hsl(355, 98%, 66%)',
  600: 'hsl(355, 98%, 46%)',
  700: 'hsl(355, 98%, 39%)',
  800: 'hsl(355, 98%, 29%)',
  900: 'hsl(355, 98%, 17%)',
};
export const success = {
  50: 'hsl(144, 72%, 95%)',
  100: 'hsl(144, 72%, 87%)',
  200: 'hsl(144, 72%, 77%)',
  300: 'hsl(144, 72%, 66%)',
  400: 'hsl(144, 72%, 56%)',
  500: 'hsl(144, 72%, 46%)',
  600: 'hsl(144, 72%, 41%)',
  700: 'hsl(144, 72%, 37%)',
  800: 'hsl(144, 72%, 32%)',
  900: 'hsl(144, 72%, 21%)',
};
export const warning = {
  50: 'hsl(48, 100%, 96%)',
  100: 'hsl(48, 100%, 88%)',
  200: 'hsl(48, 100%, 82%)',
  300: 'hsl(48, 100%, 64%)',
  400: 'hsl(48, 100%, 48%)',
  500: 'hsl(48, 100%, 44%)',
  main: 'hsl(48, 100%, 44%)',
  600: 'hsl(40, 100%, 40%)',
  700: 'hsl(36, 100%, 34%)',
  800: 'hsl(36, 100%, 27%)',
  900: 'hsl(36, 100%, 18%)',
};

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

export const getMetaThemeColor = (mode: 'light' | 'dark') => {
  const themeColor = {
    light: blue[600],
    dark: blueDark[900],
  };
  return themeColor[mode];
};

export const getDesignTokens = (mode: 'light' | 'dark') =>
  ({
    palette: {
      primary: {
        ...blue,
        ...(mode === 'dark' && {
          main: blue[400],
        }),
      },
      secondary: {
        ...grey,
        ...(mode === 'light' && {
          main: blueDark[100],
          contrastText: blueDark[600],
        }),
        ...(mode === 'dark' && {
          main: blueDark[700],
          contrastText: blueDark[600],
        }),
      },
      divider: mode === 'dark' ? alpha(blueDark[500], 0.3) : grey[100],
      primaryDark: blueDark,
      mode,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[900],
          paper: alpha(blueDark[800], 0.8),
        },
      }),
      common: {
        black: 'hsl(200, 10%, 4%)',
      },
      text: {
        ...(mode === 'light' && {
          primary: grey[900],
          secondary: grey[800],
          tertiary: grey[700],
        }),
        ...(mode === 'dark' && {
          primary: '#fff',
          secondary: grey[400],
          tertiary: grey[500],
        }),
      },
      grey: {
        ...grey,
        ...(mode === 'light' && {
          main: grey[100],
          contrastText: grey[600],
        }),
        ...(mode === 'dark' && {
          main: grey[700],
          contrastText: grey[600],
        }),
      },
      error,
      success: {
        ...success,
        ...(mode === 'dark' && {
          main: success[600],
        }),
        ...(mode === 'light' && {
          main: success[700],
        }),
      },
      warning,
      gradients: {
        radioSubtle:
          mode === 'dark'
            ? `radial-gradient(100% 100% at 100% 100%, transparent 0, ${alpha(blue[900], 0.3)} 300%)`
            : `radial-gradient(100% 90% at 50% 0, transparent 0, ${alpha(blue[100], 0.3)} 300%)`,
        linearSubtle:
          mode === 'light'
            ? `linear-gradient(to bottom right, ${alpha(blue[50], 0.3)} 25%, ${alpha(grey[50], 0.2)} 100%)`
            : `linear-gradient(to bottom right, ${alpha(blue[900], 0.1)} 25%, ${alpha(blueDark[800], 0.2)} 100%)`,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    typography: {
      fontFamily: ['"IBM Plex Sans"', ...systemFont].join(','),
      // Match VS Code
      // https://github.com/microsoft/vscode/blob/b38691f611d1ce3ef437c67a1b047c757b7b4e53/src/vs/editor/common/config/editorOptions.ts#L4578-L4580
      // https://github.com/microsoft/vscode/blob/d950552131d7350a45dac8b59bf179469c36c2ac/src/vs/editor/standalone/browser/standalone-tokens.css#L10
      fontFamilyCode: [
        'Menlo', // macOS
        'Consolas', // Windows
        '"Droid Sans Mono"', // Linux
        'monospace', // fallback
      ].join(','),
      fontFamilyTagline: ['"General Sans"', ...systemFont].join(','),
      fontFamilySystem: systemFont.join(','),
      fontWeightSemiBold: 600,
      fontWeightExtraBold: 800,
      h1: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: 'clamp(2.5rem, 1.125rem + 3.5vw, 3.5em)',
        fontWeight: 600,
        lineHeight: 78 / 70,
        letterSpacing: -0.2,
        ...(mode === 'light' && {
          color: blueDark[900],
        }),
      },
      h2: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 600,
        lineHeight: 44 / 36,
        letterSpacing: -0.2,
        color: mode === 'dark' ? grey[100] : blueDark[700],
      },
      h3: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(36),
        lineHeight: 44 / 36,
        letterSpacing: 0.2,
      },
      h4: {
        fontFamily: ['"General Sans"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 42 / 28,
        letterSpacing: 0.2,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(24),
        lineHeight: 36 / 24,
        letterSpacing: 0.1,
        color: mode === 'dark' ? blue[300] : blue.main,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(20),
        lineHeight: 30 / 20,
      },
      button: {
        textTransform: 'initial',
        fontWeight: 700,
        letterSpacing: 0,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        lineHeight: 24 / 18,
        letterSpacing: 0,
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16), // 16px
        lineHeight: 24 / 16,
        letterSpacing: 0,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14), // 14px
        lineHeight: 21 / 14,
        letterSpacing: 0,
      },
      caption: {
        display: 'inline-block',
        fontSize: defaultTheme.typography.pxToRem(12), // 12px
        lineHeight: 18 / 12,
        letterSpacing: 0,
        fontWeight: 700,
      },
      allVariants: {
        scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      },
    },
    /**
     * This utility exists to help transitioning to CSS variables page by page (prevent dark mode flicker).
     * It will use the proper styling method based on the theme because the component might be on the page that does not support CSS variables yet.
     *
     * 😓 Without this utility:
     * {
     *   ...theme.vars ? {
     *     color: theme.vars.palette.primary.main,
     *     [theme.getColorScheme('dark')]: {
     *       color: '#fff',
     *     }
     *   } : {
     *     color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
     *   }
     * }
     *
     * 🤩 Using the utility:
     * {
     *   color: (theme.vars || theme).palette.primary.main,
     *   ...theme.applyDarkStyles({
     *     color: '#fff',
     *   }),
     * }
     *
     * -------------------------------------------------------------------------------------------------
     * 💡 This util should be used in an array if the styles contain pseudo classes or nested selectors:
     *
     * ❌ There is a chance that the upper selectors could be overridden
     * {
     *    // the whole selector could be overridden
     *   '&::before': {
     *     color: ...
     *   },
     *   ...theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *   })
     * }
     *
     * ✅ use an array (supports in both emotion and styled-components)
     * Only the `color` will be overridden in dark mode.
     *  [
     *    '&::before': {
     *      color: ...
     *    },
     *    theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *    })
     *  ]
     */
    applyDarkStyles(css: Parameters<ApplyDarkStyles>[0]) {
      return (this as Theme).applyStyles('dark', css);
    },
  }) as ThemeOptions;

export function getThemedComponents(): ThemeOptions {
  return {
    components: {
      MuiAlert: {
        styleOverrides: {
          root: {
            padding: '12px 16px',
          },
          standardWarning: ({ theme }) => [
            {
              backgroundColor: alpha(theme.palette.warning[50], 0.5),
              color: (theme.vars || theme).palette.grey[900],
              border: '1px solid',
              borderColor: alpha(theme.palette.warning[600], 0.3),
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.warning[700],
              },
            },
            theme.applyDarkStyles({
              backgroundColor: alpha(theme.palette.warning[700], 0.2),
              color: (theme.vars || theme).palette.warning[50],
              '& .MuiAlert-icon': {
                color: (theme.vars || theme).palette.warning[200],
              },
            }),
          ],
          icon: {
            paddingTop: 12,
            paddingBottom: 0,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            transition: 'all 100ms ease-in',
            '&:focus-visible': {
              outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
              outlineOffset: '2px',
            },
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            transition: 'all 120ms ease-in',
            ...(ownerState.size === 'large' && {
              ...theme.typography.body1,
              lineHeight: 21 / 16,
              padding: theme.spacing('8px', '10px', '10px', '12px'),
              fontWeight: theme.typography.fontWeightSemiBold,
              borderRadius: 10,
              '& > span': { transition: '0.2s', marginLeft: 4 },
              '&:hover > span': { transform: 'translateX(2px)' },
            }),
            ...(ownerState.size === 'medium' && {
              fontSize: defaultTheme.typography.pxToRem(15),
              padding: theme.spacing('8px', '12px', '8px', '14px'),
              fontWeight: theme.typography.fontWeightSemiBold,
              borderRadius: 8,
              '& > span': { transition: '0.2s', marginLeft: 4 },
              '&:hover > span': { transform: 'translateX(2px)' },
            }),
            ...(ownerState.size === 'small' && {
              padding: theme.spacing('6px', 1),
              fontFamily: theme.typography.fontFamily,
              fontSize: defaultTheme.typography.pxToRem(13),
              fontWeight: theme.typography.fontWeightSemiBold,
              borderRadius: 8,
              '& .MuiButton-startIcon': {
                transition: '0.15s',
                marginRight: 4,
                marginLeft: -1,
              },
              '& .MuiButton-endIcon': {
                transition: '0.15s',
                marginLeft: 4,
              },
              '&:hover': {
                '& .MuiButton-startIcon': { transform: 'translateX(-2px)' },
                '& .MuiButton-endIcon': { transform: 'translateX(2px)' },
              },
            }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'secondary' && {
                color: (theme.vars || theme).palette.text.primary,
                backgroundColor: alpha(theme.palette.primaryDark[50], 0.1),
                borderColor: (theme.vars || theme).palette.primaryDark[100],
                boxShadow: `${alpha(theme.palette.grey[50], 0.5)} 0 2px 0 inset, ${alpha(theme.palette.grey[100], 0.5)} 0 -2px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[50],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primaryDark[100],
                  borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                  boxShadow: `${alpha(theme.palette.primaryDark[600], 0.2)} 0 2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                    borderColor: (theme.vars || theme).palette.primaryDark[600],
                  },
                }),
              }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'primary' && {
                color: (theme.vars || theme).palette.primary[600],
                backgroundColor: alpha(theme.palette.primary[50], 0.2),
                borderColor: (theme.vars || theme).palette.primary[100],
                boxShadow: `${alpha(theme.palette.primary[50], 0.8)} 0 2px 0 inset, ${alpha(theme.palette.primary[100], 0.4)} 0 -2px 0 inset, ${alpha(theme.palette.primary[100], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[50],
                  borderColor: (theme.vars || theme).palette.primary[200],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[200],
                  borderColor: alpha(theme.palette.primary[900], 0.7),
                  backgroundColor: alpha(theme.palette.primary[900], 0.2),
                  boxShadow: `${alpha(theme.palette.primary[900], 0.2)} 0 2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primary[900],
                    borderColor: (theme.vars || theme).palette.primary[700],
                  },
                }),
              }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: '#fff',
                textShadow: `0 1px 1px ${alpha(theme.palette.common.black, 0.6)}`,
                backgroundColor: (theme.vars || theme).palette.primary[500],
                backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary[500], 0.6)} 0%, ${theme.palette.primary[600]} 100%)`,
                boxShadow: `${theme.palette.primary[400]} 0 2px 0 inset, ${theme.palette.primary[700]} 0 -2px 0 inset, ${alpha(theme.palette.common.black, 0.1)} 0 2px 4px 0`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[700],
                },
                '&:active': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                },
              }),
            ...(ownerState.variant === 'text' && {
              color: (theme.vars || theme).palette.primary[600],
              ...theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
              }),
            }),
          }),
        },
        variants: [
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'code' },
            style: ({ theme }) => [
              {
                cursor: 'copy',
                padding: 0,
                width: 'max-content',
                backgroundColor: 'transparent',
                color: (theme.vars || theme).palette.grey[600],
                fontFamily: theme.typography.fontFamilyCode,
                fontWeight: 400,
                fontSize: defaultTheme.typography.pxToRem(12),
                lineHeight: 21 / 14,
                letterSpacing: 0,
                WebkitFontSmoothing: 'subpixel-antialiased',
                '& .MuiButton-startIcon': {
                  color: (theme.vars || theme).palette.grey[400],
                },
                '& .MuiButton-endIcon': {
                  display: 'inline-block',
                  position: 'absolute',
                  color: (theme.vars || theme).palette.primary.main,
                  right: -22,
                  top: -1,
                  opacity: 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '100ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: 'transparent',
                  color: (theme.vars || theme).palette.primary.main,
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary.main,
                    opacity: 1,
                  },
                },
              },
              theme.applyDarkStyles({
                '& .MuiButton-endIcon': {
                  color: (theme.vars || theme).palette.primary[300],
                },
                '&:hover, &.Mui-focusVisible': {
                  color: (theme.vars || theme).palette.primary[300],
                  '& .MuiButton-endIcon': {
                    opacity: 1,
                  },
                },
              }),
            ],
          },
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'codeOutlined' },
            style: ({ theme }) => [
              {
                display: 'inline-block',
                justifyContent: 'start',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                position: 'relative',
                border: '1px solid',
                color: (theme.vars || theme).palette.grey[900],
                backgroundColor: alpha(theme.palette.primary[50], 0.3),
                borderColor: (theme.vars || theme).palette.grey[200],
                boxShadow: `0px 2px 2px ${alpha(
                  theme.palette.primary[100],
                  0.2,
                )}, inset 0px 4px 4px ${alpha(theme.palette.primary[100], 0.2)}`,
                fontFamily: theme.typography.fontFamilyCode,
                fontWeight: 400,
                fontSize: defaultTheme.typography.pxToRem(12),
                lineHeight: 21 / 14,
                letterSpacing: 0,
                WebkitFontSmoothing: 'subpixel-antialiased',
                '& .MuiButton-endIcon': {
                  display: 'inline-block',
                  position: 'absolute',
                  top: 12,
                  right: 0,
                  marginRight: 10,
                  color: (theme.vars || theme).palette.grey[600],
                },
                '&:hover, &.Mui-focusVisible': {
                  borderColor: (theme.vars || theme).palette.primary.main,
                  backgroundColor: (theme.vars || theme).palette.primary[50],
                  color: (theme.vars || theme).palette.primary[600],
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary.main,
                  },
                },
              } as const,
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.grey[500],
                borderColor: (theme.vars || theme).palette.primaryDark[600],
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                boxShadow: '0px 2px 2px #0B0D0E, inset 0px 4px 4px rgba(20, 25, 31, 0.3)',
                '& .MuiButton-endIcon': {
                  color: (theme.vars || theme).palette.grey[400],
                },
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: (theme.vars || theme).palette.primary[900],
                  color: (theme.vars || theme).palette.primary[100],
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary[300],
                  },
                },
              }),
            ],
          },
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: 'link' },
            style: ({ theme }) => ({
              marginBottom: 1,
              fontSize: theme.typography.pxToRem(14),
              fontWeight: theme.typography.fontWeightBold,
              color: (theme.vars || theme).palette.primary[600],
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.primary[50],
              },
              ...theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[800], 0.3),
                },
              }),
            }),
          },
        ],
      },
      MuiIconButton: {
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                height: 34,
                width: 34,
                border: `1px solid`,
                borderRadius: theme.shape.borderRadius,
                color: (theme.vars || theme).palette.primary.main,
                backgroundColor: alpha(theme.palette.primaryDark[50], 0.1),
                borderColor: (theme.vars || theme).palette.primaryDark[100],
                boxShadow: `${alpha(theme.palette.grey[50], 0.4)} 0 2px 0 inset, ${alpha(theme.palette.grey[100], 0.5)} 0 -1.5px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.grey[300],
                  background: (theme.vars || theme).palette.grey[50],
                },
              },
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
                borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                boxShadow: `${alpha(theme.palette.primaryDark[600], 0.2)} 0 2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.primaryDark[500],
                  background: alpha(theme.palette.primaryDark[700], 0.4),
                },
              }),
            ],
          },
          {
            props: { color: 'info' },
            style: ({ theme }) => [
              {
                height: 34,
                width: 34,
                color: (theme.vars || theme).palette.text.tertiary,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid`,
                backgroundColor: alpha(theme.palette.primaryDark[50], 0.1),
                borderColor: (theme.vars || theme).palette.primaryDark[100],
                boxShadow: `${alpha(theme.palette.grey[50], 0.4)} 0 2px 0 inset, ${alpha(theme.palette.grey[100], 0.5)} 0 -1.5px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  color: (theme.vars || theme).palette.primary.main,
                  borderColor: (theme.vars || theme).palette.grey[300],
                  background: (theme.vars || theme).palette.grey[50],
                },
              },
              theme.applyDarkStyles({
                borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                boxShadow: `${alpha(theme.palette.primaryDark[600], 0.2)} 0 2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                '&:hover': {
                  color: (theme.vars || theme).palette.primary[400],
                  borderColor: (theme.vars || theme).palette.primaryDark[500],
                  background: alpha(theme.palette.primaryDark[700], 0.4),
                },
              }),
            ],
          },
        ],
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => [
            {
              minWidth: 160,
              color: (theme.vars || theme).palette.text.secondary,
              backgroundImage: 'none',
              border: '1px solid',
              backgroundColor: (theme.vars || theme).palette.background.paper,
              borderColor: (theme.vars || theme).palette.grey[200],
              '& .MuiMenuItem-root': {
                fontSize: theme.typography.pxToRem(14),
                fontWeight: 500,
                '&:hover, &:focus': {
                  backgroundColor: (theme.vars || theme).palette.grey[50],
                },
                '&:focus-visible': {
                  outline: 'none',
                },
                '&.Mui-selected': {
                  fontWeight: 500,
                  color: (theme.vars || theme).palette.primary[600],
                  backgroundColor: alpha(theme.palette.primary[100], 0.6),
                },
              },
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              borderColor: (theme.vars || theme).palette.primaryDark[700],
              '& .MuiMenuItem-root': {
                '&:hover, &:focus': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                },
                '&.Mui-selected': {
                  color: (theme.vars || theme).palette.primary[300],
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                },
              },
            }),
          ],
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
            ...theme.applyDarkStyles({
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: (theme.vars || theme).palette.grey[100],
            ...theme.applyDarkStyles({
              borderColor: alpha(theme.palette.primaryDark[500], 0.3),
            }),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            display: 'inline-flex',
            alignItems: 'center',
            fontWeight: theme.typography.fontWeightSemiBold,
            '&.MuiTypography-body1 > svg': {
              marginTop: 2,
            },
            '& svg:last-child': {
              marginLeft: 2,
            },
            '&:focus-visible': {
              outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
              outlineOffset: '2px',
            },
          }),
        },
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                color: (theme.vars || theme).palette.primary[600],
                '&:hover': {
                  color: (theme.vars || theme).palette.primary[700],
                },
              },
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
                '&:hover': {
                  color: (theme.vars || theme).palette.primary[200],
                },
              }),
            ],
          },
        ],
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState: { color, variant }, theme }) => ({
            fontWeight: theme.typography.fontWeightSemiBold,
            paddingBottom: 0.2,
            ...(variant === 'outlined' &&
              color === 'default' && {
                backgroundColor: alpha(theme.palette.grey[50], 0.5),
                color: (theme.vars || theme).palette.grey[900],
                borderColor: (theme.vars || theme).palette.grey[200],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[100],
                  color: (theme.vars || theme).palette.grey[900],
                },
                ...theme.applyDarkStyles({
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
                  color: (theme.vars || theme).palette.grey[300],
                  borderColor: alpha(theme.palette.primaryDark[500], 0.5),
                  '&:hover': {
                    color: (theme.vars || theme).palette.grey[300],
                    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  },
                }),
              }),
            ...(variant === 'outlined' &&
              color === 'info' && {
                backgroundColor: alpha(theme.palette.grey[50], 0.5),
                color: (theme.vars || theme).palette.grey[900],
                borderColor: (theme.vars || theme).palette.grey[200],
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.grey[300],
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                }),
              }),
            ...(variant === 'outlined' &&
              color === 'primary' && {
                borderColor: (theme.vars || theme).palette.primary[100],
                backgroundColor: alpha(theme.palette.primary[100], 0.2),
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[300],
                  borderColor: alpha(theme.palette.primary[500], 0.2),
                  backgroundColor: alpha(theme.palette.primary[700], 0.2),
                }),
              }),
            ...(variant === 'outlined' &&
              color === 'success' && {
                borderColor: (theme.vars || theme).palette.success[100],
                backgroundColor: (theme.vars || theme).palette.success[50],
                color: (theme.vars || theme).palette.success[900],
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.success[300],
                  borderColor: alpha(theme.palette.success[300], 0.2),
                  background: alpha(theme.palette.success[800], 0.2),
                }),
              }),
            ...(variant === 'filled' && {
              ...(color === 'default' && {
                border: '1px solid transparent',
                color: (theme.vars || theme).palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.5),
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: alpha(theme.palette.primaryDark[500], 0.8),
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                  },
                }),
              }),
              ...(color === 'primary' && {
                color: (theme.vars || theme).palette.primary[600],
                backgroundColor: alpha(theme.palette.primary[100], 0.4),
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
                '& .MuiChip-deleteIcon': {
                  color: (theme.vars || theme).palette.primary[600],
                  '&:hover': {
                    color: (theme.vars || theme).palette.primary[700],
                  },
                },
                '&.Mui-focusVisible': {
                  backgroundColor: (theme.vars || theme).palette.primary[200],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[100],
                  backgroundColor: alpha(theme.palette.primary[800], 0.5),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.5),
                  },
                  '& .MuiChip-deleteIcon': {
                    color: (theme.vars || theme).palette.primary[100],
                    '&:hover': {
                      color: (theme.vars || theme).palette.primary[50],
                    },
                  },
                }),
              }),
            }),
            // for labelling product in the search
            // @ts-ignore internal repo module augmentation issue
            ...(variant === 'light' && {
              ...(color === 'default' && {
                color: (theme.vars || theme).palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.3),
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[200],
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                }),
              }),
              ...(color === 'warning' && {
                color: (theme.vars || theme).palette.warning[900],
                backgroundColor: (theme.vars || theme).palette.warning[100],
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: (theme.vars || theme).palette.warning[900],
                }),
              }),
              ...(color === 'success' && {
                color: (theme.vars || theme).palette.success[900],
                backgroundColor: (theme.vars || theme).palette.success[100],
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: (theme.vars || theme).palette.success[900],
                }),
              }),
            }),
          }),
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              padding: '8px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: theme.typography.pxToRem(14),
              color: theme.palette.grey[700],
              borderRadius: 0,
              '&:hover': {
                backgroundColor: theme.palette.grey[50],
              },
              '&.Mui-selected': {
                borderRadius: 10,
                border: '1px solid',
                color: (theme.vars || theme).palette.primary[500],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              color: theme.palette.grey[300],
              '&:hover': {
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
              },
              '&.Mui-selected': {
                color: '#fff',
                borderColor: `${(theme.vars || theme).palette.primary[700]} !important`,
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
            }),
          ],
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded,
        },
        styleOverrides: {
          iconFilled: {
            top: 'calc(50% - .25em)',
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme, ownerState }) => [
            {
              backgroundImage: 'none',
              backgroundColor: '#fff',
              '&[href]': {
                textDecorationLine: 'none',
              },
              transition: theme.transitions.create(['border', 'box-shadow'], {
                duration: theme.transitions.duration.shortest,
              }),
              ...(ownerState.variant === 'outlined' && {
                display: 'block',
                borderColor: (theme.vars || theme).palette.grey[100],
                '&[href]': {
                  textDecorationLine: 'none',
                  boxShadow: `hsl(200, 0%, 100%) 0 2px 0 inset, ${alpha(theme.palette.grey[100], 0.3)} 0 -2px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                  '&:hover': {
                    borderColor: (theme.vars || theme).palette.primary[200],
                    boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.primary[100]}`,
                  },
                  '&:focus-visible': {
                    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
                    outlineOffset: '2px',
                  },
                },
                ':is(a&), :is(button&)': {
                  '&:hover': {
                    borderColor: (theme.vars || theme).palette.primary[200],
                    boxShadow: `0px 4px 16px ${(theme.vars || theme).palette.grey[200]}`,
                  },
                },
              }),
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              ...(ownerState.variant === 'outlined' && {
                borderColor: (theme.vars || theme).palette.primaryDark[700],
                backgroundColor: alpha(theme.palette.primaryDark[800], 0.6),
                '&[href]': {
                  textDecorationLine: 'none',
                  boxShadow: `${alpha(theme.palette.primaryDark[700], 0.4)} 0 2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                  '&:hover': {
                    borderColor: alpha(theme.palette.primary[600], 0.5),
                    boxShadow: `0px 2px 8px ${alpha(theme.palette.primary[900], 0.6)}`,
                  },
                },
                ':is(a&), :is(button&)': {
                  '&:hover': {
                    boxShadow: `0px 4px 24px ${(theme.vars || theme).palette.common.black}`,
                  },
                },
              }),
            }),
          ],
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            padding: theme.spacing(1, 2),
            borderColor: (theme.vars || theme).palette.divider,
            ...(ownerState.variant === 'head' && {
              color: (theme.vars || theme).palette.text.primary,
              fontWeight: 700,
            }),
            ...(ownerState.variant === 'body' && {
              color: (theme.vars || theme).palette.text.secondary,
            }),
          }),
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => [
            {
              textTransform: 'none',
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.text.secondary,
              borderColor: theme.palette.grey[200],
              ...(ownerState.size === 'small' && {
                padding: '0.375rem 0.75rem',
              }),
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[700],
                borderColor: `${(theme.vars || theme).palette.primary[200]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              borderColor: theme.palette.primaryDark[700],
              '&:hover': {
                backgroundColor: alpha(theme.palette.primaryDark[600], 0.2),
              },
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[200],
                borderColor: `${(theme.vars || theme).palette.primary[800]} !important`,
                backgroundColor: alpha(theme.palette.primary[900], 0.4),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[900], 0.8),
                  borderColor: `${(theme.vars || theme).palette.primary[400]} !important`,
                },
              },
            }),
          ],
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 6,
            padding: '6px 12px',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 32,
            height: 20,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              '&.Mui-checked': {
                transform: 'translateX(11px)',
                color: '#fff',
              },
            },
          },
          switchBase: {
            height: 20,
            width: 20,
            padding: 0,
            color: '#fff',
            '&.Mui-checked + .MuiSwitch-track': {
              opacity: 1,
            },
          },
          track: ({ theme }) => ({
            opacity: 1,
            borderRadius: 32,
            backgroundColor: theme.palette.grey[400],
            ...theme.applyDarkStyles({
              backgroundColor: theme.palette.grey[800],
            }),
          }),
          thumb: {
            flexShrink: 0,
            width: '14px',
            height: '14px',
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              textTransform: 'none',
              fontWeight: theme.typography.fontWeightSemiBold,
              color: theme.palette.grey[700],
              borderColor: theme.palette.grey[200],
              borderRadius: '8px',
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[500],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              color: theme.palette.grey[200],
              borderColor: theme.palette.primaryDark[700],
              '&.Mui-selected': {
                color: theme.palette.primary[100],
                borderColor: `${(theme.vars || theme).palette.primary[700]} !important`,
                backgroundColor: alpha(theme.palette.primary[900], 0.5),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[900], 0.8),
                },
              },
            }),
          ],
        },
      },
      MuiCssBaseline: {
        defaultProps: {
          enableColorScheme: true,
        },
        styleOverrides: {
          html: {
            overflowY: 'scroll',
            // TODO add support for it,
            // https://github.com/mui/material-ui/issues/40748
            // scrollbarGutter: 'stable',
          },
        },
      },
    },
  };
}

export const brandingDarkTheme = createTheme({
  ...getDesignTokens('dark'),
  ...getThemedComponents(),
});

export const brandingLightTheme = createTheme({
  ...getDesignTokens('light'),
  ...getThemedComponents(),
});
