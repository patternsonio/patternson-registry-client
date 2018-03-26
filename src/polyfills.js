import runtime from 'babel-runtime/regenerator';
import 'isomorphic-fetch';

global.regeneratorRuntime = global.regeneratorRuntime || runtime;
global.window = global.window || {
  setTimeout,
  clearTimeout,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener() {},
  navigator: { onLine: true },
};
