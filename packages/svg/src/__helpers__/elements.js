const default_size = { width: 100, height: 100 };

export class SVGElement {
  constructor(options = {}) {
    const { size = default_size } = options;

    this.size = size;
  }

  getBBox() {
    return this.size;
  }
}
