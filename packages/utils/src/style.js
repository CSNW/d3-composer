export function toStyle(value) {
  if (typeof value === 'function') {
    return function() {
      return toStyle(value.apply(this, arguments));
    };
  }
  if (typeof value === 'string') {
    return value;
  }
  if (!value) {
    return;
  }

  return Object.keys(value)
    .map(key => `${key}: ${value[key]};`)
    .join(' ');
}
