function phase_digit(current, element, signal) {
  const pattern = element+1
  const patternlength = pattern*4

  return Math.abs(signal.map(function(digit, d) {
    const patternpos = (1 + d) % patternlength
    const patternpartpos = Math.floor(patternpos/pattern)

    if ( patternpartpos === 1 ) {
      return digit
    } else if ( patternpartpos === 3 ) {
      return -digit
    } else {
      return 0
    }
  }).reduce((a, b) => a + b)) % 10
}

function phase(signal) {
  return signal.map(phase_digit)
}

function phase_shortcut(signal) {
  const output = signal.slice(0)
  let sum = 0

  for ( let x = (output.length -1); x >= (output.length/2); x-- ) {
    sum += signal[x]
    output[x] = sum % 10
  }

  return output
}

function fft(input, phases) {
  let signal = input.split('').map(x => parseInt(x))
  for ( let p = 0; p < phases; p++ ) {
    signal = phase(signal)
  }
  return signal.slice(0, 8).join('')
}

function fft_real(input) {
  const offset = parseInt(input.slice(0, 7))
  const initial = input.split('').map(x => parseInt(x))
  let signal = Array(10000).fill().flatMap(() => initial)
  for ( let p = 0; p < 100; p++ ) {
    signal = phase_shortcut(signal)
  }
  return signal.slice(offset, offset+8).join('')
}
