import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
import { GridPropTypes } from '../Grid/propTypes';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    actions: PropTypes.element,
    gridProps: GridPropTypes,
    parent: PropTypes.element,
    responsive: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };
}
export const PageHeaderPropTypes = PropType;
