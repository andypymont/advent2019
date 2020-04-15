const test_code = [
  '3,68,1006,68,41,3,69,3,70,1001,69,1,69,1001,70,1,70,1001,69,-50,71,1006,71,',
  '50,1006,69,5,1001,69,-102,71,1006,71,59,1001,69,-103,71,1006,71,59,4,69,4,',
  '69,4,70,1105,1,5,104,255,104,101,104,203,1105,1,5,104,255,104,102,104,204,',
  '1105,1,5,0,0,0,0'
].join('')
const test_program = {
  ip: 0,
  rb: 0,
  memory: [
    3, 68, 1006, 68, 41, 3, 69, 3, 70, 1001, 69, 1, 69, 1001, 70, 1, 70, 1001,
    69, -50, 71, 1006, 71, 50, 1006, 69, 5, 1001, 69, -102, 71, 1006, 71, 59,
    1001, 69, -103, 71, 1006, 71, 59, 4, 69, 4,  69, 4, 70, 1105, 1, 5, 104,
    255, 104, 101, 104, 203, 1105, 1, 5, 104, 255, 104, 102, 104, 204, 1105, 1,
    5, 0, 0, 0, 0
  ],
  input: [],
  output: [],
  status: 'ready',
}

QUnit.test('read_program(test_code)', function(assert) {
  assert.deepEqual(
    read_program(test_code),
    test_program
  )
})

QUnit.test('run_intcode_network(program)', function(assert) {
  assert.deepEqual(
    run_intcode_network(test_program),
    {
      first: 203,
      repeated: 204,
    }
  )
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  const solutions = run_intcode_network(program)
  assert.equal(
    solutions.first,
    26163,
    'Part 1: First output to address 255 has Y=26163'
  )
  assert.equal(
    solutions.repeated,
    18733,
    'Part 2: First repeated Y-output to address 255 is 18733'
  )
})
