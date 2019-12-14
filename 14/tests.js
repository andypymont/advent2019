QUnit.test('read_reactions(input)', function(assert) {
  const cases = [
    {
      input: [
        '10 ORE => 10 A',
        '1 ORE => 1 B',
        '7 A, 1 B => 1 C',
        '7 A, 1 C => 1 D',
        '7 A, 1 D => 1 E',
        '7 A, 1 E => 1 FUEL',
      ],
      expected: new Map([
        ['A', [10, [['ORE', 10]]]],
        ['B', [1, [['ORE', 1]]]],
        ['C', [1, [['A', 7], ['B', 1]]]],
        ['D', [1, [['A', 7], ['C', 1]]]],
        ['E', [1, [['A', 7], ['D', 1]]]],
        ['FUEL', [1, [['A', 7], ['E', 1]]]],
      ]),
      desc: 'first example',
    },
    {
      input: [
        '9 ORE => 2 A',
        '8 ORE => 3 B',
        '7 ORE => 5 C',
        '3 A, 4 B => 1 AB',
        '5 B, 7 C => 1 BC',
        '4 C, 1 A => 1 CA',
        '2 AB, 3 BC, 4 CA => 1 FUEL',
      ],
      expected: new Map([
        ['A', [2, [['ORE', 9]]]],
        ['B', [3, [['ORE', 8]]]],
        ['C', [5, [['ORE', 7]]]],
        ['AB', [1, [['A', 3], ['B', 4]]]],
        ['BC', [1, [['B', 5], ['C', 7]]]],
        ['CA', [1, [['C', 4], ['A', 1]]]],
        ['FUEL', [1, [['AB', 2], ['BC', 3], ['CA', 4]]]]
      ]),
      desc: 'second example',
    }
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.deepEqual(read_reactions(input),
                     expected,
                     desc)
  })
})

QUnit.test('resolve_need(element, elements, reactions)', function(assert) {
  const reactions = new Map([
    ['A', [2, [['ORE', 9]]]],
    ['B', [3, [['ORE', 8]]]],
    ['C', [5, [['ORE', 7]]]],
    ['AB', [1, [['A', 3], ['B', 4]]]],
    ['BC', [1, [['B', 5], ['C', 7]]]],
    ['CA', [1, [['C', 4], ['A', 1]]]],
    ['FUEL', [1, [['AB', 2], ['BC', 3], ['CA', 4]]]]
  ])
  const cases = [
    {
      elements: new Map([
        ['FUEL', -1]
      ]),
      element: 'FUEL',
      expected: new Map([
        ['FUEL', 0],
        ['AB', -2],
        ['BC', -3],
        ['CA', -4],
      ])
    },
    {
      elements: new Map([
        ['FUEL', 0],
        ['AB', -2],
        ['BC', -3],
        ['CA', -4],
      ]),
      element: 'AB',
      expected: new Map([
        ['FUEL', 0],
        ['AB', 0],
        ['BC', -3],
        ['CA', -4],
        ['A', -6],
        ['B', -8],
      ])
    },
    {
      elements: new Map([
        ['FUEL', 0],
        ['AB', 0],
        ['BC', -3],
        ['CA', -4],
        ['A', -6],
        ['B', -8],
      ]),
      element: 'BC',
      expected: new Map([
        ['FUEL', 0],
        ['AB', 0],
        ['BC', 0],
        ['CA', -4],
        ['A', -6],
        ['B', -23],
        ['C', -21]
      ])
    }
  ]
  cases.forEach(function({ elements, element, expected }) {
    assert.deepEqual(
      resolve_need(element, elements, reactions),
      expected
    )
  })
})

