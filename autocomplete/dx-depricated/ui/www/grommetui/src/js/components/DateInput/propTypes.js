import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    buttonProps: PropTypes.shape({}),
    calendarProps: PropTypes.shape({}),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    dropProps: PropTypes.shape({}),
    format: PropTypes.string,
    icon: PropTypes.element,
    id: PropTypes.string,
    inline: PropTypes.bool,
    reverse: PropTypes.bool,
    readOnlyCopy: PropTypes.bool,
    inputProps: PropTypes.shape({}),
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
      ]),
      PropTypes.string,
    ]),
  };
}
export const DateInputPropTypes = PropType;
