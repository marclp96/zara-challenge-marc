import '@testing-library/jest-dom';

if (typeof MutationObserver === 'undefined') {
  global.MutationObserver = class {
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}
