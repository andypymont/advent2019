function outputter(outputs) {
  return read_program(outputs.map(output => '104,' + output)
                             .join(',') + ',99')
}

QUnit.test('count_blocks(program)', function(assert) {
  const cases = [
    {
      program_outputs: [
        1, 2, 3, 4, 5, 6,
      ],
      expected: 0,
    },
    {
      program_outputs: [
        1, 1, 1, 2, 1, 1, 3, 1, 1, 4, 1, 1, 5, 1, 1, 6, 1, 1, 7, 1, 1,
        1, 2, 1, 2, 2, 2, 3, 2, 2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 7, 2, 1,
        1, 3, 1, 2, 3, 0, 3, 3, 2, 4, 3, 2, 5, 3, 2, 6, 3, 2, 7, 3, 1,
        1, 4, 1, 2, 4, 0, 3, 4, 4, 4, 4, 0, 5, 4, 0, 6, 4, 0, 7, 4, 1,
        1, 5, 1, 2, 5, 0, 3, 5, 0, 4, 5, 0, 5, 5, 0, 6, 5, 0, 7, 5, 1,
        1, 6, 1, 2, 6, 0, 3, 6, 0, 4, 6, 3, 5, 6, 0, 6, 6, 0, 7, 6, 1,
        1, 7, 1, 2, 7, 1, 3, 7, 1, 4, 7, 1, 5, 7, 1, 6, 7, 1, 7, 7, 1,
      ],
      expected: 9,
    },
    {
      program_outputs: [
        1, 1, 1, 2, 1, 1, 3, 1, 1, 4, 1, 1, 5, 1, 1, 6, 1, 1, 7, 1, 1,
        1, 2, 1, 2, 2, 2, 3, 2, 2, 4, 2, 2, 5, 2, 2, 6, 2, 2, 7, 2, 1,
        1, 3, 1, 2, 3, 0, 3, 3, 2, 4, 3, 2, 5, 3, 2, 6, 3, 2, 7, 3, 1,
        1, 4, 1, 2, 4, 0, 3, 4, 4, 4, 4, 0, 5, 4, 2, 6, 4, 2, 7, 4, 1,
        1, 5, 1, 2, 5, 0, 3, 5, 0, 4, 5, 0, 5, 5, 0, 6, 5, 2, 7, 5, 1,
        1, 6, 1, 2, 6, 0, 3, 6, 0, 4, 6, 3, 5, 6, 0, 6, 6, 0, 7, 6, 1,
        1, 7, 1, 2, 7, 1, 3, 7, 1, 4, 7, 1, 5, 7, 1, 6, 7, 1, 7, 7, 1,
      ],
      expected: 12,
    },
  ]
  cases.forEach(function({ program_outputs, expected }) {
    const program = outputter(program_outputs)
    assert.equal(count_blocks(program), expected)
  })
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(
    count_blocks(program),
    318,
    'Part 1: 318 blocks on screen'
  )
})
