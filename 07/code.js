function run_amplifier(program, phase, signal) {
  return run_program(program, [phase, signal]).output.shift()
}

function thruster_signal(program, phasesettings, looping=false) {
  let amplifiers = phasesettings.map(function(phase) {
    return {
      ip: program.ip,
      memory: program.memory,
      input: program.input.concat(phase),
      output: program.output,
      status: 'ready',
    }
  })

  let signal = 0

  while ( amplifiers.filter(a => a.status !== 'finished').length > 0) {
    amplifiers = amplifiers.map(function(amplifier) {
      amplifier = run_program(amplifier, [signal], looping)
      signal = amplifier.output.shift()||signal
      return amplifier
    })
  }

  return signal
}

function setting_options(amplifiers) {
  const amplifiercount = amplifiers.length

  function combo(undef, ix) {
    return ix.toString(amplifiercount)
             .padStart(amplifiercount, '0')
             .split('')
             .map(x => parseInt(x, 10))
  }

  function once_only(seq) {
    return seq.map(item => seq.filter(ea => ea === item).length)
              .reduce((a, b) => Math.max(a, b)) === 1
  }

  const lookup_amps = amps => amps.map(a => amplifiers[a])

  return Array(amplifiercount**amplifiercount).fill()
                                              .map(combo)
                                              .filter(once_only)
                                              .map(lookup_amps)
}

function max_thruster_signal(program, phases, looping=false) {
  if ( phases == undefined ) {
    phases = [0, 1, 2, 3, 4]
  }
  const thrust = ps => thruster_signal(program, ps, looping)
  return setting_options(phases).map(thrust)
                                .reduce((a, b) => Math.max(a, b))
}
