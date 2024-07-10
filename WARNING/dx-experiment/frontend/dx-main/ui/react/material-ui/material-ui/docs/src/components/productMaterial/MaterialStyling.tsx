import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';
import SwitchAccessShortcutRoundedIcon from '@mui/icons-material/SwitchAccessShortcutRounded';
import DragHandleRounded from '@mui/icons-material/DragHandleRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Frame from 'docs/src/components/action/Frame';
import RealEstateCard from 'docs/src/components/showcase/RealEstateCard';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import FlashCode from 'docs/src/components/animation/FlashCode';

const code = `
<Card
  variant="outlined"
  sx={{
    p: 2,
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 1,
  }}
>
  <CardMedia
    component="img"
    width="100"
    height="100"
    alt="123 Main St, Phoenix, AZ cover"
    src="/images/real-estate.png"
    sx={{
      borderRadius: '6px',
      width: { xs: '100%', sm: 100 },
    }}
  />
  <Box sx={{ alignSelf: 'center', ml: 2 }}>
    <Typography variant="body2" color="text.secondary" fontWeight="regular">
      123 Main St, Phoenix, AZ, USA
    </Typography>
    <Typography fontWeight="bold" noWrap gutterBottom>
      $280k - $310k
    </Typography>
    <Chip
      size="small"
      variant="outlined"
      icon={<InfoRounded />}
      label="Confidence score: 85%"
      sx={(theme) => ({
        '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'success.500' },
        bgcolor: 'success.50',
        borderColor: 'success.100',
        color: 'success.900',
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.700',
          color: 'success.200',
          borderColor: 'success.900',
        }),
      })}
    />
  </Box>
</Card>`;

const startLine = [32, 21, 17];
const endLine = [42, 26, 17];
const scrollTo = [540, 320, 200];

export const useResizeHandle = (
  target: React.MutableRefObject<HTMLDivElement | null>,
  options?: { minWidth?: string; maxWidth?: string },
) => {
  const { minWidth = '0px', maxWidth = '100%' } = options || {};
  const [dragging, setDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
    return Boolean((event as TouchEvent).touches && (event as TouchEvent).touches.length);
  };
  const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent => {
    return Boolean((event as MouseEvent).clientX || (event as MouseEvent).clientX === 0);
  };
  const getClientX = React.useCallback((event: MouseEvent | TouchEvent) => {
    let clientX;
    if (isMouseEvent(event)) {
      clientX = event.clientX;
    }
    if (isTouchEvent(event)) {
      clientX = event.touches[0].clientX;
    }
    return clientX as number;
  }, []);
  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    const clientX = getClientX(event.nativeEvent);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDragging(true);
    setDragOffset(rect.width - (clientX - rect.x));
  };
  React.useEffect(() => {
    function resizeObject(event: MouseEvent | TouchEvent) {
      if (event.cancelable) {
        event.preventDefault();
      }
      const clientX = getClientX(event);

      if (target.current && dragging && clientX) {
        const objectRect = target.current.getBoundingClientRect();
        const newWidth = clientX - objectRect.left + dragOffset;
        target.current.style.width = `clamp(${minWidth}, ${Math.floor(newWidth)}px, ${maxWidth})`;
      }
    }
    function stopResize() {
      setDragging(false);
    }

    if (dragging) {
      document.addEventListener('mousemove', resizeObject, { passive: false });
      document.addEventListener('mouseup', stopResize);
      document.addEventListener('touchmove', resizeObject, { passive: false });
      document.addEventListener('touchend', stopResize);
      return () => {
        document.removeEventListener('mousemove', resizeObject);
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('touchmove', resizeObject);
        document.removeEventListener('touchend', stopResize);
      };
    }
    return () => {};
  }, [dragOffset, dragging, getClientX, maxWidth, minWidth, target]);
  return {
    dragging,
    getDragHandlers: () => ({
      onTouchStart: handleStart,
      onMouseDown: handleStart,
    }),
  };
};

