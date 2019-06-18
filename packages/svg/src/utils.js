import { Size } from '@d3-composer/utils';

const size_id = Size.toString();

/**
 * Determine node size for given selection
 *
 * 1. Check viewBox (if svg)
 * 2. Check attributes (if svg)
 * 3. Check Size local
 * 4. Check bbox
 *
 * @param {d3.selection} selection
 */
export function measure(selection) {
  const node = selection.node();

  if (node.tagName === 'svg') {
    const viewBox = node.getAttribute('viewBox');
    if (viewBox) {
      const [_1, _2, width, height] = viewBox.split(' ');
      return { width: Number(width), height: Number(height) };
    }

    const width = node.getAttribute('width');
    const height = node.getAttribute('height');

    if (width != null && height != null) {
      return { width: Number(width), height: Number(height) };
    }
  }

  if (size_id in node) {
    return node[size_id];
  }

  try {
    let bbox;
    if (typeof node.getBBox === "function") {
      bbox = node.getBBox();
    } else {
      bbox = node.getBoundingClientRect();
    }
    return { width: bbox.width, height: bbox.height };
  } catch (err) {
    return { width: NaN, height: NaN };
  }
}

export function childNodes() {
  return this.childNodes;
}

export function interpolatePath(selection, path, interpolate) {
  if (interpolate) {
    selection.attrTween('d', function(d, i, j) {
      const next = typeof path === 'function' ? path.call(this, d, i, j) : path;
      const previous = this.getAttribute('d');

      return interpolate(previous, next);
    });
  } else {
    selection.attr('d', path);
  }
}

export function translateXY(_x, _y) {
  return function(d, i, j) {
    const x = _x.call(this, d, i, j);
    const y = _y.call(this, d, i, j);

    return `translate(${x}, ${y})`;
  };
}

export const assign =
  Object.assign ||
  function(target, ...objects) {
    objects.forEach(object => {
      Object.keys(object).forEach(key => {
        target[key] = object[key];
      });
    });

    return target;
  };

export function byIndex(_d, i) {
  return i;
}
