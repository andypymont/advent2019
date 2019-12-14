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

function ore_needed(reactions, fuel=1) {
  let elements = new Map([['FUEL', -fuel]])
  let needs = ['FUEL']
  while ( needs.length > 0 ) {
    elements = resolve_need(needs[0], elements, reactions)
    needs = Array.from(elements.keys())
                 .filter(e => e !== 'ORE' && elements.get(e) < 0)
  }
  return -elements.get('ORE')
}

function binary_search(f, target, lower, upper) {
  while (lower <= upper) {
    const mid = Math.floor((lower + upper)/2)
    const attempt = f(mid)
    if ( attempt < target ) {
      lower = mid + 1
    } else if ( attempt > target ) {
      upper = mid - 1
    } else {
      return mid
    }
  }
  return upper
}

function exponential_search(f, target) {
  let bound = 1
  while ( f(bound) < target ) {
    bound *= 2
  }
  return binary_search(f, target, bound/2, bound+1)
}

function fuel_from_trillion_ore(reactions) {
  return exponential_search(
    fuel => ore_needed(reactions, fuel),
    1000000000000
  )
}
