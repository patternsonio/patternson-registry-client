import runtime from 'babel-runtime/regenerator';
import 'isomorphic-fetch';
import WebSocket from 'ws';

global.WebSocket = global.WebSocket || WebSocket;
global.localStorage = global.localStorage || {
  store: {},
  getItem(key) {
    return this.store[key];
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  removeItem(key) {
    delete this.store[key];
  },
};
global.regeneratorRuntime = global.regeneratorRuntime || runtime;
global.window = global.window || {
  setTimeout,
  clearTimeout,
  WebSocket: global.WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener() {},
  navigator: { onLine: true },
};
