import { series, Series, toStyle } from '@d3-composer/utils';
import { area as d3_area } from 'd3-shape';
import { interpolatePath } from './utils';

const defaultX0 = d => (d && d.x0 != null ? d.x0 : d.x);
const defaultX1 = d => (d && d.x1 != null ? d.x1 : d.x);
const defaultY0 = d => (d && d.y0 != null ? d.y0 : 0);
const defaultY1 = d => (d && d.y1 != null ? d.y1 : d.y);

export default function area(selection, props) {
  let {
    data,
    xScale,
    yScale,
    x0Value = defaultX0,
    x1Value = defaultX1,
    y0Value = defaultY0,
    y1Value = defaultY1,
    style,
    class: className,
    transition,
    curve,
    interpolate,
    defined
  } = props;
  const { seriesKey } = series(props);

  function x0(d, i, j) {
    return xScale(x0Value.call(this, d, i, j));
  }
  function x1(d, i, j) {
    return xScale(x1Value.call(this, d, i, j));
  }
  function y0(d, i, j) {
    return yScale(y0Value.call(this, d, i, j));
  }
  function y1(d, i, j) {
    return yScale(y1Value.call(this, d, i, j));
  }

  defined =
    defined ||
    function(d, i, j) {
      return (
        y0Value.call(this, d, i, j) != null &&
        y1Value.call(this, d, i, j) != null
      );
    };

  const y0_area = d3_area()
    .x0(x0)
    .x1(x1)
    .y0(() => yScale(0))
    .y1(() => yScale(0))
    .defined(defined);
  const area = d3_area()
    .x0(x0)
    .x1(x1)
    .y0(y0)
    .y1(y1)
    .defined(defined);
  if (curve) area.curve(curve);

  const areas = selection.selectAll('path').data(data, seriesKey);

  areas
    .exit()
    .transition(transition)
    .call(interpolatePath, d => y0_area(d.values), interpolate);

  areas
    .enter()
    .append('path')
    .property(Series, d => d)
    .attr('d', d => y0_area(d.values))
    .merge(areas)
    .attr('style', toStyle(style, 'fill: currentColor; stroke: none;'))
    .attr('class', className)
    .transition(transition)
    .call(interpolatePath, d => area(d.values), interpolate);

  return selection;
}
