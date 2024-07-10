import 'jasmine';

import {QuantizerCelebi} from './quantizer_celebi';

const RED = 0xffff0000;
const GREEN = 0xff00ff00;
const BLUE = 0xff0000ff;

describe('QuantizerCelebi', () => {
  it('1R', () => {
    const answer = QuantizerCelebi.quantize([RED], 128);
    expect(answer.size).toBe(1);
    expect(answer.get(RED)).toBe(1);
  });

  it('1G', () => {
    const answer = QuantizerCelebi.quantize([GREEN], 128);
    expect(answer.size).toBe(1);
    expect(answer.get(GREEN)).toBe(1);
  });

  it('1B', () => {
    const answer = QuantizerCelebi.quantize([BLUE], 128);
    expect(answer.size).toBe(1);
    expect(answer.get(BLUE)).toBe(1);
  });

  it('5B', () => {
    const answer =
        QuantizerCelebi.quantize([BLUE, BLUE, BLUE, BLUE, BLUE], 128);
    expect(answer.size).toBe(1);
    expect(answer.get(BLUE)).toBe(5);
  });

  it('2R 3G', () => {
    const answer =
        QuantizerCelebi.quantize([RED, RED, GREEN, GREEN, GREEN], 128);
    expect(answer.size).toBe(2);
    expect(answer.get(RED)).toBe(2);
    expect(answer.get(GREEN)).toBe(3);
  });

  it('1R 1G 1B', () => {
    const answer = QuantizerCelebi.quantize([RED, GREEN, BLUE], 128);
    expect(answer.size).toBe(3);
    expect(answer.get(RED)).toBe(1);
    expect(answer.get(GREEN)).toBe(1);
    expect(answer.get(BLUE)).toBe(1);
  });
});
