const test_maps = [
  [
    '#########',
    '#b.A.@.a#',
    '#########',
  ],
  [
    '########################',
    '#f.D.E.e.C.b.A.@.a.B.c.#',
    '######################.#',
    '#d.....................#',
    '########################',
  ],
  [
    '########################',
    '#...............b.C.D.f#',
    '#.######################',
    '#.....@.a.B.c.d.A.e.F.g#',
    '########################',
  ],
  [
    '#################',
    '#i.G..c...e..H.p#',
    '########.########',
    '#j.A..b...f..D.o#',
    '########@########',
    '#k.E..a...g..B.n#',
    '########.########',
    '#l.F..d...h..C.m#',
    '#################'
  ],
  [
    '########################',
    '#@..............ac.GI.b#',
    '###d#e#f################',
    '###A#B#C################',
    '###g#h#i################',
    '########################',
  ]
]

const test_graphs = [
  {
    '@': {
      'a': { doors: '', dist: 2 },
      'b': { doors: 'A', dist: 4 },
    },
    'a': {
      'b': { doors: 'A', dist: 6 },
    },
    'b': {
      'a': { doors: 'A', dist: 6 },
    }
  },
  {
    '@': {
      'a': { doors: '', dist: 2 },
      'b': { doors: 'A', dist: 4 },
      'c': { doors: 'B', dist: 6 },
      'd': { doors: 'B', dist: 30 },
      'e': { doors: 'AC', dist: 8 },
      'f': { doors: 'ACED', dist: 14 },
    },
    'a': {
      'b': { doors: 'A', dist: 6 },
      'c': { doors: 'B', dist: 4 },
      'd': { doors: 'B', dist: 28 },
      'e': { doors: 'AC', dist: 10 },
      'f': { doors: 'ACED', dist: 16 },
    },
    'b': {
      'a': { doors: 'A', dist: 6 },
      'c': { doors: 'AB', dist: 10 },
      'd': { doors: 'AB', dist: 34 },
      'e': { doors: 'C', dist: 4 },
      'f': { doors: 'CED', dist: 10 },
    },
    'c': {
      'a': { doors: 'B', dist: 4 },
      'b': { doors: 'BA', dist: 10 },
      'd': { doors: '', dist: 24 },
      'e': { doors: 'BAC', dist: 14 },
      'f': { doors: 'BACED', dist: 20},
    },
    'd': {
      'a': { doors: 'B', dist: 28 },
      'b': { doors: 'BA', dist: 34 },
      'c': { doors: '', dist: 24},
      'e': { doors: 'BAC', dist: 38 },
      'f': { doors: 'BACED', dist: 44 },
    },
    'e': {
      'a': { doors: 'CA', dist: 10 },
      'b': { doors: 'C', dist: 4 },
      'c': { doors: 'CAB', dist: 14 },
      'd': { doors: 'CAB', dist: 38 },
      'f': { doors: 'ED', dist: 6 },
    },
    'f': {
      'a': { doors: 'DECA', dist: 16 },
      'b': { doors: 'DEC', dist: 10 },
      'c': { doors: 'DECAB', dist: 20 },
      'd': { doors: 'DECAB', dist: 44 },
      'e': { doors: 'DE', dist: 6 },
    },
  },
  {
    '@': {
      'a': { doors: '', dist: 2 },
      'b': { doors: '', dist: 22 },
      'c': { doors: 'B', dist: 6 },
      'd': { doors: 'B', dist: 8 },
      'e': { doors: 'BA', dist: 12 },
      'f': { doors: 'CD', dist: 28 },
      'g': { doors: 'BAF', dist: 16 },
    },
    'a': {
      'b': { doors: '', dist: 24 },
      'c': { doors: 'B', dist: 4 },
      'd': { doors: 'B', dist: 6 },
      'e': { doors: 'BA', dist: 10 },
      'f': { doors: 'CD', dist: 30 },
      'g': { doors: 'BAF', dist: 14 },
    },
    'b': {
      'a': { doors: '', dist: 24 },
      'c': { doors: 'B', dist: 28 },
      'd': { doors: 'B', dist: 30 },
      'e': { doors: 'BA', dist: 34 },
      'f': { doors: 'CD', dist: 6 },
      'g': { doors: 'BAF', dist: 38 },
    },
    'c': {
      'a': { doors: 'B', dist: 4 },
      'b': { doors: 'B', dist: 28 },
      'd': { doors: '', dist: 2 },
      'e': { doors: 'A', dist: 6 },
      'f': { doors: 'BCD', dist: 34 },
      'g': { doors: 'AF', dist: 10 },
    },
    'd': {
      'a': { doors: 'B', dist: 6 },
      'b': { doors: 'B', dist: 30 },
      'c': { doors: '', dist: 2 },
      'e': { doors: 'A', dist: 4 },
      'f': { doors: 'BCD', dist: 36 },
      'g': { doors: 'AF', dist: 8 },
    },
    'e': {
      'a': { doors: 'AB', dist: 10 },
      'b': { doors: 'AB', dist: 34 },
      'c': { doors: 'A', dist: 6 },
      'd': { doors: 'A', dist: 4 },
      'f': { doors: 'ABCD', dist: 40 },
      'g': { doors: 'F', dist: 4 },
    },
    'f': {
      'a': { doors: 'DC', dist: 30 },
      'b': { doors: 'DC', dist: 6 },
      'c': { doors: 'DCB', dist: 34 },
      'd': { doors: 'DCB', dist: 36 },
      'e': { doors: 'DCBA', dist: 40 },
      'g': { doors: 'DCBAF', dist: 44 },
    },
    'g': {
      'a': { doors: 'FAB', dist: 14 },
      'b': { doors: 'FAB', dist: 38 },
      'c': { doors: 'FA', dist: 10 },
      'd': { doors: 'FA', dist: 8 },
      'e': { doors: 'F', dist: 4 },
      'f': { doors: 'FABCD', dist: 44 },
    },
  },
  {
    '@': {
      'a': { doors: '', dist: 3 },
      'b': { doors: '', dist: 3 },
      'c': { doors: '', dist: 5 },
      'd': { doors: '', dist: 5 },
      'e': { doors: '', dist: 5 },
      'f': { doors: '', dist: 3 },
      'g': { doors: '', dist: 3 },
      'h': { doors: '', dist: 5 },
      'i': { doors: 'G', dist: 10 },
      'j': { doors: 'A', dist: 8 },
      'k': { doors: 'E', dist: 8 },
      'l': { doors: 'F', dist: 10 },
      'm': { doors: 'C', dist: 10 },
      'n': { doors: 'B', dist: 8 },
      'o': { doors: 'D', dist: 8 },
      'p': { doors: 'H', dist: 10 },
    },
    'a': {
      'b': { doors: '', dist: 6 },
      'c': { doors: '', dist: 8 },
      'd': { doors: '', dist: 6 },
      'e': { doors: '', dist: 8 },
      'f': { doors: '', dist: 6 },
      'g': { doors: '', dist: 4 },
      'h': { doors: '', dist: 6 },
      'i': { doors: 'G', dist: 13 },
      'j': { doors: 'A', dist: 11 },
      'k': { doors: 'E', dist: 5 },
      'l': { doors: 'F', dist: 11 },
      'm': { doors: 'C', dist: 11 },
      'n': { doors: 'B', dist: 9 },
      'o': { doors: 'D', dist: 11 },
      'p': { doors: 'H', dist: 13 },
    },
    'b': {
      'a': { doors: '', dist: 6 },
      'c': { doors: '', dist: 6 },
      'd': { doors: '', dist: 8 },
      'e': { doors: '', dist: 6 },
      'f': { doors: '', dist: 4 },
      'g': { doors: '', dist: 6 },
      'h': { doors: '', dist: 8 },
      'i': { doors: 'G', dist: 11 },
      'j': { doors: 'A', dist: 5 },
      'k': { doors: 'E', dist: 11 },
      'l': { doors: 'F', dist: 13 },
      'm': { doors: 'C', dist: 13 },
      'n': { doors: 'B', dist: 11 },
      'o': { doors: 'D', dist: 9 },
      'p': { doors: 'H', dist: 11 },
    },
    'c': {
      'a': { doors: '', dist: 8 },
      'b': { doors: '', dist: 6 },
      'd': { doors: '', dist: 10 },
      'e': { doors: '', dist: 4 },
      'f': { doors: '', dist: 6 },
      'g': { doors: '', dist: 8 },
      'h': { doors: '', dist: 10 },
      'i': { doors: 'G', dist: 5 },
      'j': { doors: 'A', dist: 11 },
      'k': { doors: 'E', dist: 13 },
      'l': { doors: 'F', dist: 15 },
      'm': { doors: 'C', dist: 15 },
      'n': { doors: 'B', dist: 13 },
      'o': { doors: 'D', dist: 11 },
      'p': { doors: 'H', dist: 9 },
    },
    'd': {
      'a': { doors: '', dist: 6 },
      'b': { doors: '', dist: 8 },
      'c': { doors: '', dist: 10 },
      'e': { doors: '', dist: 10 },
      'f': { doors: '', dist: 8 },
      'g': { doors: '', dist: 6 },
      'h': { doors: '', dist: 4 },
      'i': { doors: 'G', dist: 15 },
      'j': { doors: 'A', dist: 13 },
      'k': { doors: 'E', dist: 11 },
      'l': { doors: 'F', dist: 5 },
      'm': { doors: 'C', dist: 9 },
      'n': { doors: 'B', dist: 11 },
      'o': { doors: 'D', dist: 13 },
      'p': { doors: 'H', dist: 15 },
    },
    'e': {
      'a': { doors: '', dist: 8 },
      'b': { doors: '', dist: 6 },
      'c': { doors: '', dist: 4 },
      'd': { doors: '', dist: 10 },
      'f': { doors: '', dist: 6 },
      'g': { doors: '', dist: 8 },
      'h': { doors: '', dist: 10 },
      'i': { doors: 'G', dist: 9 },
      'j': { doors: 'A', dist: 11 },
      'k': { doors: 'E', dist: 13 },
      'l': { doors: 'F', dist: 15 },
      'm': { doors: 'C', dist: 15 },
      'n': { doors: 'B', dist: 13 },
      'o': { doors: 'D', dist: 11 },
      'p': { doors: 'H', dist: 5 },
    },
    'f': {
      'a': { doors: '', dist: 6 },
      'b': { doors: '', dist: 4 },
      'c': { doors: '', dist: 6 },
      'd': { doors: '', dist: 8 },
      'e': { doors: '', dist: 6 },
      'g': { doors: '', dist: 6 },
      'h': { doors: '', dist: 8 },
      'i': { doors: 'G', dist: 11 },
      'j': { doors: 'A', dist: 9 },
      'k': { doors: 'E', dist: 11 },
      'l': { doors: 'F', dist: 13 },
      'm': { doors: 'C', dist: 13 },
      'n': { doors: 'B', dist: 11 },
      'o': { doors: 'D', dist: 5 },
      'p': { doors: 'H', dist: 11 },
    },
    'g': {
      'a': { doors: '', dist: 4 },
      'b': { doors: '', dist: 6 },
      'c': { doors: '', dist: 8 },
      'd': { doors: '', dist: 6 },
      'e': { doors: '', dist: 8 },
      'f': { doors: '', dist: 6 },
      'h': { doors: '', dist: 6 },
      'i': { doors: 'G', dist: 13 },
      'j': { doors: 'A', dist: 11 },
      'k': { doors: 'E', dist: 9 },
      'l': { doors: 'F', dist: 11 },
      'm': { doors: 'C', dist: 11 },
      'n': { doors: 'B', dist: 5 },
      'o': { doors: 'D', dist: 11 },
      'p': { doors: 'H', dist: 13 },
    },
    'h': {
      'a': { doors: '', dist: 6 },
      'b': { doors: '', dist: 8 },
      'c': { doors: '', dist: 10 },
      'd': { doors: '', dist: 4 },
      'e': { doors: '', dist: 10 },
      'f': { doors: '', dist: 8 },
      'g': { doors: '', dist: 6 },
      'i': { doors: 'G', dist: 15 },
      'j': { doors: 'A', dist: 13 },
      'k': { doors: 'E', dist: 11 },
      'l': { doors: 'F', dist: 9 },
      'm': { doors: 'C', dist: 5 },
      'n': { doors: 'B', dist: 11 },
      'o': { doors: 'D', dist: 13 },
      'p': { doors: 'H', dist: 15 },
    },
    'i': {
      'a': { doors: 'G', dist: 13 },
      'b': { doors: 'G', dist: 11 },
      'c': { doors: 'G', dist: 5 },
      'd': { doors: 'G', dist: 15 },
      'e': { doors: 'G', dist: 9 },
      'f': { doors: 'G', dist: 11 },
      'g': { doors: 'G', dist: 13 },
      'h': { doors: 'G', dist: 15 },
      'j': { doors: 'GA', dist: 16 },
      'k': { doors: 'GE', dist: 18 },
      'l': { doors: 'GF', dist: 20 },
      'm': { doors: 'GC', dist: 20 },
      'n': { doors: 'GB', dist: 18 },
      'o': { doors: 'GD', dist: 16 },
      'p': { doors: 'GH', dist: 14 },
    },
    'j': {
      'a': { doors: 'A', dist: 11 },
      'b': { doors: 'A', dist: 5 },
      'c': { doors: 'A', dist: 11 },
      'd': { doors: 'A', dist: 13 },
      'e': { doors: 'A', dist: 11 },
      'f': { doors: 'A', dist: 9 },
      'g': { doors: 'A', dist: 11 },
      'h': { doors: 'A', dist: 13 },
      'i': { doors: 'AG', dist: 16 },
      'k': { doors: 'AE', dist: 16 },
      'l': { doors: 'AF', dist: 18 },
      'm': { doors: 'AC', dist: 18 },
      'n': { doors: 'AB', dist: 16 },
      'o': { doors: 'AD', dist: 14 },
      'p': { doors: 'AH', dist: 16 },
    },
    'k': {
      'a': { doors: 'E', dist: 5 },
      'b': { doors: 'E', dist: 11 },
      'c': { doors: 'E', dist: 13 },
      'd': { doors: 'E', dist: 11 },
      'e': { doors: 'E', dist: 13 },
      'f': { doors: 'E', dist: 11 },
      'g': { doors: 'E', dist: 9 },
      'h': { doors: 'E', dist: 11 },
      'i': { doors: 'EG', dist: 18 },
      'j': { doors: 'EA', dist: 16 },
      'l': { doors: 'EF', dist: 16 },
      'm': { doors: 'EC', dist: 16 },
      'n': { doors: 'EB', dist: 14 },
      'o': { doors: 'ED', dist: 16 },
      'p': { doors: 'EH', dist: 18 },
    },
    'l': {
      'a': { doors: 'F', dist: 11 },
      'b': { doors: 'F', dist: 13 },
      'c': { doors: 'F', dist: 15 },
      'd': { doors: 'F', dist: 5 },
      'e': { doors: 'F', dist: 15 },
      'f': { doors: 'F', dist: 13 },
      'g': { doors: 'F', dist: 11 },
      'h': { doors: 'F', dist: 9 },
      'i': { doors: 'FG', dist: 20 },
      'j': { doors: 'FA', dist: 18 },
      'k': { doors: 'FE', dist: 16 },
      'm': { doors: 'FC', dist: 14 },
      'n': { doors: 'FB', dist: 16 },
      'o': { doors: 'FD', dist: 18 },
      'p': { doors: 'FH', dist: 20 },
    },
    'm': {
      'a': { doors: 'C', dist: 11 },
      'b': { doors: 'C', dist: 13 },
      'c': { doors: 'C', dist: 15 },
      'd': { doors: 'C', dist: 9 },
      'e': { doors: 'C', dist: 15 },
      'f': { doors: 'C', dist: 13 },
      'g': { doors: 'C', dist: 11 },
      'h': { doors: 'C', dist: 5 },
      'i': { doors: 'CG', dist: 20 },
      'j': { doors: 'CA', dist: 18 },
      'k': { doors: 'CE', dist: 16 },
      'l': { doors: 'CF', dist: 14 },
      'n': { doors: 'CB', dist: 16 },
      'o': { doors: 'CD', dist: 18 },
      'p': { doors: 'CH', dist: 20 },
    },
    'n': {
      'a': { doors: 'B', dist: 9 },
      'b': { doors: 'B', dist: 11 },
      'c': { doors: 'B', dist: 13 },
      'd': { doors: 'B', dist: 11 },
      'e': { doors: 'B', dist: 13 },
      'f': { doors: 'B', dist: 11 },
      'g': { doors: 'B', dist: 5 },
      'h': { doors: 'B', dist: 11 },
      'i': { doors: 'BG', dist: 18 },
      'j': { doors: 'BA', dist: 16 },
      'k': { doors: 'BE', dist: 14 },
      'l': { doors: 'BF', dist: 16 },
      'm': { doors: 'BC', dist: 16 },
      'o': { doors: 'BD', dist: 16 },
      'p': { doors: 'BH', dist: 18 },
    },
    'o': {
      'a': { doors: 'D', dist: 11 },
      'b': { doors: 'D', dist: 9 },
      'c': { doors: 'D', dist: 11 },
      'd': { doors: 'D', dist: 13 },
      'e': { doors: 'D', dist: 11 },
      'f': { doors: 'D', dist: 5 },
      'g': { doors: 'D', dist: 11 },
      'h': { doors: 'D', dist: 13 },
      'i': { doors: 'DG', dist: 16 },
      'j': { doors: 'DA', dist: 14 },
      'k': { doors: 'DE', dist: 16 },
      'l': { doors: 'DF', dist: 18 },
      'm': { doors: 'DC', dist: 18 },
      'n': { doors: 'DB', dist: 16 },
      'p': { doors: 'DH', dist: 16 },
    },
    'p': {
      'a': { doors: 'H', dist: 13 },
      'b': { doors: 'H', dist: 11 },
      'c': { doors: 'H', dist: 9 },
      'd': { doors: 'H', dist: 15 },
      'e': { doors: 'H', dist: 5 },
      'f': { doors: 'H', dist: 11 },
      'g': { doors: 'H', dist: 13 },
      'h': { doors: 'H', dist: 15 },
      'i': { doors: 'HG', dist: 14 },
      'j': { doors: 'HA', dist: 16 },
      'k': { doors: 'HE', dist: 18 },
      'l': { doors: 'HF', dist: 20 },
      'm': { doors: 'HC', dist: 20 },
      'n': { doors: 'HB', dist: 18 },
      'o': { doors: 'HD', dist: 16 },
    },
  }
]

