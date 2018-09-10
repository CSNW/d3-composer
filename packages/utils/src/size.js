import { local } from 'd3-selection';

const zero_margin = [0, 0, 0, 0];

export const Size = local();

export function toMargin(margin) {
  if (!margin) {
    return zero_margin;
  } else if (typeof margin === 'number') {
    return [margin, margin, margin, margin];
  } else if (!Array.isArray(margin)) {
    return [
      margin.top || 0,
      margin.right || 0,
      margin.bottom || 0,
      margin.left || 0
    ];
  } else {
    return margin;
  }
}
