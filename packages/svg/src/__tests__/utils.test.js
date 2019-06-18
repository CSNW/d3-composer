import body from '../__helpers__/body';
import { measure } from '../utils';
import { Size } from '@d3-composer/utils';

const fixture = body();
beforeAll(fixture.setup);
afterAll(fixture.teardown);

describe('utils', () => {
  describe('measure', () => {
    it('should measure svg', () => {
      const svg = fixture.append('svg').attr('viewBox', '0 0 400 300');
      expect(measure(svg)).toEqual({ width: 400, height: 300 });
    });

    it('should use Size property', () => {
      const g = fixture.layer().property(Size, { width: 200, height: 100 });
      expect(measure(g)).toEqual({ width: 200, height: 100 });
    });
  });
});
