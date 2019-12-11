QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.equal(run_program(program, [1]).output.shift(),
               3345854957,
               'BOOST keycode === 3345854957')
  assert.equal(run_program(program, [2]).output.shift(),
               68938,
               'BOOST coordinates === 68938')
})
