import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import Paper from '@mui/material/Paper';
import SnackbarContent, {
  snackbarContentClasses as classes,
} from '@mui/material-next/SnackbarContent';
import describeConformance from '../../test/describeConformance';

describe('<SnackbarContent />', () => {
  const { render } = createRenderer();

  describeConformance(<SnackbarContent message="conform?" />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    muiName: 'MuiSnackbarContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));

  describe('prop: action', () => {
    it('should render the action', () => {
      const action = <span>action</span>;
      const { container } = render(
        <SnackbarContent message="message" data-testid="action" action={action} />,
      );
      expect(container.querySelector(`.${classes.action}`)).to.have.class(classes.action);
      expect(container.querySelector(`.${classes.action}`)).to.contain('span');
    });

    it('should render an array of elements', () => {
      const action0 = <span key={0}>action0</span>;
      const action1 = <span key={1}>action1</span>;
      const { getByText } = render(
        <SnackbarContent message="message" action={[action0, action1]} />,
      );
      expect(getByText('action0')).not.to.equal(null);
      expect(getByText('action1')).not.to.equal(null);
    });
  });

  describe('prop: message', () => {
    it('should render the message', () => {
      const message = 'message prop text';
      const { getByRole } = render(<SnackbarContent message={<span>{message}</span>} />);
      expect(getByRole('alert')).to.have.text(message);
    });
  });

  describe('prop: role', () => {
    it('renders the default role', () => {
      const { getByRole } = render(<SnackbarContent message="alert message" />);
      expect(getByRole('alert')).to.have.text('alert message');
    });

    it('can override the role', () => {
      const { queryByRole } = render(
        <SnackbarContent message="alertdialog message" role="alertdialog" />,
      );
      expect(queryByRole('alertdialog')).to.have.text('alertdialog message');
    });
  });
});
