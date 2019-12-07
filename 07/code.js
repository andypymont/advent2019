function run_amplifier(program, phase, signal) {
  return run_program(program, [phase, signal]).output.shift()
}

function thruster_signal(program, phasesettings) {
  let signal = 0
  phasesettings.forEach(function(phase) {
    signal = run_amplifier(program, phase, signal)
  })
  return signal
}

function setting_options(amplifiers) {
  function combo(undef, ix) {
    return ix.toString(amplifiers)
             .padStart(amplifiers, '0')
             .split('')
             .map(x => parseInt(x, 10))
  }
  function once_only(seq) {
    return seq.map(item => seq.filter(ea => ea === item).length)
              .reduce((a, b) => Math.max(a, b)) === 1
  }

  return Array(amplifiers**amplifiers).fill()
                                      .map(combo)
                                      .filter(once_only)
}

function max_thruster_signal(program) {
  return setting_options(5).map(ps => thruster_signal(program, ps))
                           .reduce((a, b) => Math.max(a, b))
}
