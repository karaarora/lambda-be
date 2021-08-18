let mathUtils = require('./mathUtils');

test('adds 1 + 2 to equal 3', () => {
  expect(mathUtils.sum(1, 2)).toBe(3);
});