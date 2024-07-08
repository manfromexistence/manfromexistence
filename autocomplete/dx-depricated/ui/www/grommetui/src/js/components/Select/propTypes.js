import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

export const genericSelectProps = {
  ...genericProps,
  children: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.object,
      ]),
    ),
  ]),
  disabledKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  dropAlign: PropTypes.shape({
    top: PropTypes.oneOf(['top', 'bottom']),
    bottom: PropTypes.oneOf(['top', 'bottom']),
    right: PropTypes.oneOf(['left', 'right']),
    left: PropTypes.oneOf(['left', 'right']),
  }),
  dropHeight: PropTypes.oneOfType([
    PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
    PropTypes.string,
  ]),
  dropTarget: PropTypes.object,
  dropProps: PropTypes.object,
  emptySearchMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  focusIndicator: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.elementType,
  ]),
  labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  messages: PropTypes.shape({
    multiple: PropTypes.string,
  }),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onSearch: PropTypes.func,
  onMore: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.element,
      PropTypes.object,
    ]),
  ).isRequired,
  open: PropTypes.bool,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  plain: PropTypes.bool,
  replace: PropTypes.bool,
  searchPlaceholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    PropTypes.string,
  ]),
  valueLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  valueKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      key: PropTypes.string,
      reduce: PropTypes.bool,
    }),
  ]),
};

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericSelectProps,
    clear: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        position: PropTypes.oneOf(['top', 'bottom']),
        label: PropTypes.string,
      }),
    ]),
    closeOnChange: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.object,
          PropTypes.number,
        ]),
      ),
    ]),
    multiple: PropTypes.bool,
    selected: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),

    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element, // deprecated, use valueLabel
      PropTypes.object,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.object,
          PropTypes.number,
        ]),
      ),
    ]),
  };
}
export const SelectPropTypes = PropType;
