import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    checked: PropTypes.bool,
    children: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.node,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };
}
export const RadioButtonPropTypes = PropType;
