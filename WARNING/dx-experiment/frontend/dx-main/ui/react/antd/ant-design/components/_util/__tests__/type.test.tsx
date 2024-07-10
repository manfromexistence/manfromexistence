import * as React from 'react';

import type { GetProp, GetProps, GetRef } from '../type';

describe('type', () => {
  class CC extends React.Component<{ bamboo?: number }> {
    getBamboo() {
      return this.props.bamboo;
    }

    render() {
      return this.props.bamboo;
    }
  }

  interface TestRef {
    nativeElement: HTMLDivElement;
  }

  const RefFC = React.forwardRef<TestRef, { bamboo?: number }>((props, ref) => {
    const eleRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      nativeElement: eleRef.current!,
    }));

    return <div ref={eleRef}>{props.bamboo}</div>;
  });

  describe('GetProps', () => {
    it('FC', () => {
      const FC = (props: { bamboo: number }) => props.bamboo;
      type Props = GetProps<typeof FC>;
      const props: Props = { bamboo: 123 };

      expect(props).toBeTruthy();
    });

    it('CC', () => {
      type Props = GetProps<typeof CC>;
      const props: Props = { bamboo: 123 };

      expect(props).toBeTruthy();
    });

    it('RefFc', () => {
      type Props = GetProps<typeof RefFC>;
      const props: Props = { bamboo: 123 };

      expect(props).toBeTruthy();
    });
  });

  describe('GetRef', () => {
    it('CC', () => {
      type Ref = GetRef<CC>;
      const ref = React.createRef<Ref>();

      expect(<CC ref={ref} />).toBeTruthy();
    });

    it('RefFC', () => {
      type Ref = GetRef<typeof RefFC>;
      const ref = React.createRef<Ref>();

      expect(<RefFC ref={ref} />).toBeTruthy();
    });
  });

  describe('GetProp', () => {
    it('optional', () => {
      const Optional = (props: { list?: { bamboo: string }[] }) => props.list?.length;
      type ListItemType = GetProp<typeof Optional, 'list'>[number];

      const item: ListItemType = { bamboo: '123' };
      expect(item).toBeTruthy();
    });

    it('interface directly', () => {
      interface Props {
        bamboo: number;
      }

      type BambooType = GetProp<Props, 'bamboo'>;
      const bamboo: BambooType = 123;
      expect(bamboo).toBeTruthy();
    });
  });
});
