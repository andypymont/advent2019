function track_card(card, decksize, instructions) {
  let position = card
  instructions.forEach(function(instruction) {
    const words = instruction.split(' ')
    if ( words[0] === 'cut' ) {
      position = (decksize + position - parseInt(words[1])) % decksize
    } else if ( words[2] === 'increment' ) {
      position = (parseInt(words[3]) * position) % decksize
    } else if ( words[3] === 'stack' ) {
      position = decksize - position - 1
    }
  })
  return position
}

function gcd_extended(a, b) {
  let x = 0, y = 1, u = 1, v = 0
  while ( a !== 0 ) {
    let q = Math.floor(b / a)
    [x, y, u, v] = [u, v, x - u * q, y - v * q]
    [a, b] = [b % a, a]
  }
  return [b, x, y]
}

function modinv(a, m) {
  const [g, x] = gcd_extended(a, m)
  if (g !== 1) {
    throw('Bad mod inverse')
  }
  return (x + m) % m
}

function card_in_position(position, decksize, instructions) {
  let card = position
  instructions.reverse().forEach(function(instruction) {
    const words = instruction.split(' ')
    if ( words[0] === 'cut' ) {
      card = (position + parseInt(words[1])) % decksize
    } else if ( words[2] === 'increment' ) {
      card = modinv(position, decksize) / parseInt(words[3])
    } else if ( words[3] === 'stack' ) {
      card = decksize - card - 1
    }
  })
  return card
}
