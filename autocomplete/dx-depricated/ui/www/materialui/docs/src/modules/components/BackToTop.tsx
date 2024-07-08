import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Fade from '@mui/material/Fade';
import { Theme } from '@mui/material/styles';
import { useTranslate } from '@mui/docs/i18n';

export default function BackToTop() {
  const t = useTranslate();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth';

    window.scrollTo({ top: 0, behavior });
    setOpen(false);
  };

  return (
    <Fade in={trigger}>
      <Tooltip
        title="Scroll to top"
        placement="left"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <Box
          className="mui-fixed"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 10,
          }}
        >
          <Fab
            size="small"
            aria-label={t('backToTop')}
            onClick={handleClick}
            data-ga-event-category="docs"
            data-ga-event-action="click-back-to-top"
            sx={(theme) => ({
              backgroundColor: (theme.vars || theme).palette.primary[50],
              border: `1px solid ${(theme.vars || theme).palette.primary[200]}`,
              boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.primary[200],
              },
              ...theme.applyDarkStyles({
                backgroundColor: (theme.vars || theme).palette.primary[900],
                borderColor: (theme.vars || theme).palette.primary[700],
                boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.8)`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[800],
                },
              }),
            })}
          >
            <KeyboardArrowUpRoundedIcon
              sx={(theme: Theme) => ({
                color: (theme.vars || theme).palette.primary[800],
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[200],
                }),
              })}
            />
          </Fab>
        </Box>
      </Tooltip>
    </Fade>
  );
}
