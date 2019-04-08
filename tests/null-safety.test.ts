import NullSafe from '../src/null-safety';

test('start with 0', () => {
  expect(NullSafe.start(0).result()).toBe(0);
});

test('start with null', () => {
  expect(NullSafe.start(null).result()).toBeNull();
});
