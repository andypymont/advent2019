function stack(deck) {
  return deck.slice(0).reverse()
}

function cut(deck, cards) {
  return deck.slice(cards).concat(deck.slice(0, cards))
}

function deal(deck, increment) {
  const cards = deck.length
  const dealt = new Array(cards)

  deck.forEach(function(card, c) {
    dealt[(c*increment)%cards] = card
  })

  return dealt
}

function shuffle(instructions, decksize) {
  return instructions.reduce(
    function(deck, instruction) {
      const words = instruction.split(' ')
      if ( words[0] === 'cut' ) {
        return cut(deck, parseInt(words[1]))
      } else if ( words[2] === 'increment' ) {
        return deal(deck, parseInt(words[3]))
      } else if ( words[3] === 'stack' ) {
        return stack(deck)
      }
    },
    Array(decksize).fill().map((_, i) => i)
  )
}
