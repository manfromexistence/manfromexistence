import React, {
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Drop } from '../Drop';
import { Grid } from '../Grid';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { focusStyle, parseMetricToNum, unfocusStyle } from '../../utils';
import { Swatch } from './Swatch';

const DetailControl = styled(Box)`
  &:focus {
    ${focusStyle()}
  }
  &:focus:not(:focus-visible) {
    ${unfocusStyle()}
  }
`;

const Detail = ({
  activeProperty,
  axis,
  data,
  horizontal: horizontalProp,
  pad: padProp,
  series,
  seriesStyles,
  renderValue,
  thickness,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [detailIndex, setDetailIndex] = useState();
  const activeIndex = useRef();
  const detailRefs = useMemo(() => [], []);

  const pad = useMemo(() => {
    // ensure the hit targets and center lines align with
    // the data/guide lines
    let horizontal =
      padProp?.horizontal || (typeof padProp === 'string' && padProp) || 0;
    horizontal = theme.global.edgeSize[horizontal] || horizontal;
    horizontal = parseMetricToNum(horizontal);
    let vertical =
      padProp?.vertical || (typeof padProp === 'string' && padProp) || 0;
    vertical = theme.global.edgeSize[vertical] || vertical;
    vertical = parseMetricToNum(vertical);
    return {
      horizontal: `${horizontal - parseMetricToNum(thickness) / 2}px`,
      vertical: `${vertical}px`,
    };
  }, [padProp, theme.global.edgeSize, thickness]);

  const onMouseLeave = useCallback((event) => {
    // Only remove detail if the mouse isn't over the active index.
    // This helps distinguish leaving the drop on the edge where it is
    // anchored.
    const rect = activeIndex.current.getBoundingClientRect();
    if (
      event.pageX < rect.left ||
      event.pageX > rect.right ||
      event.pageY < rect.top ||
      event.pageY > rect.bottom
    ) {
      activeIndex.current = undefined;
      setDetailIndex(undefined);
    }
  }, []);

  const dropAlign = useMemo(() => {
    let res;
    if (detailIndex > data.length / 2) {
      if (horizontalProp) res = { bottom: 'top' };
      else res = { right: 'left' };
    } else if (horizontalProp) res = { top: 'bottom' };
    else res = { left: 'right' };

    return res;
  }, [data.length, detailIndex, horizontalProp]);

  return (
    <>
      <Keyboard
        onLeft={() => {
          if (detailIndex === undefined) setDetailIndex(data.length - 1);
          else if (detailIndex > 0) setDetailIndex(detailIndex - 1);
        }}
        onRight={() => {
          if (detailIndex === undefined) setDetailIndex(0);
          else if (detailIndex < data.length - 1)
            setDetailIndex(detailIndex + 1);
        }}
      >
        <DetailControl
          key="band"
          tabIndex={0}
          fill
          justify="between"
          responsive={false}
          {...(horizontalProp
            ? {
                direction: 'column',
              }
            : {
                direction: 'row',
                pad,
              })}
          onFocus={() => {}}
          onBlur={() => setDetailIndex(undefined)}
        >
          {data.map((_, i) => {
            const ref = (c) => {
              detailRefs[i] = c;
            };

            return (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                responsive={false}
                {...(horizontalProp
                  ? {
                      justify: 'center',
                      height: thickness,
                    }
                  : {
                      align: 'center',
                      width: thickness,
                    })}
                onMouseOver={(event) => {
                  activeIndex.current = event.currentTarget;
                  setDetailIndex(i);
                }}
                onMouseLeave={onMouseLeave}
                onFocus={() => {}}
                onBlur={() => {}}
              >
                <Box
                  // for horizontal, ref will be placed on child box so
                  // drop is restricted to drop dimensions as opposed
                  // to filling the chart width
                  {...(horizontalProp
                    ? {
                        fill: 'horizontal',
                      }
                    : {
                        ref,
                        fill: 'vertical',
                      })}
                  border={detailIndex === i ? true : undefined}
                >
                  {horizontalProp ? <Box alignSelf="center" ref={ref} /> : null}
                </Box>
              </Box>
            );
          })}
        </DetailControl>
      </Keyboard>
      {detailIndex !== undefined && detailRefs[detailIndex] && (
        <Drop
          key="drop"
          target={detailRefs[detailIndex]}
          align={dropAlign}
          plain
          onMouseLeave={onMouseLeave}
        >
          <Box pad="small" background={{ color: 'background-back' }}>
            <Grid
              columns={['auto', 'auto', 'auto']}
              gap="xsmall"
              align="center"
            >
              {series
                .filter(
                  ({ property }) =>
                    ((!activeProperty || activeProperty === property) &&
                      data?.[detailIndex]?.[property] !== undefined) ||
                    (axis && axis.x && axis.x.property === property),
                )
                .map((serie) => {
                  const propertyStyle = seriesStyles[serie.property];
                  const axisValue = horizontalProp
                    ? data[detailIndex][serie.property]
                    : detailIndex;
                  return (
                    <Fragment key={serie.property}>
                      {propertyStyle ? <Swatch {...propertyStyle} /> : <span />}
                      <Text size="small">{serie.label || serie.property}</Text>
                      <Text size="small" weight="bold">
                        {renderValue(serie, axisValue)}
                      </Text>
                    </Fragment>
                  );
                })}
            </Grid>
          </Box>
        </Drop>
      )}
    </>
  );
};

export { Detail };