const example_reactions = [
  new Map([
    ['A', [2, [['ORE', 9]]]],
    ['B', [3, [['ORE', 8]]]],
    ['C', [5, [['ORE', 7]]]],
    ['AB', [1, [['A', 3], ['B', 4]]]],
    ['BC', [1, [['B', 5], ['C', 7]]]],
    ['CA', [1, [['C', 4], ['A', 1]]]],
    ['FUEL', [1, [['AB', 2], ['BC', 3], ['CA', 4]]]],
  ]),
  new Map([
    ['NZVS', [5, [['ORE', 157]]]],
    ['DCFZ', [6, [['ORE', 165]]]],
    ['FUEL', [1, [['XJWVT', 44], ['KHKGT', 5], ['QDVJ', 1],
                  ['NZVS', 29], ['GPVTF', 9], ['HKGWZ', 48]]]],
    ['QDVJ', [9, [['HKGWZ', 12], ['GPVTF', 1], ['PSHF', 8]]]],
    ['PSHF', [7, [['ORE', 179]]]],
    ['HKGWZ', [5, [['ORE', 177]]]],
    ['XJWVT', [2, [['DCFZ', 7], ['PSHF', 7]]]],
    ['GPVTF', [2, [['ORE', 165]]]],
    ['KHKGT', [8, [['DCFZ', 3], ['NZVS', 7], ['HKGWZ', 5],
                   ['PSHF', 10]]]],
  ]),
  new Map([
    ['STKFG', [1, [['VPVL', 2], ['FWMGM', 7], ['CXFTF', 2],
                   ['MNCFX', 11]]]],
    ['VPVL', [8, [['NVRVD', 17], ['JNWZP', 3]]]],
    ['FUEL', [1, [['STKFG', 53], ['MNCFX', 6], ['VJHF', 46],
                  ['HVMC', 81], ['CXFTF', 68], ['GNMV', 25]]]],
    ['FWMGM', [5, [['VJHF', 22], ['MNCFX', 37]]]],
    ['NVRVD', [4, [['ORE', 139]]]],
    ['JNWZP', [7, [['ORE', 144]]]],
    ['HVMC', [3, [['MNCFX', 5], ['RFSQX', 7], ['FWMGM', 2],
                  ['VPVL', 2], ['CXFTF', 19]]]],
    ['GNMV', [6, [['VJHF', 5], ['MNCFX', 7], ['VPVL', 9],
                  ['CXFTF', 37]]]],
    ['MNCFX', [6, [['ORE', 145]]]],
    ['CXFTF', [8, [['NVRVD', 1]]]],
    ['RFSQX', [4, [['VJHF', 1], ['MNCFX', 6]]]],
    ['VJHF', [6, [['ORE', 176]]]],
  ]),
  new Map([
    ['CNZTR', [8, [['ORE', 171]]]],
    ['PLWSL', [4, [['ZLQW', 7], ['BMBT', 3], ['XCVML', 9], ['XMNCP', 26],
                   ['WPTQ', 1], ['MZWV', 2], ['RJRHP', 1]]]],
    ['BHXH', [4, [['ORE', 114]]]],
    ['BMBT', [6, [['VRPVC', 14]]]],
    ['FUEL', [1, [['BHXH', 6], ['KTJDG', 18], ['WPTQ', 12], ['PLWSL', 7],
                  ['FHTLT', 31], ['ZDVW', 37]]]],
    ['FHTLT', [6, [['WPTQ', 6], ['BMBT', 2], ['ZLQW', 8], ['KTJDG', 18],
                   ['XMNCP', 1], ['MZWV', 6], ['RJRHP', 1]]]],
    ['ZLQW', [6, [['XDBXC', 15], ['LTCX', 2], ['VRPVC', 1]]]],
    ['ZDVW', [1, [['WPTQ', 13], ['LTCX', 10], ['RJRHP', 3], ['XMNCP', 14],
                  ['MZWV', 2], ['ZLQW', 1]]]],
    ['WPTQ', [4, [['BMBT', 5]]]],
    ['KTJDG', [9, [['ORE', 189]]]],
    ['XMNCP', [2, [['MZWV', 1], ['XDBXC', 17], ['XCVML', 3]]]],
    ['XDBXC', [2, [['VRPVC', 12], ['CNZTR', 27]]]],
    ['XCVML', [5, [['KTJDG', 15], ['BHXH', 12]]]],
    ['MZWV', [7, [['BHXH', 3], ['VRPVC', 2]]]],
    ['VRPVC', [7, [['ORE', 121]]]],
    ['RJRHP', [6, [['XCVML', 7]]]],
    ['LTCX', [5, [['BHXH', 5], ['VRPVC', 4]]]],
  ]),
]

QUnit.test('ore_needed(reactions)', function(assert) {
  const cases = [
    {
      input: example_reactions[0],
      expected: 165,
      desc: 'example 1: 165 ore creates 1 fuel',
    },
    {
      input: example_reactions[1],
      expected: 13312,
      desc: 'example 2: 13,312 ore creates 1 fuel',
    },
    {
      input: example_reactions[2],
      expected: 180697,
      desc: 'example 3: 180,697 ore creates 1 fuel',
    },
    {
      input: example_reactions[3],
      expected: 2210736,
      desc: 'example 4: 2,210,736 ore creates 1 fuel',
    },
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.equal(
      ore_needed(input),
      expected,
      desc,
    )
  })
})

QUnit.test('fuel_from_trillion_ore(reactions)', function(assert) {
  const cases = [
    {
      input: example_reactions[1],
      expected: 82892753,
      desc: 'example 2: 1 trillion ore creates 82,892,753 fuel',
    },
    {
      input: example_reactions[2],
      expected: 5586022,
      desc: 'example 3: 1 trillion ore creates 5,586,022 fuel',
    },
    {
      input: example_reactions[3],
      expected: 460664,
      desc: 'example 4: 1 trillion ore creates 460,664 fuel',
    },
  ]
  cases.forEach(function({ input, expected, desc }) {
    assert.equal(fuel_from_trillion_ore(input),
                 expected,
                 desc)
  })
})

QUnit.test('Solutions', async function(assert) {
  const reactions = await fetch_puzzle_input_lines().then(read_reactions)
  assert.equal(
    ore_needed(reactions),
    720484,
    'Part 1: ore needed to create 1 fuel === 720484'
  )
  assert.equal(
    fuel_from_trillion_ore(reactions),
    1993284,
    'Part 2: fuel that can be created with 1 trillion ore === 0'
  )
})