export default function MaterialStyling() {
  const [index, setIndex] = React.useState(0);
  const objectRef = React.useRef<HTMLDivElement | null>(null);
  const { dragging, getDragHandlers } = useResizeHandle(objectRef, { minWidth: '253px' });
  const infoRef = React.useRef<HTMLDivElement | null>(null);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  React.useEffect(() => {
    if (infoRef.current) {
      infoRef.current.scroll({ top: scrollTo[index], behavior: 'smooth' });
    }
    if (objectRef.current) {
      objectRef.current.style.width = '100%';
    }
  }, [index]);

  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Styling"
            title={
              <Typography variant="h2">
                Rapidly add and tweak any styles using <GradientText>CSS utilities</GradientText>
              </Typography>
            }
            description="CSS utilities allow you to move faster and make for a smooth developer experience when styling any component."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<ContrastRoundedIcon color="primary" />}
                title="Leverage the tokens from your theme"
                description="Easily use the design tokens defined in your theme for any CSS property out there."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<SwitchAccessShortcutRoundedIcon color="primary" />}
                title="No context switching"
                description="The styling and component usage are both in the same place, right where you need them."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<DevicesOtherRoundedIcon color="primary" />}
                title="Responsive styles right inside system prop"
                description="An elegant API for writing CSS media queries that match your theme breakpoints."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                overflow: 'auto',
              }}
            >
              <Box
                ref={objectRef}
                style={{ touchAction: dragging ? 'none' : 'auto' }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  p: { xs: 2, sm: 5 },
                  pr: { xs: 2, sm: 3 },
                  minHeight: index === 2 ? 280 : 'initial',
                  backgroundColor: 'transparent',
                }}
              >
                {index === 2 && (
                  <React.Fragment>
                    <Box
                      sx={[
                        {
                          cursor: 'col-resize',
                          display: 'flex',
                          alignItems: 'center',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          height: '100%',
                          color: 'grey.500',
                          '&:hover': {
                            color: 'grey.700',
                          },
                        },
                        (theme) =>
                          theme.applyDarkStyles({
                            color: 'grey.500',
                            '&:hover': {
                              color: 'grey.300',
                            },
                          }),
                      ]}
                      {...getDragHandlers()}
                    >
                      <DragHandleRounded sx={{ transform: 'rotate(90deg)' }} />
                    </Box>
                    <Box
                      sx={(theme) => ({
                        pointerEvents: 'none',
                        width: '1px',
                        bgcolor: 'grey.200',
                        position: 'absolute',
                        left: { xs: 335, sm: 375 },
                        height: '100%',
                        ...theme.applyDarkStyles({
                          bgcolor: 'divider',
                        }),
                      })}
                    >
                      <Box
                        sx={(theme) => ({
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          fontFamily: 'code',
                          left: -30,
                          color: 'text.secondary',
                          borderRadius: '4px',
                          bgcolor: 'grey.50',
                          border: '1px solid',
                          borderColor: 'grey.200',
                          px: 0.5,
                          ...theme.applyDarkStyles({
                            bgcolor: 'primaryDark.700',
                            borderColor: 'primaryDark.600',
                          }),
                        })}
                      >
                        xs
                      </Box>
                      <Box
                        sx={(theme) => ({
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          fontFamily: 'code',
                          left: 7,
                          color: 'text.secondary',
                          borderRadius: '4px',
                          bgcolor: 'grey.50',
                          border: '1px solid',
                          borderColor: 'grey.200',
                          px: 0.5,
                          ...theme.applyDarkStyles({
                            bgcolor: 'primaryDark.700',
                            borderColor: 'primaryDark.600',
                          }),
                        })}
                      >
                        sm
                      </Box>
                    </Box>
                  </React.Fragment>
                )}
                <RealEstateCard sx={{ width: '100%', maxWidth: 343 }} />
              </Box>
            </Frame.Demo>
            <Frame.Info
              ref={infoRef}
              sx={{
                maxHeight: index === 2 ? 282 : 400,
                overflow: 'auto',
              }}
            >
              <Box sx={{ position: 'relative', '&& pre': { bgcolor: 'transparent' } }}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <HighlightedCode
                    copyButtonHidden
                    component={MarkdownElement}
                    code={code}
                    language="jsx"
                  />
                </Box>
                <FlashCode startLine={startLine[index]} endLine={endLine[index]} sx={{ mx: -1 }} />
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
