import { toMargin } from '@d3-composer/utils';

export default function applyMargin(area, margin) {
  margin = toMargin(margin);

  let { top, right, bottom, left } = area;
  top += margin[0];
  right -= margin[1];
  bottom -= margin[2];
  left += margin[3];

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    top,
    right,
    bottom,
    left
  };
}
