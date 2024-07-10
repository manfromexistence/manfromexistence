import {
  ConnectButton,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
// import { span } from './span/span';
// import { div } from './div/div';
import { chains } from './Provider';
// import { span } from './span/span';
// import { vars } from '../css/vars.css';
import NextLink from 'next/link';
import React from 'react';
// import { header, logo, row } from './Header.css';

const RAINBOWKIT_VERSION = "2.0.1";

export function Header({
  darkMode,
  docsMobileMenuRef,
  sticky,
  ...props
}: {
  darkMode?: boolean;
  docsMobileMenuRef?: React.RefObject<HTMLDivElement>;
  sticky?: boolean;
}) {
  return (
    <div className="hi" {...props}>
      <div className="row">
        {/* <NextLink href="/">
          <div
            as="img"
            className={logo}
            marginRight="4"
            src="/rainbow.svg"
            transform={{
              active: 'shrink',
              hover: 'grow',
            }}
            transitionDuration="100"
            transitionProperty="transform"
            transitionTimingFunction="ease"
          />
        </NextLink> */}

        <div>
          <span style={{ lineHeight: 1 }}>
            RainbowKit
          </span>
          <span>{RAINBOWKIT_VERSION}</span>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <RainbowKitProvider
            chains={chains}
            theme={
              darkMode
                ? darkTheme({ accentColor: "red" })
                : lightTheme({ accentColor: "blue" })
            }
          >
            <ConnectButton
              accountStatus={{ largeScreen: 'full', smallScreen: 'avatar' }}
            />
          </RainbowKitProvider>{' '}
        </div>
      </div>
      {/* {docsMobileMenuRef && (
        <div
          borderBottomWidth="1"
          borderColor="separator"
          display={{ lg: 'none' }}
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          paddingX={{ xs: '6', sm: '6', md: '10', lg: '10' }}
          paddingY="4"
          ref={docsMobileMenuRef}
        />
      )} */}
    </div>
  );
}
