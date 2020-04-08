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
]

const test_graphs = [
  {
    'robot0': {
      1: { doors: 0, dist: 2 },
      2: { doors: 1, dist: 4 },
    },
    1: {
      2: { doors: 1, dist: 6 },
    },
    2: {
      1: { doors: 1, dist: 6 },
    }
  },
  {
    'robot0': {
      1: { doors: 0, dist: 2 },
      2: { doors: 1, dist: 4 },
      4: { doors: 2, dist: 6 },
      8: { doors: 2, dist: 30 },
      16: { doors: 5, dist: 8 },
      32: { doors: 29, dist: 14 },
    },
    1: {
      2: { doors: 1, dist: 6 },
      4: { doors: 2, dist: 4 },
      8: { doors: 2, dist: 28 },
      16: { doors: 5, dist: 10 },
      32: { doors: 29, dist: 16 },
    },
    2: {
      1: { doors: 1, dist: 6 },
      4: { doors: 3, dist: 10 },
      8: { doors: 3, dist: 34 },
      16: { doors: 4, dist: 4 },
      32: { doors: 28, dist: 10 },
    },
    4: {
      1: { doors: 2, dist: 4 },
      2: { doors: 3, dist: 10 },
      8: { doors: 0, dist: 24 },
      16: { doors: 7, dist: 14 },
      32: { doors: 31, dist: 20},
    },
    8: {
      1: { doors: 2, dist: 28 },
      2: { doors: 3, dist: 34 },
      4: { doors: 0, dist: 24},
      16: { doors: 7, dist: 38 },
      32: { doors: 31, dist: 44 },
    },
    16: {
      1: { doors: 5, dist: 10 },
      2: { doors: 4, dist: 4 },
      4: { doors: 7, dist: 14 },
      8: { doors: 7, dist: 38 },
      32: { doors: 24, dist: 6 },
    },
    32: {
      1: { doors: 29, dist: 16 },
      2: { doors: 28, dist: 10 },
      4: { doors: 31, dist: 20 },
      8: { doors: 31, dist: 44 },
      16: { doors: 24, dist: 6 },
    },
  },
  {
    'robot0': {
      1: { doors: 0, dist: 2 },
      2: { doors: 0, dist: 22 },
      4: { doors: 2, dist: 6 },
      8: { doors: 2, dist: 8 },
      16: { doors: 3, dist: 12 },
      32: { doors: 12, dist: 28 },
      64: { doors: 35, dist: 16 },
    },
    1: {
      2: { doors: 0, dist: 24 },
      4: { doors: 2, dist: 4 },
      8: { doors: 2, dist: 6 },
      16: { doors: 3, dist: 10 },
      32: { doors: 12, dist: 30 },
      64: { doors: 35, dist: 14 },
    },
    2: {
      1: { doors: 0, dist: 24 },
      4: { doors: 2, dist: 28 },
      8: { doors: 2, dist: 30 },
      16: { doors: 3, dist: 34 },
      32: { doors: 12, dist: 6 },
      64: { doors: 35, dist: 38 },
    },
    4: {
      1: { doors: 2, dist: 4 },
      2: { doors: 2, dist: 28 },
      8: { doors: 0, dist: 2 },
      16: { doors: 1, dist: 6 },
      32: { doors: 14, dist: 34 },
      64: { doors: 33, dist: 10 },
    },
    8: {
      1: { doors: 2, dist: 6 },
      2: { doors: 2, dist: 30 },
      4: { doors: 0, dist: 2 },
      16: { doors: 1, dist: 4 },
      32: { doors: 14, dist: 36 },
      64: { doors: 33, dist: 8 },
    },
    16: {
      1: { doors: 3, dist: 10 },
      2: { doors: 3, dist: 34 },
      4: { doors: 1, dist: 6 },
      8: { doors: 1, dist: 4 },
      32: { doors: 15, dist: 40 },
      64: { doors: 32, dist: 4 },
    },
    32: {
      1: { doors: 12, dist: 30 },
      2: { doors: 12, dist: 6 },
      4: { doors: 14, dist: 34 },
      8: { doors: 14, dist: 36 },
      16: { doors: 15, dist: 40 },
      64: { doors: 47, dist: 44 },
    },
    64: {
      1: { doors: 35, dist: 14 },
      2: { doors: 35, dist: 38 },
      4: { doors: 33, dist: 10 },
      8: { doors: 33, dist: 8 },
      16: { doors: 32, dist: 4 },
      32: { doors: 47, dist: 44 },
    },
  },
  {
    'robot0': {
      1: { doors: 0, dist: 3 },
      2: { doors: 0, dist: 3 },
      4: { doors: 0, dist: 5 },
      8: { doors: 0, dist: 5 },
      16: { doors: 0, dist: 5 },
      32: { doors: 0, dist: 3 },
      64: { doors: 0, dist: 3 },
      128: { doors: 0, dist: 5 },
      256: { doors: 64, dist: 10 },
      512: { doors: 1, dist: 8 },
      1024: { doors: 16, dist: 8 },
      2048: { doors: 32, dist: 10 },
      4096: { doors: 4, dist: 10 },
      8192: { doors: 2, dist: 8 },
      16384: { doors: 8, dist: 8 },
      32768: { doors: 128, dist: 10 },
    },
    1: {
      2: { doors: 0, dist: 6 },
      4: { doors: 0, dist: 8 },
      8: { doors: 0, dist: 6 },
      16: { doors: 0, dist: 8 },
      32: { doors: 0, dist: 6 },
      64: { doors: 0, dist: 4 },
      128: { doors: 0, dist: 6 },
      256: { doors: 64, dist: 13 },
      512: { doors: 1, dist: 11 },
      1024: { doors: 16, dist: 5 },
      2048: { doors: 32, dist: 11 },
      4096: { doors: 4, dist: 11 },
      8192: { doors: 2, dist: 9 },
      16384: { doors: 8, dist: 11 },
      32768: { doors: 128, dist: 13 },
    },
    2: {
      1: { doors: 0, dist: 6 },
      4: { doors: 0, dist: 6 },
      8: { doors: 0, dist: 8 },
      16: { doors: 0, dist: 6 },
      32: { doors: 0, dist: 4 },
      64: { doors: 0, dist: 6 },
      128: { doors: 0, dist: 8 },
      256: { doors: 64, dist: 11 },
      512: { doors: 1, dist: 5 },
      1024: { doors: 16, dist: 11 },
      2048: { doors: 32, dist: 13 },
      4096: { doors: 4, dist: 13 },
      8192: { doors: 2, dist: 11 },
      16384: { doors: 8, dist: 9 },
      32768: { doors: 128, dist: 11 },
    },
    4: {
      1: { doors: 0, dist: 8 },
      2: { doors: 0, dist: 6 },
      8: { doors: 0, dist: 10 },
      16: { doors: 0, dist: 4 },
      32: { doors: 0, dist: 6 },
      64: { doors: 0, dist: 8 },
      128: { doors: 0, dist: 10 },
      256: { doors: 64, dist: 5 },
      512: { doors: 1, dist: 11 },
      1024: { doors: 16, dist: 13 },
      2048: { doors: 32, dist: 15 },
      4096: { doors: 4, dist: 15 },
      8192: { doors: 2, dist: 13 },
      16384: { doors: 8, dist: 11 },
      32768: { doors: 128, dist: 9 },
    },
    8: {
      1: { doors: 0, dist: 6 },
      2: { doors: 0, dist: 8 },
      4: { doors: 0, dist: 10 },
      16: { doors: 0, dist: 10 },
      32: { doors: 0, dist: 8 },
      64: { doors: 0, dist: 6 },
      128: { doors: 0, dist: 4 },
      256: { doors: 64, dist: 15 },
      512: { doors: 1, dist: 13 },
      1024: { doors: 16, dist: 11 },
      2048: { doors: 32, dist: 5 },
      4096: { doors: 4, dist: 9 },
      8192: { doors: 2, dist: 11 },
      16384: { doors: 8, dist: 13 },
      32768: { doors: 128, dist: 15 },
    },
    16: {
      1: { doors: 0, dist: 8 },
      2: { doors: 0, dist: 6 },
      4: { doors: 0, dist: 4 },
      8: { doors: 0, dist: 10 },
      32: { doors: 0, dist: 6 },
      64: { doors: 0, dist: 8 },
      128: { doors: 0, dist: 10 },
      256: { doors: 64, dist: 9 },
      512: { doors: 1, dist: 11 },
      1024: { doors: 16, dist: 13 },
      2048: { doors: 32, dist: 15 },
      4096: { doors: 4, dist: 15 },
      8192: { doors: 2, dist: 13 },
      16384: { doors: 8, dist: 11 },
      32768: { doors: 128, dist: 5 },
    },
    32: {
      1: { doors: 0, dist: 6 },
      2: { doors: 0, dist: 4 },
      4: { doors: 0, dist: 6 },
      8: { doors: 0, dist: 8 },
      16: { doors: 0, dist: 6 },
      64: { doors: 0, dist: 6 },
      128: { doors: 0, dist: 8 },
      256: { doors: 64, dist: 11 },
      512: { doors: 1, dist: 9 },
      1024: { doors: 16, dist: 11 },
      2048: { doors: 32, dist: 13 },
      4096: { doors: 4, dist: 13 },
      8192: { doors: 2, dist: 11 },
      16384: { doors: 8, dist: 5 },
      32768: { doors: 128, dist: 11 },
    },
    64: {
      1: { doors: 0, dist: 4 },
      2: { doors: 0, dist: 6 },
      4: { doors: 0, dist: 8 },
      8: { doors: 0, dist: 6 },
      16: { doors: 0, dist: 8 },
      32: { doors: 0, dist: 6 },
      128: { doors: 0, dist: 6 },
      256: { doors: 64, dist: 13 },
      512: { doors: 1, dist: 11 },
      1024: { doors: 16, dist: 9 },
      2048: { doors: 32, dist: 11 },
      4096: { doors: 4, dist: 11 },
      8192: { doors: 2, dist: 5 },
      16384: { doors: 8, dist: 11 },
      32768: { doors: 128, dist: 13 },
    },
    128: {
      1: { doors: 0, dist: 6 },
      2: { doors: 0, dist: 8 },
      4: { doors: 0, dist: 10 },
      8: { doors: 0, dist: 4 },
      16: { doors: 0, dist: 10 },
      32: { doors: 0, dist: 8 },
      64: { doors: 0, dist: 6 },
      256: { doors: 64, dist: 15 },
      512: { doors: 1, dist: 13 },
      1024: { doors: 16, dist: 11 },
      2048: { doors: 32, dist: 9 },
      4096: { doors: 4, dist: 5 },
      8192: { doors: 2, dist: 11 },
      16384: { doors: 8, dist: 13 },
      32768: { doors: 128, dist: 15 },
    },
    256: {
      1: { doors: 64, dist: 13 },
      2: { doors: 64, dist: 11 },
      4: { doors: 64, dist: 5 },
      8: { doors: 64, dist: 15 },
      16: { doors: 64, dist: 9 },
      32: { doors: 64, dist: 11 },
      64: { doors: 64, dist: 13 },
      128: { doors: 64, dist: 15 },
      512: { doors: 65, dist: 16 },
      1024: { doors: 80, dist: 18 },
      2048: { doors: 96, dist: 20 },
      4096: { doors: 68, dist: 20 },
      8192: { doors: 66, dist: 18 },
      16384: { doors: 72, dist: 16 },
      32768: { doors: 192, dist: 14 },
    },
    512: {
      1: { doors: 1, dist: 11 },
      2: { doors: 1, dist: 5 },
      4: { doors: 1, dist: 11 },
      8: { doors: 1, dist: 13 },
      16: { doors: 1, dist: 11 },
      32: { doors: 1, dist: 9 },
      64: { doors: 1, dist: 11 },
      128: { doors: 1, dist: 13 },
      256: { doors: 65, dist: 16 },
      1024: { doors: 17, dist: 16 },
      2048: { doors: 33, dist: 18 },
      4096: { doors: 5, dist: 18 },
      8192: { doors: 3, dist: 16 },
      16384: { doors: 9, dist: 14 },
      32768: { doors: 129, dist: 16 },
    },
    1024: {
      1: { doors: 16, dist: 5 },
      2: { doors: 16, dist: 11 },
      4: { doors: 16, dist: 13 },
      8: { doors: 16, dist: 11 },
      16: { doors: 16, dist: 13 },
      32: { doors: 16, dist: 11 },
      64: { doors: 16, dist: 9 },
      128: { doors: 16, dist: 11 },
      256: { doors: 80, dist: 18 },
      512: { doors: 17, dist: 16 },
      2048: { doors: 48, dist: 16 },
      4096: { doors: 20, dist: 16 },
      8192: { doors: 18, dist: 14 },
      16384: { doors: 24, dist: 16 },
      32768: { doors: 144, dist: 18 },
    },
    2048: {
      1: { doors: 32, dist: 11 },
      2: { doors: 32, dist: 13 },
      4: { doors: 32, dist: 15 },
      8: { doors: 32, dist: 5 },
      16: { doors: 32, dist: 15 },
      32: { doors: 32, dist: 13 },
      64: { doors: 32, dist: 11 },
      128: { doors: 32, dist: 9 },
      256: { doors: 96, dist: 20 },
      512: { doors: 33, dist: 18 },
      1024: { doors: 48, dist: 16 },
      4096: { doors: 36, dist: 14 },
      8192: { doors: 34, dist: 16 },
      16384: { doors: 40, dist: 18 },
      32768: { doors: 160, dist: 20 },
    },
    4096: {
      1: { doors: 4, dist: 11 },
      2: { doors: 4, dist: 13 },
      4: { doors: 4, dist: 15 },
      8: { doors: 4, dist: 9 },
      16: { doors: 4, dist: 15 },
      32: { doors: 4, dist: 13 },
      64: { doors: 4, dist: 11 },
      128: { doors: 4, dist: 5 },
      256: { doors: 68, dist: 20 },
      512: { doors: 5, dist: 18 },
      1024: { doors: 20, dist: 16 },
      2048: { doors: 36, dist: 14 },
      8192: { doors: 6, dist: 16 },
      16384: { doors: 12, dist: 18 },
      32768: { doors: 132, dist: 20 },
    },
    8192: {
      1: { doors: 2, dist: 9 },
      2: { doors: 2, dist: 11 },
      4: { doors: 2, dist: 13 },
      8: { doors: 2, dist: 11 },
      16: { doors: 2, dist: 13 },
      32: { doors: 2, dist: 11 },
      64: { doors: 2, dist: 5 },
      128: { doors: 2, dist: 11 },
      256: { doors: 66, dist: 18 },
      512: { doors: 3, dist: 16 },
      1024: { doors: 18, dist: 14 },
      2048: { doors: 34, dist: 16 },
      4096: { doors: 6, dist: 16 },
      16384: { doors: 10, dist: 16 },
      32768: { doors: 130, dist: 18 },
    },
    16384: {
      1: { doors: 8, dist: 11 },
      2: { doors: 8, dist: 9 },
      4: { doors: 8, dist: 11 },
      8: { doors: 8, dist: 13 },
      16: { doors: 8, dist: 11 },
      32: { doors: 8, dist: 5 },
      64: { doors: 8, dist: 11 },
      128: { doors: 8, dist: 13 },
      256: { doors: 72, dist: 16 },
      512: { doors: 9, dist: 14 },
      1024: { doors: 24, dist: 16 },
      2048: { doors: 40, dist: 18 },
      4096: { doors: 12, dist: 18 },
      8192: { doors: 10, dist: 16 },
      32768: { doors: 136, dist: 16 },
    },
    32768: {
      1: { doors: 128, dist: 13 },
      2: { doors: 128, dist: 11 },
      4: { doors: 128, dist: 9 },
      8: { doors: 128, dist: 15 },
      16: { doors: 128, dist: 5 },
      32: { doors: 128, dist: 11 },
      64: { doors: 128, dist: 13 },
      128: { doors: 128, dist: 15 },
      256: { doors: 192, dist: 14 },
      512: { doors: 129, dist: 16 },
      1024: { doors: 144, dist: 18 },
      2048: { doors: 160, dist: 20 },
      4096: { doors: 132, dist: 20 },
      8192: { doors: 130, dist: 18 },
      16384: { doors: 136, dist: 16 },
    },
  }
]

