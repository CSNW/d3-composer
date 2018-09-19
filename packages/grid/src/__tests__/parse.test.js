import { parseTracks, parseAreas, parseTemplate } from '../parse';

test('should parse tracks', () => {
  expect(parseTracks('1fr 1fr 1fr')).toMatchSnapshot();
  expect(parseTracks('1fr auto 20 30.5%')).toMatchSnapshot();
  expect(parseTracks(' 1  2%  3fr  auto ')).toMatchSnapshot();
});

test('should parse minmax in tracks', () => {
  expect(parseTracks(`1fr minmax(   20,1fr) 1fr`)).toMatchSnapshot();
});

test('should parse repeat in tracks', () => {
  expect(parseTracks(`1fr repeat(3, 0.5fr) 1fr`)).toMatchSnapshot();
});

test('should parse repeat and minmax in tracks', () => {
  expect(parseTracks(`repeat(4, minmax(20,1fr)    )`)).toMatchSnapshot();
});

test('should parse areas', () => {
  expect(
    parseAreas(`
      " a a a "
      " b c d "
      " b . e "
    `)
  ).toMatchSnapshot();
  expect(parseAreas('"a a a""b c d"  "b . e"')).toMatchSnapshot();
});

test('should parse template', () => {
  expect(
    parseTemplate(`
      " a a a " 50
      " b c d"auto
      " b . e " 50/50 auto 50
    `)
  ).toMatchSnapshot();

  expect(parseTemplate('50 auto 50/25 1fr 25%')).toMatchSnapshot();
});
