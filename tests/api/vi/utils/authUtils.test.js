const authUtils = require('../../../../src/api/v1/utils/authUtils');

/* eslint-disable no-undef */

test('test empty auth header', () => {
  expect(Object.keys(authUtils.getUser(null)).length).toBe(0);
});
