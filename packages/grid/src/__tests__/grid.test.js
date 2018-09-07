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
