export function isLight(color) {
  let r;
  let g;
  let b;
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    const newColor = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    /* eslint-disable */
    r = newColor[1];
    g = newColor[2];
    b = newColor[3];
    /* eslint-enable */
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    const newColor = +(`0x${color.slice(1).replace(
      color.length < 5 && /./g, '$&$&',
    )}`);

    /* eslint-disable */
    r = newColor >> 16;
    g = newColor >> 8 & 255;
    b = newColor & 255;
    /* eslint-enable */
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(
    0.299 * (r * r)
    + 0.587 * (g * g)
    + 0.114 * (b * b),
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 200) {
    return true;
  }

  return false;
}

export default { isLight };
