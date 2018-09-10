import {
  axisTop as d3_axisTop,
  axisRight as d3_axisRight,
  axisBottom as d3_axisBottom,
  axisLeft as d3_axisLeft
} from 'd3-axis';
import { toStyle } from '@d3-composer/utils';
import layer from './layer';
import { size } from './utils';

export function axisTop(selection, props) {
  const {
    scale,
    xScale,
    style,
    domainStyle,
    tickStyle,
    textStyle,
    class: className,
    transition
  } = props;
  const axis = prepare(d3_axisTop(scale || xScale), props);
  const { height } = size(selection);

  layer(selection, 'axis-transform')
    .attr('transform', `translate(0, ${height || 0})`)
    .call(styleAxis, style, domainStyle, tickStyle, textStyle)
    .attr('class', className)
    .transition(transition)
    .call(axis);

  return selection;
}

export function axisRight(selection, props) {
  const {
    scale,
    yScale,
    style,
    domainStyle,
    tickStyle,
    textStyle,
    class: className,
    transition
  } = props;
  const axis = prepare(d3_axisRight(scale || yScale), props);

  selection
    .call(styleAxis, style, domainStyle, tickStyle, textStyle)
    .attr('class', className)
    .transition(transition)
    .call(axis);

  return selection;
}

export function axisBottom(selection, props) {
  const {
    scale,
    xScale,
    style,
    domainStyle,
    tickStyle,
    textStyle,
    class: className,
    transition
  } = props;
  const axis = prepare(d3_axisBottom(scale || xScale), props);

  selection
    .call(styleAxis, style, domainStyle, tickStyle, textStyle)
    .attr('class', className)
    .transition(transition)
    .call(axis);

  return selection;
}

export function axisLeft(selection, props) {
  const {
    scale,
    yScale,
    style,
    domainStyle,
    tickStyle,
    textStyle,
    class: className,
    transition
  } = props;
  const axis = prepare(d3_axisLeft(scale || yScale), props);
  const { width } = size(selection);

  layer(selection, 'axis-transform')
    .attr('transform', `translate(${width || 0}, 0)`)
    .call(styleAxis, style, domainStyle, tickStyle, textStyle)
    .attr('class', className)
    .transition(transition)
    .call(axis);

  return selection;
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

  return function(selection) {
    axis.call(this, selection);

    // Reset hard-coded text values
    selection.attr('font-size', null).attr('font-family', null);
  };
}

function styleAxis(selection, style, domainStyle, tickStyle, textStyle) {
  selection.attr('style', toStyle(style));
  selection.select('.domain').attr('style', toStyle(domainStyle));
  selection.select('.tick line').attr('style', toStyle(tickStyle));
  selection.select('.tick text').attr('style', toStyle(textStyle));
}
