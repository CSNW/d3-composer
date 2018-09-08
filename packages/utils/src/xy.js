import { toSeries } from './series';

const defaultXValue = d => d.x;
const defaultYValue = d => d.y;

export default function xy(options = {}) {
  let {
    data,
    xScale,
    yScale,
    xValue = defaultXValue,
    yValue = defaultYValue,
    key
  } = options;

  data = toSeries(data);
  key =
    key ||
    function(d) {
      d && d.key != null ? d.key : xValue.apply(this, arguments);
    };

  return {
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    key,

    x(d, i, j) {
      const value = xValue.call(this, d, i, j);
      return xScale(value);
    },
    y(d, i, j) {
      const value = yValue.call(this, d, i, j);
      return yScale(value);
    }
  };
}