QUnit.test('graph_of_map(map)', function(assert) {
  assert.deepEqual(graph_of_map(test_maps[0]), test_graphs[0])
  assert.deepEqual(graph_of_map(test_maps[1]), test_graphs[1])
  assert.deepEqual(graph_of_map(test_maps[2]), test_graphs[2])
  assert.deepEqual(graph_of_map(test_maps[3]), test_graphs[3])
})

QUnit.test('accessible_paths(graph, pos, keyring)', function(assert) {
  const cases = [
    [test_graphs[0], '@', '', [['a', 2]]],
    [test_graphs[0], 'a', 'a', [['b', 6]]],
    [test_graphs[1], '@', '', [['a', 2]]],
    [test_graphs[1], 'a', 'a', [['b', 6]]],
    [test_graphs[1], 'a', 'ac', [['b', 6], ['e', 10]]],
  ]
  cases.forEach(function([graph, pos, keyring, expected]) {
    assert.deepEqual(accessible_paths(graph, pos, keyring), expected)
  })
})

QUnit.test('route_prioritiser()', function(assert) {
  const pq = route_prioritiser()

  const low = ['abc', 50]
  const med = ['acb', 100]
  const high = ['cba', 150]

  assert.equal(pq.push(high), 1, 'Insert 1st item')
  assert.equal(pq.push(low), 2, 'Insert 2nd item')
  assert.equal(pq.push(med), 3, 'Insert 3rd item')
  assert.equal(pq.size(), 3, 'Check size with 3 items')
  assert.deepEqual(pq.pop(), low, 'Pop 1st item')
  assert.equal(pq.size(), 2, 'Check size with 2 items')
  assert.deepEqual(pq.pop(), med, 'Pop 2nd item')
  assert.equal(pq.size(), 1, 'Check size with 1 item')
  assert.deepEqual(pq.pop(), high, 'Pop 3rd item')
  assert.equal(pq.size(), 0, 'Check size when empty')

  const high_new_route = ['bca', 40]

  assert.equal(pq.push(high), 1, 'Insert 1st item')
  assert.equal(pq.push(med), 2, 'Insert 2nd item')
  assert.equal(pq.push(low), 3, 'Insert 3rd item')
  assert.deepEqual(pq.peek(), low, 'Peek() lowest-value item')
  assert.equal(pq.push(high_new_route), 3, 'Update 1st item')
  assert.deepEqual(pq.peek(), high_new_route, 'Peek() new lowest-value item')
  assert.equal(pq.push(high), 3, 'Try to update 1st item with worse version')
  assert.deepEqual(pq.peek(), high_new_route, 'Peek() still lowest-value item')

})

QUnit.test('shortest_path(graph)', function(assert) {
  assert.equal(8, shortest_path(test_graphs[0]))
  assert.equal(86, shortest_path(test_graphs[1]))
  assert.equal(132, shortest_path(test_graphs[2]))
  assert.equal(136, shortest_path(test_graphs[3]))
})

QUnit.test('Solutions', async function(assert) {
  const map = await fetch_puzzle_input_lines()
  assert.equal(
    shortest_path(graph_of_map(map)),
    3962,
    'Part 1: shortest path = 3962',
  )
})
