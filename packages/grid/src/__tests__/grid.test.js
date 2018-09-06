import template from '../grid';

test('should create grid from spec and size', () => {
  expect(template(``, {})).toBeUndefined();
});
