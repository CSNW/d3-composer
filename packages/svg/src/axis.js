import {
  axisTop as d3_axisTop,
  axisRight as d3_axisRight,
  axisBottom as d3_axisBottom,
  axisLeft as d3_axisLeft
} from 'd3-axis';
import { Area } from '@d3-composer/utils';
import layer from './layer';

export function axisTop(selection, props) {
  const { scale, xScale } = props;
  const axis = prepare(d3_axisTop(scale || xScale), props);
  const area = Area.get(selection.node());

  layer(selection, 'axis-transform')
    .attr('transform', `translate(0, ${area.height})`)
    .call(axis);
}

export function axisRight(selection, props) {
  const { scale, yScale } = props;
  const axis = prepare(d3_axisRight(scale || yScale), props);

  selection.call(axis);
}

export function axisBottom(selection, props) {
  const { scale, xScale } = props;
  const axis = prepare(d3_axisBottom(scale || xScale), props);

  selection.call(axis);
}

export function axisLeft(selection, props) {
  const { scale, yScale } = props;
  const axis = prepare(d3_axisLeft(scale || yScale), props);
  const area = Area.get(selection.node());

  layer(selection, 'axis-transform')
    .attr('transform', `translate(${area.width}, 0)`)
    .call(axis);
}

function prepare(axis, props) {
  const {
    ticks,
    tickArguments,
    tickValues,
    tickFormat,
    tickSize,
    tickSizeInner,
    tickSizeOuter,
    tickPadding
  } = props;

  if (ticks) axis.ticks(ticks);
  if (tickArguments) axis.tickArguments(tickArguments);
  if (tickValues) axis.tickValues(tickValues);
  if (tickFormat) axis.tickFormat(tickFormat);
  if (tickSize) axis.tickSize(tickSize);
  if (tickSizeInner) axis.tickSizeInner(tickSizeInner);
  if (tickSizeOuter) axis.tickSizeOuter(tickSizeOuter);
  if (tickPadding) axis.tickPadding(tickPadding);

  return axis;
}
