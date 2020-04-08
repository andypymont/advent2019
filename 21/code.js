function run_springbot(program, instructions) {
  const input = (instructions||[]).flatMap(function(line) {
    return line.split('').map(c => c.charCodeAt(c)).concat(10)
  })
  const output = run_program(program, input).output

  const final = output[output.length-1]
  return ( final > 255 ) ? final : output.map(function(char) {
    return String.fromCharCode(char)
  }).join('')
}

// NOT C J
// AND D J
// NOT A T
// OR T J
// WALK
