import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { title: '5.8M', metadata: 'Weekly downloads on npm' },
  { title: '90.5k', metadata: 'Stars on GitHub' },
  { title: '2.9k', metadata: 'Open-source contributors' },
  { title: '18.9k', metadata: 'Followers on X' },
];

export default function MuiStatistics() {
  return (
    <Box
      data-mui-color-scheme="dark"
      sx={(theme) => ({
        pt: { xs: 1, sm: 2.5 },
        pb: { xs: 2, sm: 3 },
        pl: { xs: 2, sm: 0 },
        pr: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: { xs: 0, sm: 1 },
        width: '100%',
        flexWrap: 'wrap',
        background: `linear-gradient(180deg, ${alpha(
          theme.palette.primary[900],
          0.1,
        )} 2%, transparent 80%)`,
      })}
    >
      {data.map((item) => (
        <Box key={item.title} sx={{ width: { xs: '50%', sm: 200 }, p: { xs: 1, sm: 0 } }}>
          <Typography
            variant="h4"
            component="h3"
            fontWeight="semiBold"
            sx={(theme) => ({
              textAlign: { xs: 'left', sm: 'center' },
              color: 'primary.main',
              ...theme.applyDarkStyles({
                color: 'primary.200',
              }),
            })}
          >
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: 'left', sm: 'center' } }}
          >
            {item.metadata}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
