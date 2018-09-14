import {
  axisTop as d3_axisTop,
  axisRight as d3_axisRight,
  axisBottom as d3_axisBottom,
  axisLeft as d3_axisLeft
} from 'd3-axis';
import { toStyle } from '@d3-composer/utils';
import layer from './layer';
import { size } from './utils';

export function axisTop(selection, options) {
  const {
    scale,
    xScale,
    style,
    domainStyle,
    tickStyle,
    labelStyle,
    class: className,
    transition
  } = options;
  const axis = prepare(d3_axisTop(scale || xScale), options);
  const { height } = size(selection);

  layer(selection, 'axis-transform')
    .attr('transform', `translate(0, ${height || 0})`)
    .attr('class', className)
    .transition(transition)
    .call(axis)
    .call(styleAxis, style, domainStyle, tickStyle, labelStyle);

  return selection;
}

export function axisRight(selection, options) {
  const {
    scale,
    yScale,
    style,
    domainStyle,
    tickStyle,
    labelStyle,
    class: className,
    transition
  } = options;
  const axis = prepare(d3_axisRight(scale || yScale), options);

  selection
    .attr('class', className)
    .transition(transition)
    .call(axis)
    .call(styleAxis, style, domainStyle, tickStyle, labelStyle);

  return selection;
}

export function axisBottom(selection, options) {
  const {
    scale,
    xScale,
    style,
    domainStyle,
    tickStyle,
    labelStyle,
    class: className,
    transition
  } = options;
  const axis = prepare(d3_axisBottom(scale || xScale), options);

  selection
    .attr('class', className)
    .transition(transition)
    .call(axis)
    .call(styleAxis, style, domainStyle, tickStyle, labelStyle);

  return selection;
}

export function axisLeft(selection, options) {
  const {
    scale,
    yScale,
    style,
    domainStyle,
    tickStyle,
    labelStyle,
    class: className,
    transition
  } = options;
  const axis = prepare(d3_axisLeft(scale || yScale), options);
  const { width } = size(selection);

  layer(selection, 'axis-transform')
    .attr('transform', `translate(${width || 0}, 0)`)
    .attr('class', className)
    .transition(transition)
    .call(axis)
    .call(styleAxis, style, domainStyle, tickStyle, labelStyle);

  return selection;
}

function prepare(axis, options) {
  const {
    ticks,
    tickArguments,
    tickValues,
    tickFormat,
    tickSize,
    tickSizeInner,
    tickSizeOuter,
    tickPadding
  } = options;

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

function styleAxis(selection, style, domainStyle, tickStyle, labelStyle) {
  // Get underlying selection from transition
  selection = selection.selection ? selection.selection() : selection;

  selection.attr('style', toStyle(style));
  selection.select('.domain').attr('style', toStyle(domainStyle));
  selection.selectAll('.tick line').attr('style', toStyle(tickStyle));
  selection.selectAll('.tick text').attr('style', toStyle(labelStyle));
}
