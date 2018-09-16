import template from '../grid';

test('should create grid from spec and size', () => {
  const spec = `
    "title title" 50
    "y_axis chart" auto
    ". x_axis" 50
    / 50 auto
  `;

  expect(template(spec, { width: 600, height: 400 })).toMatchSnapshot();
});

test('should handle row and column spans', () => {
  const spec = `
    "a a ." 50
    "b c d" auto
    ". e d" 50
    / 50 auto 100
  `;

  expect(template(spec, { width: 600, height: 400 })).toMatchSnapshot();
});
