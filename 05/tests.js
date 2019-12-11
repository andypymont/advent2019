QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(txt => read_program(txt))
  assert.deepEqual(run_program(program, [1]).output,
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 11933517],
                   'Part 1: Input 1 tests pass & diagnostic code === 11933517')
  assert.deepEqual(run_program(program, [5]).output,
                   [10428568],
                   'Part 2: Input 5 diagnostic code === 10428568')
})
