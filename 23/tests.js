const test_code = [
  '3,45,1006,45,27,3,46,3,47,1001,46,1,46,1001,47,1,47,1001,46,-50,48,1006,48,',
  '36,1006,46,5,4,46,4,46,4,47,1105,1,5,104,255,104,101,104,203,1105,1,5,0,0,0,',
  '0',
].join('')
const test_program = {
  ip: 0,
  rb: 0,
  memory: [
    3, 45, 1006, 45, 27, 3, 46, 3, 47, 1001, 46, 1, 46, 1001, 47, 1, 47, 1001,
    46, -50, 48, 1006, 48, 36, 1006, 46, 5, 4, 46, 4, 46, 4, 47, 1105, 1, 5,
    104, 255, 104, 101, 104, 203, 1105, 1, 5, 0, 0, 0, 0,
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
    { x: 101, y: 203, address: 255 },
  )
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_puzzle_input().then(read_program)
  assert.deepEqual(
    run_intcode_network(program),
    { x: 16979, y: 26163, address: 255 },
    'First output to address 255 is X=16979, Y=26163'
  )
})
