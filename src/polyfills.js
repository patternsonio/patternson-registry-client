import 'babel-runtime/regenerator';
import 'isomorphic-fetch';

global.window = global.window || {
  setTimeout,
  clearTimeout,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener() {},
  navigator: { onLine: true },
};
