import solve from '../solve';

test('should solve', () => {
  expect(
    solve(
      [
        { value: 20, units: 'scalar' },
        { value: 0.2, units: 'percentage' },
        { value: 1, units: 'fr' },
        { value: 2, units: 'fr' }
      ],
      160,
      20,
      20
    )
  ).toMatchSnapshot();
});
