export function end(transition) {
  return new Promise(resolve => {
    transition.on('end', () => resolve());
  });
}