const test_maps_fourbots = [
  [
    '#######',
    '#a.#Cd#',
    '##...##',
    '##.@.##',
    '##...##',
    '#cB#Ab#',
    '#######',
  ],
  [
    '###############',
    '#d.ABC.#.....a#',
    '######...######',
    '######.@.######',
    '######...######',
    '#b.....#.....c#',
    '###############',
  ],
  [
    '#############',
    '#DcBa.#.GhKl#',
    '#.###...#I###',
    '#e#d#.@.#j#k#',
    '###C#...###J#',
    '#fEbA.#.FgHi#',
    '#############',
  ]
]

const test_graphs_fourbots = [
  {
    'robot0': {
      1: { doors: 0, dist: 2 },
    },
    'robot1': {
      8: { doors: 4, dist: 2 },
    },
    'robot2': {
      4: { doors: 2, dist: 2 },
    },
    'robot3': {
      2: { doors: 1, dist: 2 },
    },
    1: {},
    2: {},
    4: {},
    8: {},
  },
  {
    'robot0': {
      8: { doors: 7, dist: 6 },
    },
    'robot1': {
      1: { doors: 0, dist: 6 },
    },
    'robot2': {
      2: { doors: 0, dist: 6 },
    },
    'robot3': {
      4: { doors: 0, dist: 6 },
    },
    1: {},
    2: {},
    4: {},
    8: {},
  },
  {
    'robot0': {
      1: { doors: 0, dist: 2 },
      4: { doors: 2, dist: 4 },
      16: { doors: 10, dist: 7 },
    },
    'robot1': {
      128: { doors: 64, dist: 3 },
      512: { doors: 320, dist: 5 },
      2048: { doors: 1088, dist: 5 },
    },
    'robot2': {
      2: { doors: 1, dist: 3 },
      8: { doors: 5, dist: 5 },
      32: { doors: 17, dist: 5 },
    },
    'robot3': {
      64: { doors: 32, dist: 3 },
      256: { doors: 160, dist: 5 },
      1024: { doors: 672, dist: 7 },
    },
    1: {
      4: { doors: 2, dist: 2 },
      16: { doors: 10, dist: 5 },
    },
    2: {
      8: { doors: 4, dist: 2 },
      32: { doors: 16, dist: 2 },
    },
    4: {
      1: { doors: 2, dist: 2 },
      16: { doors: 8, dist: 3 },
    },
    8: {
      2: { doors: 4, dist: 2 },
      32: { doors: 20, dist: 4 },
    },
    16: {
      1: { doors: 10, dist: 5 },
      4: { doors: 8, dist: 3 },
    },
    32: {
      2: { doors: 16, dist: 2 },
      8: { doors: 20, dist: 4 },
    },
    64: {
      256: { doors: 128, dist: 2 },
      1024: { doors: 640, dist: 4 },
    },
    128: {
      512: { doors: 256, dist: 2 },
      2048: { doors: 1024, dist: 2 },
    },
    256: {
      64: { doors: 128, dist: 2 },
      1024: { doors: 512, dist: 2 },
    },
    512: {
      128: { doors: 256, dist: 2 },
      2048: { doors: 1280, dist: 4 },
    },
    1024: {
      64: { doors: 640, dist: 4 },
      256: { doors: 512, dist: 2 },
    },
    2048: {
      128: { doors: 1024, dist: 2},
      512: { doors: 1280, dist: 4 },
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
    [test_graphs[0], 'robot0', 0, [[1, 2]]],
    [test_graphs[0], 1, 1, [[2, 6]]],
    [test_graphs[1], 'robot0', 0, [[1, 2]]],
    [test_graphs[1], 1, 1, [[2, 6]]],
    [test_graphs[1], 1, 5, [[2, 6], [16, 10]]],
  ]
  cases.forEach(function([graph, pos, keyring, expected]) {
    assert.deepEqual(accessible_paths(graph, pos, keyring), expected)
  })
})

