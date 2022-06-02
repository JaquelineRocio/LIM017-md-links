/* eslint-disable linebreak-style */
//jest.mock('node-fetch', () => jest.fn());

//jest.createMockFromModule('node-fetch');

const fetch = jest.fn((url) => new Promise((resolve) => {
  const res = { status: 200, ok: ' ok' };
  resolve(res);
}));

export default fetch;
