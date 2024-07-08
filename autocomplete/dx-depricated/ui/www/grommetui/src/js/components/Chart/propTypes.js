import PropTypes from 'prop-types';
import {
  colorPropType,
  genericProps,
  padPropType,
  patternPropType,
  pointPropType,
} from '../../utils/general-prop-types';

const thicknessType = PropTypes.oneOfType([
  PropTypes.oneOf([
    'hair',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
    'none',
  ]),
  PropTypes.string,
  PropTypes.number,
]);

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    animate: PropTypes.bool,
    bounds: PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
        y: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
      }),
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    ]),
    color: PropTypes.oneOfType([
      colorPropType,
      PropTypes.shape({
        color: colorPropType,
        // deprecated, use top level 'opacity'
        opacity: PropTypes.oneOfType([
          PropTypes.oneOf(['weak', 'medium', 'strong']),
          PropTypes.bool,
        ]),
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          color: colorPropType,
          value: PropTypes.number,
        }),
      ),
    ]),
    id: PropTypes.string,
    dash: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    gap: PropTypes.oneOfType([
      PropTypes.oneOf([
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ]),
      PropTypes.string,
    ]),
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    opacity: PropTypes.oneOfType([
      PropTypes.oneOf(['weak', 'medium', 'strong']),
      PropTypes.bool,
    ]),
    overflow: PropTypes.bool,
    pad: padPropType,
    pattern: patternPropType,
    point: pointPropType,
    round: PropTypes.bool,
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'fill',
        'full',
      ]),
      PropTypes.shape({
        height: PropTypes.oneOfType([
          PropTypes.oneOf([
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'fill',
            'full',
          ]),
          PropTypes.string,
        ]),
        width: PropTypes.oneOfType([
          PropTypes.oneOf([
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'fill',
            'full',
            'auto',
          ]),
          PropTypes.string,
        ]),
      }),
      PropTypes.string,
    ]),
    thickness: thicknessType,
    type: PropTypes.oneOf(['bar', 'line', 'area', 'point']),
    values: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
          color: colorPropType,
          label: PropTypes.string, // for accessibility of bars and points
          onClick: PropTypes.func,
          onHover: PropTypes.func,
          opacity: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
          ]),
          thickness: thicknessType,
          value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.number),
          ]),
        }),
      ]),
    ),
  };
}
export const ChartPropTypes = PropType;
