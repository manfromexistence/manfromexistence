import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import {
  act,
  createRenderer,
  createMount,
  screen,
  fireEvent,
  strictModeDoubleLoggingSuppressed,
} from '@mui-internal/test-utils';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import { useMenuButton } from '@mui/base/useMenuButton';
import Button from '@mui/material/Button';
import Menu, { menuClasses as classes, MenuProps } from '@mui/material-next/Menu';
import Popover from '@mui/material/Popover';
import { extendTheme, CssVarsProvider } from '@mui/material-next/styles';
import { MenuPaper } from './Menu';
import describeConformance from '../../test/describeConformance';

describe('<Menu />', () => {
  const { render } = createRenderer({ clock: 'fake' });
  const mount = createMount();

  describeConformance(<Menu anchorEl={() => document.createElement('div')} open />, () => ({
    classes,
    inheritComponent: Popover,
    render,
    muiName: 'MuiMenu',
    refInstanceof: window.HTMLDivElement,
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      // TODO v6: Enable this API
      // paper: {
      //   expectedClassName: classes.paper,
      // },
    },
    testDeepOverrides: { slotName: 'list', slotClassName: classes.list },
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    testVariantProps: { variant: 'menu' },
    skip: [
      'rootClass', // portal, can't determine the root
      'componentProp',
      'componentsProp',
      'reactTestRenderer', // react-transition-group issue
      'themeDefaultProps', // portal, can't determine the root
    ],
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', () => {
        const handleEnter = spy();
        const handleEntering = spy();
        render(
          <Menu
            anchorEl={document.createElement('div')}
            open
            TransitionProps={{
              onEnter: handleEnter,
              onEntering: handleEntering,
            }}
          />,
        );

        expect(handleEnter.callCount).to.equal(
          // onEnter is called on mount which is run twice with Strict Effects
          React.version.startsWith('18') ? 2 : 1,
        );
        expect(handleEnter.args[0].length).to.equal(2);
        expect(handleEntering.callCount).to.equal(1);
        expect(handleEntering.args[0].length).to.equal(2);
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', () => {
        const handleExit = spy();
        const handleExiting = spy();

        const { setProps } = render(
          <Menu
            TransitionProps={{
              onExit: handleExit,
              onExiting: handleExiting,
            }}
            anchorEl={document.createElement('div')}
            open
          />,
        );

        setProps({
          open: false,
        });

        expect(handleExit.callCount).to.equal(1);
        expect(handleExit.args[0].length).to.equal(1);
        expect(handleExiting.callCount).to.equal(1);
        expect(handleExiting.args[0].length).to.equal(1);
      });
    });
  });

  it('should pass `classes.paper` to the Paper', () => {
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        PaperProps={{ 'data-testid': 'paper' }}
      />,
    );

    expect(screen.getByTestId('paper')).to.have.class(classes.paper);
  });

  describe('prop: PopoverClasses', () => {
    it('should be able to change the Popover style', () => {
      render(
        <Menu
          anchorEl={document.createElement('div')}
          open
          PaperProps={{ 'data-testid': 'paper' }}
          PopoverClasses={{ paper: 'bar' }}
        />,
      );

      expect(screen.getByTestId('paper')).to.have.class('bar');
    });

    it('should be able to change the Popover root element style when Menu classes prop is also provided', () => {
      render(
        <Menu
          anchorEl={document.createElement('div')}
          open
          data-testid="popover"
          classes={{ paper: 'bar' }}
          PopoverClasses={{ root: 'foo' }}
        />,
      );
      expect(screen.getByTestId('popover')).to.have.class('foo');
    });
  });

  describe('prop: PaperProps', () => {
    it('should be passed to the paper component', () => {
      const customElevation = 12;
      const customClasses = { rounded: 'custom-rounded-class' };
      const wrapper = mount(
        <Menu
          anchorEl={document.createElement('div')}
          open
          PaperProps={{
            'data-testid': 'paper',
            elevation: customElevation,
            classes: customClasses,
          }}
        />,
      );

      expect(wrapper.find(MenuPaper).props().elevation).to.equal(customElevation);
      expect(wrapper.find(MenuPaper).props().classes).to.contain(customClasses);
    });
  });

  it('should pass onClose prop to Popover', () => {
    const handleClose = spy();
    render(<Menu anchorEl={document.createElement('div')} open onClose={handleClose} />);

    act(() => {
      screen.getByRole('menu').focus();
    });
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    expect(handleClose.callCount).to.equal(1);
  });

  it('renders its children only when open', () => {
    const { setProps } = render(
      <Menu anchorEl={document.createElement('div')} open={false}>
        <div data-testid="children" />
      </Menu>,
    );

    expect(screen.queryByTestId('children')).to.equal(null);

    setProps({ open: true });

    expect(screen.getByTestId('children')).not.to.equal(null);
  });

  describe('list node', () => {
    it('should render a menu inside the Popover', () => {
      render(<Menu anchorEl={document.createElement('div')} open data-testid="popover" />);

      expect(screen.getByTestId('popover').querySelector('[role="menu"]')).not.to.equal(null);
    });
  });

  it('should open during the initial mount', () => {
    function MenuItem(props: { children?: React.ReactNode }) {
      const { children } = props;
      return (
        <div role="menuitem" tabIndex={-1}>
          {children}
        </div>
      );
    }
    render(
      <Menu anchorEl={document.createElement('div')} open>
        <MenuItem>one</MenuItem>
      </Menu>,
    );

    expect(screen.getByRole('menuitem')).to.not.equal(null);
  });

  it('should not focus list if autoFocus=false', () => {
    const { setProps } = render(
      <Menu anchorEl={document.createElement('div')} autoFocus={false} open={false}>
        <div tabIndex={-1} />
      </Menu>,
    );

    act(() => {
      setProps({ open: true });
    });

    expect(screen.getByRole('menu')).not.toHaveFocus();
  });

  it('should call TransitionProps.onEntering', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        TransitionProps={{ onEntering: onEnteringSpy }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('should call TransitionProps.onEntering, disableAutoFocusItem', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        disableAutoFocusItem
        open
        TransitionProps={{ onEntering: onEnteringSpy }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('should call onClose on tab', () => {
    function MenuItem(props: { autoFocus?: boolean; children?: React.ReactNode }) {
      const { autoFocus, children } = props;

      const ref = React.useRef<HTMLDivElement | null>(null);
      React.useEffect(() => {
        if (autoFocus) {
          ref?.current?.focus();
        }
      }, [autoFocus]);

      return (
        <div ref={ref} role="menuitem" tabIndex={-1}>
          {children}
        </div>
      );
    }
    const onCloseSpy = spy();
    render(
      <Menu anchorEl={document.createElement('div')} open onClose={onCloseSpy}>
        <MenuItem>hello</MenuItem>
      </Menu>,
    );

    act(() => {
      screen.getByRole('menuitem').focus();
    });
    fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Tab' });

    expect(onCloseSpy.callCount).to.equal(1);
    expect(onCloseSpy.args[0][1]).to.equal('tabKeyDown');
  });

  it('ignores invalid children', () => {
    render(
      <Menu anchorEl={document.createElement('div')} open>
        {null}
        <span role="menuitem">hello</span>
        {/* testing conditional rendering */}
        {false && <span role="menuitem">hello</span>}
        {undefined}
        foo
      </Menu>,
    );

    expect(screen.getAllByRole('menuitem')).to.have.length(1);
  });

  describe('warnings', () => {
    it('warns a Fragment is passed as a child', () => {
      expect(() => {
        render(
          <Menu anchorEl={document.createElement('div')} open={false}>
            {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
            <React.Fragment />
          </Menu>,
        );
      }).toErrorDev([
        "MUI: The Menu component doesn't accept a Fragment as a child.",
        !strictModeDoubleLoggingSuppressed &&
          "MUI: The Menu component doesn't accept a Fragment as a child.",
        "MUI: The Menu component doesn't accept a Fragment as a child.",
        !strictModeDoubleLoggingSuppressed &&
          "MUI: The Menu component doesn't accept a Fragment as a child.",
      ]);
    });
  });

  describe('theme customization', () => {
    it('should override Menu Paper styles following correct precedence', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const menuPaperOverrides = { borderRadius: 4 };
      const popoverPaperOverrides = { borderRadius: 8, height: 100 };
      const rootPaperOverrides = { borderRadius: 16, height: 200, width: 200 };

      const theme = extendTheme({
        components: {
          MuiMenu: { styleOverrides: { paper: menuPaperOverrides } },
          MuiPopover: { styleOverrides: { paper: popoverPaperOverrides } },
          MuiPaper: { styleOverrides: { root: rootPaperOverrides } },
        },
      });

      render(
        <CssVarsProvider theme={theme}>
          <Menu
            anchorEl={document.createElement('div')}
            open
            PaperProps={{
              'data-testid': 'paper',
            }}
          />
        </CssVarsProvider>,
      );

      const paper = screen.getByTestId('paper');
      expect(paper).toHaveComputedStyle({
        borderTopLeftRadius: `${menuPaperOverrides.borderRadius}px`,
        borderBottomLeftRadius: `${menuPaperOverrides.borderRadius}px`,
        borderTopRightRadius: `${menuPaperOverrides.borderRadius}px`,
        borderBottomRightRadius: `${menuPaperOverrides.borderRadius}px`,
        height: `${popoverPaperOverrides.height}px`,
        width: `${rootPaperOverrides.width}px`,
      });
    });

    it('should override Menu Paper styles using styles in MuiPaper slot', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const theme = extendTheme({
        components: {
          MuiPaper: { styleOverrides: { rounded: { borderRadius: 90 } } },
        },
      });

      render(
        <CssVarsProvider theme={theme}>
          <Menu
            anchorEl={document.createElement('div')}
            open
            PaperProps={{
              'data-testid': 'paper',
            }}
          />
        </CssVarsProvider>,
      );

      const paper = screen.getByTestId('paper');
      expect(paper).toHaveComputedStyle({
        borderTopLeftRadius: '90px',
        borderBottomLeftRadius: '90px',
        borderTopRightRadius: '90px',
        borderBottomRightRadius: '90px',
      });
    });
  });

  describe('paper', () => {
    it('should use MenuPaper component', () => {
      const wrapper = mount(
        <Menu anchorEl={document.createElement('div')} open>
          <div />
        </Menu>,
      );

      expect(wrapper.find(MenuPaper)).to.have.length(1);
    });
  });

  describe('slots', () => {
    it('should merge slots with existing values', () => {
      const wrapper = mount(
        <Menu slots={{ root: 'span' }} anchorEl={document.createElement('div')} open>
          <div />
        </Menu>,
      );

      expect(wrapper.find(MenuPaper)).to.have.length(1);
    });
  });

  const MenuButton = React.forwardRef<
    HTMLButtonElement,
    { id?: string; children?: React.ReactNode }
  >(function MenuButton(props, forwardedRef) {
    const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

    return <Button type="button" {...props} {...getButtonProps()} />;
  });

  function ContextMenu({ open, ...menuProps }: MenuProps) {
    const { contextValue: dropdownContextValue } = useDropdown({ defaultOpen: open });

    return (
      <DropdownContext.Provider value={dropdownContextValue}>
        <MenuButton id="basic-button" aria-haspopup="true" data-testid="menu-button">
          Dashboard
        </MenuButton>
        <Menu {...menuProps} />
      </DropdownContext.Provider>
    );
  }

  describe('using context', () => {
    describe('event callbacks', () => {
      describe('entering', () => {
        it('should fire callbacks', () => {
          const handleEnter = spy();
          const handleEntering = spy();
          render(
            <ContextMenu
              open
              anchorEl={document.createElement('div')}
              TransitionProps={{
                onEnter: handleEnter,
                onEntering: handleEntering,
              }}
            />,
          );

          expect(handleEnter.callCount).to.equal(
            // onEnter is called on mount which is run twice with Strict Effects
            React.version.startsWith('18') ? 2 : 1,
          );
          expect(handleEnter.args[0].length).to.equal(2);
          expect(handleEntering.callCount).to.equal(1);
          expect(handleEntering.args[0].length).to.equal(2);
        });
      });

      describe('exiting', () => {
        it('should fire callbacks', () => {
          const handleExit = spy();
          const handleExiting = spy();

          const { getByTestId } = render(
            <ContextMenu
              TransitionProps={{
                onExit: handleExit,
                onExiting: handleExiting,
              }}
              anchorEl={document.createElement('div')}
              open
            />,
          );

          act(() => {
            getByTestId('menu-button').click();
          });

          expect(handleExit.callCount).to.equal(1);
          expect(handleExit.args[0].length).to.equal(1);
          expect(handleExiting.callCount).to.equal(1);
          expect(handleExiting.args[0].length).to.equal(1);
        });
      });
    });

    it('should pass `classes.paper` to the Paper', () => {
      render(
        <ContextMenu
          anchorEl={document.createElement('div')}
          open
          PaperProps={{ 'data-testid': 'paper' }}
        />,
      );

      expect(screen.getByTestId('paper')).to.have.class(classes.paper);
    });

    describe('prop: PopoverClasses', () => {
      it('should be able to change the Popover style', () => {
        render(
          <ContextMenu
            anchorEl={document.createElement('div')}
            open
            PaperProps={{ 'data-testid': 'paper' }}
            PopoverClasses={{ paper: 'bar' }}
          />,
        );

        expect(screen.getByTestId('paper')).to.have.class('bar');
      });

      it('should be able to change the Popover root element style when Menu classes prop is also provided', () => {
        render(
          <ContextMenu
            anchorEl={document.createElement('div')}
            open
            data-testid="popover"
            classes={{ paper: 'bar' }}
            PopoverClasses={{ root: 'foo' }}
          />,
        );
        expect(screen.getByTestId('popover')).to.have.class('foo');
      });
    });

    describe('prop: PaperProps', () => {
      it('should be passed to the paper component', () => {
        const customElevation = 12;
        const customClasses = { rounded: 'custom-rounded-class' };
        const wrapper = mount(
          <ContextMenu
            anchorEl={document.createElement('div')}
            open
            PaperProps={{
              'data-testid': 'paper',
              elevation: customElevation,
              classes: customClasses,
            }}
          />,
        );

        expect(wrapper.find(MenuPaper).props().elevation).to.equal(customElevation);
        expect(wrapper.find(MenuPaper).props().classes).to.contain(customClasses);
      });
    });

    it('should pass onClose prop to Popover', () => {
      const handleClose = spy();
      render(<ContextMenu anchorEl={document.createElement('div')} open onClose={handleClose} />);

      act(() => {
        screen.getByRole('menu').focus();
      });
      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

      expect(handleClose.callCount).to.equal(1);
    });

    it('renders its children only when open', () => {
      const { getByTestId } = render(
        <ContextMenu anchorEl={document.createElement('div')} open={false}>
          <div data-testid="children" />
        </ContextMenu>,
      );

      expect(screen.queryByTestId('children')).to.equal(null);

      act(() => {
        getByTestId('menu-button').click();
      });

      expect(screen.getByTestId('children')).not.to.equal(null);
    });

    describe('list node', () => {
      it('should render a menu inside the Popover', () => {
        render(<ContextMenu anchorEl={document.createElement('div')} open data-testid="popover" />);

        expect(screen.getByTestId('popover').querySelector('[role="menu"]')).not.to.equal(null);
      });
    });

    it('should open during the initial mount', () => {
      function MenuItem(props: { children?: React.ReactNode }) {
        const { children } = props;
        return (
          <div role="menuitem" tabIndex={-1}>
            {children}
          </div>
        );
      }
      render(
        <ContextMenu anchorEl={document.createElement('div')} open>
          <MenuItem>one</MenuItem>
        </ContextMenu>,
      );

      expect(screen.getByRole('menuitem')).to.not.equal(null);
    });

    it('should not focus list if autoFocus=false', () => {
      render(
        <ContextMenu anchorEl={document.createElement('div')} autoFocus={false} open>
          <div tabIndex={-1} />
        </ContextMenu>,
      );

      expect(screen.getByRole('menu')).not.toHaveFocus();
    });

    it('should call TransitionProps.onEntering', () => {
      const onEnteringSpy = spy();
      render(
        <ContextMenu
          anchorEl={document.createElement('div')}
          open
          TransitionProps={{ onEntering: onEnteringSpy }}
        />,
      );

      expect(onEnteringSpy.callCount).to.equal(1);
    });

    it('should call TransitionProps.onEntering, disableAutoFocusItem', () => {
      const onEnteringSpy = spy();
      render(
        <ContextMenu
          anchorEl={document.createElement('div')}
          disableAutoFocusItem
          open
          TransitionProps={{ onEntering: onEnteringSpy }}
        />,
      );

      expect(onEnteringSpy.callCount).to.equal(1);
    });

    it('should call onClose on tab', () => {
      function MenuItem(props: { autoFocus?: boolean; children?: React.ReactNode }) {
        const { autoFocus, children } = props;

        const ref = React.useRef<HTMLDivElement | null>(null);
        React.useEffect(() => {
          if (autoFocus) {
            ref?.current?.focus();
          }
        }, [autoFocus]);

        return (
          <div ref={ref} role="menuitem" tabIndex={-1}>
            {children}
          </div>
        );
      }
      const onCloseSpy = spy();
      render(
        <ContextMenu anchorEl={document.createElement('div')} open onClose={onCloseSpy}>
          <MenuItem>hello</MenuItem>
        </ContextMenu>,
      );

      act(() => {
        screen.getByRole('menuitem').focus();
      });
      fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Tab' });

      expect(onCloseSpy.callCount).to.equal(1);
      expect(onCloseSpy.args[0][1]).to.equal('tabKeyDown');
    });

    it('ignores invalid children', () => {
      render(
        <ContextMenu anchorEl={document.createElement('div')} open>
          {null}
          <span role="menuitem">hello</span>
          {/* testing conditional rendering */}
          {false && <span role="menuitem">hello</span>}
          {undefined}
          foo
        </ContextMenu>,
      );

      expect(screen.getAllByRole('menuitem')).to.have.length(1);
    });

    describe('theme customization', () => {
      it('should override Menu Paper styles following correct precedence', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }

        const menuPaperOverrides = { borderRadius: 4 };
        const popoverPaperOverrides = { borderRadius: 8, height: 100 };
        const rootPaperOverrides = { borderRadius: 16, height: 200, width: 200 };

        const theme = extendTheme({
          components: {
            MuiMenu: { styleOverrides: { paper: menuPaperOverrides } },
            MuiPopover: { styleOverrides: { paper: popoverPaperOverrides } },
            MuiPaper: { styleOverrides: { root: rootPaperOverrides } },
          },
        });

        render(
          <CssVarsProvider theme={theme}>
            <ContextMenu
              anchorEl={document.createElement('div')}
              open
              PaperProps={{
                'data-testid': 'paper',
              }}
            />
          </CssVarsProvider>,
        );

        const paper = screen.getByTestId('paper');
        expect(paper).toHaveComputedStyle({
          borderTopLeftRadius: `${menuPaperOverrides.borderRadius}px`,
          borderBottomLeftRadius: `${menuPaperOverrides.borderRadius}px`,
          borderTopRightRadius: `${menuPaperOverrides.borderRadius}px`,
          borderBottomRightRadius: `${menuPaperOverrides.borderRadius}px`,
          height: `${popoverPaperOverrides.height}px`,
          width: `${rootPaperOverrides.width}px`,
        });
      });

      it('should override Menu Paper styles using styles in MuiPaper slot', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }

        const theme = extendTheme({
          components: {
            MuiPaper: { styleOverrides: { rounded: { borderRadius: 90 } } },
          },
        });

        render(
          <CssVarsProvider theme={theme}>
            <ContextMenu
              anchorEl={document.createElement('div')}
              open
              PaperProps={{
                'data-testid': 'paper',
              }}
            />
          </CssVarsProvider>,
        );

        const paper = screen.getByTestId('paper');
        expect(paper).toHaveComputedStyle({
          borderTopLeftRadius: '90px',
          borderBottomLeftRadius: '90px',
          borderTopRightRadius: '90px',
          borderBottomRightRadius: '90px',
        });
      });
    });

    describe('paper', () => {
      it('should use MenuPaper component', () => {
        const wrapper = mount(
          <ContextMenu anchorEl={document.createElement('div')} open>
            <div />
          </ContextMenu>,
        );

        expect(wrapper.find(MenuPaper)).to.have.length(1);
      });
    });

    describe('slots', () => {
      it('should merge slots with existing values', () => {
        const wrapper = mount(
          <ContextMenu slots={{ root: 'span' }} anchorEl={document.createElement('div')}>
            <div />
          </ContextMenu>,
        );

        expect(wrapper.find(MenuPaper)).to.have.length(1);
      });
    });
  });
});
