function read_layers(image, width, height) {
  const size = width*height
  const pixels = image.split('').map(x => parseInt(x))
  const layers = pixels.length/size

  return Array(layers).fill(0)
                      .map((_, px) => pixels.slice(px*size, (px+1)*size))
}

function pixel_counts(layer) {
  return new Map(layer.map(function(pixel, ix, layer) {
    return [
      pixel,
      layer.filter(p => p === pixel).length
    ]
  }))
}

function checksum(image, width, height) {
  const check = pc => [pc.get(0)||0, (pc.get(1)||0) * (pc.get(2)||0)]
  const layers = read_layers(image, width, height)
  const checksums = new Map(layers.map(pixel_counts).map(check))
  const min = Array.from(checksums.keys()).reduce((a, b) => Math.min(a, b))
  return checksums.get(min)
}

function flatten_image(image, width, height) {
  const layers = read_layers(image, width, height)
  const output = layers.reduce(function(atop, below) {
    return atop.map(function(atop_pixel, ix) {
      const below_pixel = below[ix]
      return atop_pixel === 2 ? below_pixel : atop_pixel
    })
  })
  return output
}

function render_image(image, width, height) {
  image = flatten_image(image, width, height)
  render_pixel = px => px === 0 ? ' ' : '#'
  return Array(height).fill()
                      .map((_, y) => y*width)
                      .map(px => image.slice(px, px+width)
                                      .map(render_pixel)
                                      .join(''))
                      .join('\n')
}
