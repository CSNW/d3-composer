export const symbolLine = {
  draw(context, size) {
    const w = Math.sqrt(size) * 2;
    const h = size / w;
    const x = -w / 2;
    const y = -h / 2;

    context.rect(x, y, w, h);
  }
};
