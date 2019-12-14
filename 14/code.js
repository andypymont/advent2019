function read_reactions(lines) {
  return new Map(
    lines.map(function(line) {
      const [ing, out] = line.split(' => ')
      const parts = out.split(' ')
      const qty = parseInt(parts[0])
      const inp = ing.split(', ')
                     .map(function(i) {
                       const iparts = i.split(' ')
                       const iqty = parseInt(iparts[0])
                       return [iparts[1], iqty]
                     })
       return [parts[1], [qty, inp]]
    })
  )
}

function resolve_need(element, elements, reactions) {
  const reacted = new Map(elements)
  const need = -elements.get(element)

  function add(e, q) {
    reacted.set(e, (reacted.get(e)||0)+q)
  }

  if ( need > 0 && reactions.has(element) ) {
    const [qty, prerequisites] = reactions.get(element)
    const repetitions = Math.ceil(need/qty)
    add(element, repetitions*qty)
    prerequisites.forEach(([prereq, q]) => add(prereq, -q*repetitions))
  }

  return reacted
}

function ore_needed(reactions) {
  let elements = new Map([['FUEL', -1]])
  let needs = ['FUEL']
  let reps = 0
  while ( needs.length > 0 ) {
    reps++
    if ( reps > 1000 ) { return -1 }
    console.log(needs[0], needs.length)
    elements = resolve_need(needs[0], elements, reactions)
    needs = Array.from(elements.keys())
                 .filter(e => e !== 'ORE' && elements.get(e) < 0)
  }
  return -elements.get('ORE')
}
