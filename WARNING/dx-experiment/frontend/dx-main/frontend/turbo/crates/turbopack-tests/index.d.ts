import * as expectMod from "expect";
import * as jest from "jest-circus";

export {};

declare global {
  var describe: typeof jest.describe;
  var expect: typeof expectMod.expect;
  var it: typeof jest.it;
  var test: typeof jest.test;
  var nsObj: (obj: Object) => Object;
}
