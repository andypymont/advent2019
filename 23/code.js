function run_intcode_network(program) {
  const computers = new Map(
    Array(50).fill(0).map(function(blank, i) {
      return [i, { ...program, input: [i] }]
    })
  )
  const addresses = Array.from(computers.keys())
  const packets = []
  let solution = { x: 0, y: 0, address: 0 }

  while ( solution.address === 0 ) {
    addresses.forEach(function(address) {
      let computer = op(computers.get(address))
      while ( computer.output.length >= 3 ) {
        const packet = {
          address: computer.output.shift(),
          x: computer.output.shift(),
          y: computer.output.shift(),
        }
        if ( packet.address === 255 ) {
          solution = packet
        } else {
          const computer = computers.get(packet.address)
          computer.input.push(packet.x)
          computer.input.push(packet.y)
        }
      }
      computers.set(address, computer)
    })
  }

  return solution
}
