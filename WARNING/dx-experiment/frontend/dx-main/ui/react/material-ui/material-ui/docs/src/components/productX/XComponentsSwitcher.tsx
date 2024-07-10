import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import PivotTableChartRoundedIcon from '@mui/icons-material/PivotTableChartRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { visuallyHidden } from '@mui/utils';
import Highlighter from 'docs/src/components/action/Highlighter';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';

const SwipeableViews = dynamic(() => import('react-swipeable-views'), { ssr: false });

function ComponentItem({
  label,
  icon,
  name,
  description,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  name: React.ReactNode;
  description?: React.ReactNode;
  href: string;
}) {
  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        p: 2,
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        gap: 2.5,
      }}
    >
      <div>{icon}</div>
      <div>
        <Typography
          component="span"
          color="text.primary"
          variant="body2"
          fontWeight="bold"
          display="block"
        >
          {name}
        </Typography>
        {description && (
          <Typography
            component="span"
            color="text.secondary"
            variant="body2"
            fontWeight="regular"
            display="block"
            gutterBottom
          >
            {description}
          </Typography>
        )}
        <Link
          href={href}
          color="primary"
          variant="body2"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            fontWeight: 'semiBold',
            '& > svg': { transition: '0.2s' },
            '&:hover > svg': { transform: 'translateX(2px)' },
          }}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.stopPropagation();
          }}
        >
          <span>View the docs</span>{' '}
          <Box component="span" sx={visuallyHidden}>
            {label}
          </Box>
          <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
        </Link>
      </div>
    </Box>
  );
}

export default function XComponentsSwitcher(props: {
  componentIndex: number;
  setComponentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { componentIndex, setComponentIndex } = props;
  const componentElement = [
    <ComponentItem
      name="Data Grid"
      label="Fast, feature-rich data table."
      description="Fast, feature-rich data table."
      icon={<PivotTableChartRoundedIcon />}
      href={ROUTES.dataGridOverview}
    />,
    <ComponentItem
      name="Date and Time Pickers"
      description="A suite of components for selecting dates, times, and ranges."
      label="A suite of components for selecting dates, times, and ranges."
      icon={<CalendarMonthRoundedIcon />}
      href={ROUTES.datePickersOverview}
    />,
    <ComponentItem
      name="Charts"
      description="A collection of data visualization graphs, including bar, line, pie, scatter, and more."
      label="A collection of data visualization graphs, including bar, line, pie, scatter, and more."
      icon={<BarChartRoundedIcon />}
      href={ROUTES.chartsOverview}
    />,
    <ComponentItem
      name="Tree View"
      description="Display hierarchical data, such as a file system navigator."
      label="Display hierarchical data, such as a file system navigator."
      icon={<AccountTreeRounded />}
      href={ROUTES.treeViewOverview}
    />,
  ];
  return (
    <React.Fragment>
      <Box
        sx={{
          display: { md: 'none' },
          maxWidth: 'calc(100vw - 40px)',
          minHeight: { xs: 200, sm: 166 },
          '& > div': { pr: '32%' },
        }}
      >
        <SwipeableViews
          index={componentIndex}
          resistance
          enableMouseEvents
          onChangeIndex={(index) => setComponentIndex(index)}
        >
          {componentElement.map((element, index) => (
            <Highlighter
              key={index}
              disableBorder
              onClick={() => setComponentIndex(index)}
              selected={componentIndex === index}
              sx={{
                width: '100%',
                transition: '0.3s',
                transform: componentIndex !== index ? 'scale(0.9)' : 'scale(1)',
              }}
            >
              {element}
            </Highlighter>
          ))}
        </SwipeableViews>
      </Box>
      <Stack spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 500 }}>
        {componentElement.map((element, index) => (
          <Highlighter
            key={index}
            disableBorder
            onClick={() => setComponentIndex(index)}
            selected={componentIndex === index}
          >
            {element}
          </Highlighter>
        ))}
      </Stack>
    </React.Fragment>
  );
}
