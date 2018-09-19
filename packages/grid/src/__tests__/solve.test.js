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

test('should solve minmax', () => {
  expect(
    solve(
      [
        { value: 50, units: 'scalar' },
        [{ value: 50, units: 'scalar' }, { value: 2, units: 'fr' }],
        { value: 50, units: 'scalar' },
        { value: 1, units: 'fr' }
      ],
      250
    )
  ).toMatchSnapshot();
});

test('should solve minmax, constrained', () => {
  expect(
    solve(
      [
        { value: 100, units: 'scalar' },
        [{ value: 50, units: 'scalar' }, { value: 200, units: 'scalar' }],
        [{ value: 50, units: 'scalar' }, { value: 100, units: 'scalar' }],
        { value: 1, units: 'fr' }
      ],
      250
    )
  ).toMatchSnapshot();
});

test('should solve minmax, inflexible', () => {
  expect(
    solve(
      [
        { value: 100, units: 'scalar' },
        [{ value: 50, units: 'scalar' }, { value: 1, units: 'fr' }],
        [{ value: 50, units: 'scalar' }, { value: 75, units: 'scalar' }],
        { value: 1, units: 'fr' }
      ],
      250
    )
  ).toMatchSnapshot();
});
