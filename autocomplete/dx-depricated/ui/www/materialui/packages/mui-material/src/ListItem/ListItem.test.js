import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { act, createRenderer, fireEvent, queries } from '@mui-internal/test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItem, { listItemClasses as classes } from '@mui/material/ListItem';
import ListContext from '../List/ListContext';
import describeConformance from '../../test/describeConformance';

const NoContent = React.forwardRef(() => {
  return null;
});

describe('<ListItem />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    refInstanceof: window.HTMLLIElement,
    muiName: 'MuiListItem',
    testVariantProps: { dense: true },
    testLegacyComponentsProp: true,
    slots: {
      root: {},
    },
    skip: [
      'componentsProp',
      'slotPropsCallback', // not supported yet
    ],
  }));

  it('should render with gutters classes', () => {
    const { getByRole } = render(<ListItem />);
    expect(getByRole('listitem')).to.have.class(classes.gutters);
  });

  it('should render with the selected class', () => {
    const { getByRole } = render(<ListItem selected />);
    expect(getByRole('listitem')).to.have.class(classes.selected);
  });

  it('should disable the gutters', () => {
    const { getByRole } = render(<ListItem disableGutters />);
    expect(getByRole('listitem')).not.to.have.class(classes.gutters);
  });

  describe('prop: button', () => {
    it('renders a div', () => {
      const { container } = render(<ListItem button />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <ListItem>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItem>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });

  describe('action', () => {
    it('should show action if provided', () => {
      const { getByText } = render(<ListItem secondaryAction="foo" />);
      expect(getByText('foo')).toBeVisible();
    });
  });

  // TODO remove in v6 in favor of ListItemButton
  describe('secondary action', () => {
    it('should wrap with a container', () => {
      const { getByRole } = render(
        <ListItem>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(listItem.querySelector(`div.${classes.root}`)).not.to.equal(null);
    });

    it('should accept a component property', () => {
      const { getByRole } = render(
        <ListItem component="span">
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(listItem.querySelector(`span.${classes.root}`)).not.to.equal(null);
    });

    it('should accept a button property', () => {
      const { getByRole } = render(
        <ListItem button>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(queries.getByRole(listItem, 'button')).not.to.equal(null);
    });

    it('should accept a ContainerComponent property', () => {
      const { getByRole } = render(
        <ListItem ContainerComponent="div" ContainerProps={{ role: 'listitem' }}>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.property('nodeName', 'DIV');
      expect(listItem).to.have.class(classes.container);
      expect(listItem.querySelector(`div.${classes.root}`)).not.to.equal(null);
    });

    it('can autofocus a custom ContainerComponent', () => {
      const { getByRole } = render(
        <ListItem
          autoFocus
          ContainerComponent="div"
          ContainerProps={{ role: 'listitem', tabIndex: -1 }}
        >
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );

      expect(getByRole('listitem')).toHaveFocus();
    });

    it('should allow customization of the wrapper', () => {
      const { getByRole } = render(
        <ListItem ContainerProps={{ className: 'bubu', role: 'listitem' }}>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(listItem).to.have.class('bubu');
    });

    describe('warnings', () => {
      beforeEach(() => {
        PropTypes.resetWarningCache();
      });

      it('warns if it cant detect the secondary action properly', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            ListItem.propTypes,
            {
              classes: {},
              children: [
                <ListItemSecondaryAction>I should have come last :(</ListItemSecondaryAction>,
                <ListItemText>My position does not matter.</ListItemText>,
              ],
            },
            'prop',
            'MockedName',
          );
        }).toErrorDev('Warning: Failed prop type: MUI: You used an element');
      });

      it('should warn (but not error) with autoFocus with a function component with no content', () => {
        expect(() => {
          render(<ListItem component={NoContent} autoFocus />);
        }).toErrorDev([
          'MUI: Unable to set focus to a ListItem whose component has not been rendered.',
          // React 18 Strict Effects run mount effects twice
          React.version.startsWith('18') &&
            'MUI: Unable to set focus to a ListItem whose component has not been rendered.',
        ]);
      });
    });
  });

  // TODO remove in v6 in favor of ListItemButton
  describe('prop: focusVisibleClassName', () => {
    it('should merge the class names', () => {
      const { getByRole } = render(
        <ListItem button focusVisibleClassName="focusVisibleClassName" />,
      );
      const button = getByRole('button');

      act(() => {
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
        button.focus();
      });

      expect(button).to.have.class('focusVisibleClassName');
      expect(button).to.have.class(classes.focusVisible);
    });
  });

  it('container overrides should work', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const testStyle = {
      marginTop: '13px',
    };

    const theme = createTheme({
      components: {
        MuiListItem: {
          styleOverrides: {
            container: testStyle,
          },
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <ListItem>
          Test<ListItemSecondaryAction>SecondaryAction</ListItemSecondaryAction>
        </ListItem>
      </ThemeProvider>,
    );

    const listItemContainer = container.getElementsByClassName(classes.container)[0];
    expect(listItemContainer).to.toHaveComputedStyle(testStyle);
  });
});
