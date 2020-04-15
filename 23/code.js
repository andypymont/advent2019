function run_intcode_network(program) {
  const computers = new Map(
    Array(50).fill(0).map(function(blank, i) {
      return [i, { ...program, input: [i] }]
    })
  )
  const addresses = Array.from(computers.keys())
  const packets = []
  const nat = {}
  const rv = {}
  let idle = 0

  function send_packet(address, x, y) {
    if ( address === 255 ) {
      rv.first = rv.first||y
      nat.x = x
      nat.y = y
    } else {
      const target = computers.get(address)
      target.input.push(x)
      target.input.push(y)
    }
  }

  while ( !rv.repeated ) {
    addresses.forEach(function(address) {
      const computer =  op(computers.get(address))
      while ( computer.output.length >= 3 ) {
        idle = 0
        const target = computer.output.shift()
        const x = computer.output.shift()
        const y = computer.output.shift()
        send_packet(target, x, y)
      }
      computers.set(address, computer)
    })
    const pending_inputs = !addresses.every(function(address) {
      return (computers.get(address).input.length === 0)
    })
    idle = (pending_inputs ? 0 : idle)
    if ( idle > 1000 && nat.x ) {
      rv.repeated = ( nat.y === nat.prev ) ? nat.y : rv.repeated
      nat.prev = nat.y
      send_packet(0, nat.x, nat.y)
    } else {
      idle += 1
    }
  }

  return rv
}
