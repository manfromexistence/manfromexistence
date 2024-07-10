import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import setRef from './setRef';

describe('setRef', () => {
  it('can handle callback refs', () => {
    const ref = spy();
    const instance = 'proxy';

    setRef(ref, instance);

    expect(ref.called).to.equal(true);
    expect(ref.firstCall.args[0]).to.equal(instance);
  });

  it('can handle ref objects', () => {
    const ref = React.createRef();
    const instance = 'proxy';

    setRef(ref, instance);

    expect(ref.current).to.equal(instance);
  });

  it('ignores falsy refs without errors', () => {
    const instance = 'proxy';

    // all no-ops
    setRef(undefined, instance);
    setRef(null, instance);
  });

  it('throws on legacy string refs', () => {
    // @ts-ignore
    expect(() => setRef('stringRef1', 'proxy')).to.throw();
  });
});
