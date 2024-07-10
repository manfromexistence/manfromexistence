fn({
  MuiDivider: {
    defaultProps: {
      light: true,
    },
  },
});
fn({
  MuiDivider: {
    defaultProps: {
      light: true,
      className: 'my-class',
    },
  },
});
fn({
  MuiDivider: {
    defaultProps: {
      light,
      className: 'my-class',
    },
  },
});

fn({
  MuiDivider: {
    defaultProps: {
      light,
      className: 'my-class',
      sx: {
        opacity: '0.7',
      },
    },
  },
});

fn({
  MuiDivider: {
    defaultProps: {
      light,
      className: 'my-class',
      sx: {
        bgcolor: 'black',
      },
    },
  },
});
