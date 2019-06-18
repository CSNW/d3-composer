import { Size } from '@d3-composer/utils';
import { measure } from '../utils';
import body from '../__helpers__/body';
import { SVGElement, HTMLElement } from '../__helpers__/elements';

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

    it('should use getBBox (if available)', () => {
      const rect = fixture.layer().append('rect');

      // As of jsdom 11, getBBox is not implemented / defined for SVGElement
      // -> Mock it via the d3's selection.node()
      rect.node = jest.fn(() => {
        return new SVGElement({ size: { width: 100, height: 50 } });
      });

      expect(measure(rect)).toEqual({ width: 100, height: 50 });
    });

    it('should use getBoundingClientRect (if available)', () => {
      // TODO
      // 1. ...append('div')
      // 2. Mock div.node with HTMLElement
      // 3. measure(div)
    });
  });
});
