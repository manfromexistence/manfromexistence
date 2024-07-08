import { CaretDownFill, CaretUpFill, FormCheckmark } from 'grommet-icons';

import { normalizeColor } from '../../../utils';

import { SearchInput } from './components/SearchInput';

export const theme = {
  global: {
    colors: {
      selected: 'neutral-3',
      border: '#e0e0e0',
      focus: '#2196F3',
      gray: 'rgba(0, 0, 0, 0.54)',
    },
    control: {
      border: {
        radius: '24px',
      },
    },
    drop: {
      background: '#ffffff',
    },
    elevation: {
      light: {
        small: '0 2px 2px 0 rgba(0,0,0,0.19)',
        medium: '0 3px 3px 0 rgba(0,0,0,0.18)',
        large: '0 4px 4px 0 rgba(0,0,0,0.17)',
        xlarge: '0 24px 24px 0 rgba(0, 0, 0, 0.12)',
      },
    },
    font: {
      family: 'Arial',
      size: '12px',
    },
    input: {
      weight: 400,
    },
    size: {
      xxsmall: '24px',
    },
  },
  text: {
    medium: '13px',
  },
  checkBox: {
    border: {
      color: {
        light: 'brand',
      },
      radius: '2px',
    },
    color: {
      light: 'brand',
    },
    check: {
      extend: ({ theme: extendTheme, checked }) => `
        ${
          checked &&
          `background-color: ${normalizeColor('brand', extendTheme)};`
        }
      `,
    },
    hover: {
      border: {
        color: undefined,
      },
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;',
    },
    icons: {
      checked: FormCheckmark,
    },
    gap: 'small',
    size: '18px',
    extend: `
      color: #9C9C9C;
    `,
  },
  drop: {
    maxHeight: '384px',
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
      open: {
        background: '#ece0fa',
        border: '1px solid #7D4CDB',
      },
    },
    icons: {
      down: CaretDownFill,
      up: CaretUpFill,
      color: 'dark-1',
      margin: 'small',
    },
    searchInput: SearchInput,
    container: {
      text: {
        size: 'small',
      },
      extend: 'max-height: 250px;',
    },
  },
  textInput: {
    extend: (props) => `
      color: ${normalizeColor('gray', props.theme)};
      font-weight: 400;
      font-size: 13px;
      padding: 14px;
    `,
  },
};
