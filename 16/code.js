const base_pattern = [0, 1, 0, -1]
function pattern(e) {
  e += 1 // from base 0 to base 1
  return Array(base_pattern.length * e).fill()
                                       .map(function(_, x) {
                                         return base_pattern[Math.floor(x/e)]
                                       })
}

function phase(signal) {
  return signal.map(function(_, e) {
    const p = pattern(e)
    return Math.abs(signal.map((dig, d) => dig * p[(d+1) % p.length])
                          .reduce((a, b) => a + b)) % 10
  })
}

function ftf(input, phases) {
  let signal = input.split('').map(x => parseInt(x))
  for ( let p = 0; p < phases; p++ ) {
    signal = phase(signal)
  }
  return signal.slice(0, 8).join('')
}