QUnit.test('route_prioritiser()', function(assert) {
  const pq = route_prioritiser()

  const low = [7, 4, 50]
  const med = [7, 2, 100]
  const high = [7, 1, 150]

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

  const high_new_route = [7, 1, 40]

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
  assert.equal(shortest_path(test_graphs[0]), 8)
  assert.equal(shortest_path(test_graphs[1]), 86)
  assert.equal(shortest_path(test_graphs[2]), 132)
  assert.equal(shortest_path(test_graphs[3]), 136)
})

QUnit.test('graph_of_map(map, true)', function(assert) {
  test_maps_fourbots.forEach(function(map, i) {
    assert.deepEqual(graph_of_map(map, true), test_graphs_fourbots[i])
  })
})

QUnit.test('shortest_path(graph_with_four_bots)', function(assert) {
  assert.equal(shortest_path(test_graphs_fourbots[0]), 8)
  assert.equal(shortest_path(test_graphs_fourbots[1]), 24)
  assert.equal(shortest_path(test_graphs_fourbots[2]), 32)
})

QUnit.test('Solutions', async function(assert) {
  const map = await fetch_puzzle_input_lines()

  const graph = graph_of_map(map)
  const graph_two = graph_of_map(map, true)

  assert.equal(
    shortest_path(graph),
    3962,
    'Part 1: shortest path = 3962',
  )
  assert.equal(
    shortest_path(graph_two),
    1844,
    'Part 1: shortest path with four separate vaults = 1844',
  )
})
