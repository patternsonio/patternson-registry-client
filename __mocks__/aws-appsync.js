export default class AppSyncMock {
  constructor(...args) {
    this.$constructor = jest.fn();
    this.$constructor(...args);
    this.hydrated = jest.fn(() => Promise.resolve(this));
    this.query = jest.fn(() => Promise.resolve(this));
    this.mutate = jest.fn(() => Promise.resolve(this));
    this.subscribe = jest.fn(() => Promise.resolve(this));
  }
}
