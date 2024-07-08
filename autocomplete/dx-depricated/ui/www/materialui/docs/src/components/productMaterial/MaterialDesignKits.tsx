import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import TextFieldsRounded from '@mui/icons-material/TextFieldsRounded';
import WidgetsRounded from '@mui/icons-material/WidgetsRounded';
import ToggleOnRounded from '@mui/icons-material/ToggleOnRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import { Link } from '@mui/docs/Link';

const DEMOS = ['Components', 'Branding', 'Iconography'];

const Image = styled('img')(({ theme }) => ({
  filter: 'drop-shadow(-2px 4px 4px rgba(61, 71, 82, 0.1))',
  transition: '0.4s',
  display: 'block',
  height: 'auto',
  borderRadius: '10px',
  ...theme.applyDarkStyles({
    filter: 'drop-shadow(-2px 4px 4px rgba(0, 0, 0, 0.3))',
  }),
}));

export default function MaterialDesignKits() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <ToggleOnRounded fontSize="small" />,
    [DEMOS[1]]: <TextFieldsRounded fontSize="small" />,
    [DEMOS[2]]: <WidgetsRounded fontSize="small" />,
  };
  return (
    <Section cozy>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box sx={{ maxWidth: 500 }}>
            <SectionHeadline
              overline="Design kits"
              title={
                <Typography variant="h2">
                  Enhance your <GradientText>design workflow</GradientText>
                </Typography>
              }
              description="The Design kits contain many of the Material UI components with states, variations, colors, typography, and icons. We frequently update it to sync with the most up-to-date release."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item
                  icon={React.cloneElement(icons[name], name === demo ? { color: 'primary' } : {})}
                  title={name}
                />
              </Highlighter>
            ))}
            <More
              component={Link}
              href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=design-cta3#design"
              noLinkStyle
            />
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame>
            <Frame.Demo
              sx={{
                overflow: 'hidden',
                height: { xs: 240, sm: 390 },
                perspective: '1000px',
              }}
            >
              <Fade in={demo === 'Components'} timeout={500}>
                <Box
                  sx={[
                    {
                      width: '100%',
                      height: '100%',
                      '& img': {
                        position: 'absolute',
                        left: '50%',
                        width: { xs: 240, sm: 300 },
                        '&:nth-of-type(1)': {
                          top: 120,
                          transform: 'translate(-70%)',
                        },
                        '&:nth-of-type(2)': {
                          top: 80,
                          transform: 'translate(-50%)',
                        },
                        '&:nth-of-type(3)': {
                          top: 40,
                          transform: 'translate(-30%)',
                        },
                      },
                      '&:hover': {
                        '& img': {
                          filter: 'drop-shadow(-16px 12px 20px rgba(61, 71, 82, 0.2))',
                          '&:nth-of-type(1)': {
                            top: 0,
                            transform: 'scale(0.8) translate(-108%) rotateY(30deg)',
                          },
                          '&:nth-of-type(2)': {
                            top: 40,
                            transform: 'scale(0.8) translate(-54%) rotateY(30deg)',
                          },
                          '&:nth-of-type(3)': {
                            top: 40,
                            transform: 'scale(0.8) translate(-0%) rotateY(30deg)',
                          },
                        },
                      },
                    },
                    (theme) =>
                      theme.applyDarkStyles({
                        '&:hover': {
                          '& img': {
                            filter: 'drop-shadow(-16px 12px 20px rgba(0, 0, 0, 0.4))',
                          },
                        },
                      }),
                  ]}
                >
                  <Image
                    src={`/static/branding/design-kits/Button-light.jpeg`}
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/Button-dark.jpeg)`,
                      })
                    }
                  />
                  <Image
                    src={`/static/branding/design-kits/Alert-light.jpeg`}
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/Alert-dark.jpeg)`,
                      })
                    }
                  />
                  <Image
                    src={`/static/branding/design-kits/Slider-light.jpeg`}
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/Slider-dark.jpeg)`,
                      })
                    }
                  />
                </Box>
              </Fade>
              <Fade in={demo === 'Branding'} timeout={500}>
                <Image
                  src={`/static/branding/design-kits/Colors-light.jpeg`}
                  alt=""
                  loading="lazy"
                  width="300"
                  sx={(theme) => ({
                    width: { sm: 400 },
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    ...theme.applyDarkStyles({
                      content: `url(/static/branding/design-kits/Colors-dark.jpeg)`,
                    }),
                  })}
                />
              </Fade>
              <Fade in={demo === 'Iconography'} timeout={500}>
                <Image
                  src={`/static/branding/design-kits/Icons-light.jpeg`}
                  alt=""
                  loading="lazy"
                  width="300"
                  sx={(theme) => ({
                    width: { sm: 500 },
                    position: 'absolute',
                    left: '50%',
                    top: 60,
                    transform: 'translate(-40%)',
                    ...theme.applyDarkStyles({
                      content: `url(/static/branding/design-kits/Icons-dark.jpeg)`,
                    }),
                  })}
                />
              </Fade>
            </Frame.Demo>
            <Frame.Info
              data-mui-color-scheme="dark"
              sx={{
                display: 'flex',
                alignItems: { xs: 'start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                minWidth: 0,
                gap: { xs: 3, sm: 0 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'start', sm: 'center' },
                  gap: 1,
                }}
              >
                <Typography variant="body2" fontWeight="semiBold">
                  Available for:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, '& >img': { width: 26, height: 26 } }}>
                  <img src="/static/branding/design-kits/figma-logo.svg" alt="" loading="lazy" />
                  <img src="/static/branding/design-kits/sketch-logo.svg" alt="" loading="lazy" />
                  <img src="/static/branding/design-kits/adobexd-logo.svg" alt="" loading="lazy" />
                </Box>
              </Box>
              <Button
                component={Link}
                variant="outlined"
                href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=design-cta2#design"
                endIcon={<LaunchRounded sx={{ '&&': { fontSize: 16 } }} />}
                sx={{
                  ml: { xs: 0, sm: 'auto' },
                  color: 'primary.300',
                  width: { xs: '100%', sm: 'fit-content' },
                }}
              >
                Buy now
              </Button>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
