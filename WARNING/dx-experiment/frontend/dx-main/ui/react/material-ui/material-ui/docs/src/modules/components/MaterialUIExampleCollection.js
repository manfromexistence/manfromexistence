import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';

const examples = [
  {
    name: 'Next.js App Router',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs',
    tsLink: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts',
    src: '/static/images/examples/next.svg',
  },
  {
    name: 'Vite.js',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-vite',
    tsLink: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-vite-ts',
    src: '/static/images/examples/vite.svg',
  },
  {
    name: 'Next.js Pages Router',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-pages-router',
    tsLink:
      'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-pages-router-ts',
    src: '/static/images/examples/next.svg',
  },
  {
    name: 'Remix',
    label: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-remix-ts',
    src: '/static/images/examples/remix.svg',
  },
  {
    name: 'Tailwind CSS + CRA',
    label: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-tailwind-ts',
    src: '/static/images/examples/tailwindcss.svg',
  },
  {
    name: 'Create React App',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra',
    tsLink: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-ts',
    src: '/static/images/examples/cra.svg',
  },
  {
    name: 'styled-components',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-styled-components',
    tsLink:
      'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-styled-components-ts',
    src: '/static/images/examples/styled.png',
  },
  {
    name: 'Preact',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-preact',
    src: '/static/images/examples/preact.svg',
  },
  {
    name: 'CDN',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-via-cdn',
    src: <CloudRoundedIcon />,
  },
  {
    name: 'Express.js (server-rendered)',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-express-ssr',
    src: '/static/images/examples/express.png',
  },
  {
    name: 'Gatsby',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-gatsby',
    src: '/static/images/examples/gatsby.svg',
  },
  {
    name: 'React-admin',
    label: 'View TS example',
    link: 'https://github.com/marmelab/material-ui-react-admin',
    src: '/static/images/examples/reactadmin.svg',
  },
];

export default function MaterialUIExampleCollection() {
  return (
    <Grid container spacing={2}>
      {examples.map((example) => (
        <Grid key={example.name} xs={12} sm={6}>
          <Paper
            variant="outlined"
            sx={(theme) => ({
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
              ...theme.applyDarkStyles({
                bgcolor: 'primaryDark.900',
                background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                borderColor: 'primaryDark.700',
              }),
            })}
          >
            <Avatar
              alt={example.name}
              imgProps={{
                width: '38',
                height: '38',
                loading: 'lazy',
              }}
              {...(typeof example.src === 'string'
                ? { src: example.src }
                : { children: example.src })}
            />
            <div>
              <Typography fontWeight="medium" className="algolia-lvl3">
                {example.name}
              </Typography>
              <Box
                data-ga-event-category="material-ui-example"
                data-ga-event-label={example.name}
                data-ga-event-action="click"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  mt: 0.5,
                  gap: 0.2,
                }}
              >
                <Link
                  href={example.link}
                  variant="body2"
                  sx={{
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                  }}
                >
                  {example.label}
                  <ChevronRightRoundedIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                </Link>
                {!!example.tsLink && (
                  <React.Fragment>
                    <Typography
                      variant="caption"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        opacity: 0.2,
                        mr: 0.75,
                      }}
                    >
                      &bull;
                    </Typography>
                    <Link
                      href={example.tsLink}
                      variant="body2"
                      sx={{
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                    >
                      {example.tsLabel}
                      <ChevronRightRoundedIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                    </Link>
                  </React.Fragment>
                )}
              </Box>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
