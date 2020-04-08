async function fetch_input_program() {
  return fetch_puzzle_input().then(read_program)
}

const failure = `Input instructions:

Walking...


Didn't make it across:

.................
.................
@................
#####.###########

.................
.................
.@...............
#####.###########

.................
..@..............
.................
#####.###########

...@.............
.................
.................
#####.###########

.................
....@............
.................
#####.###########

.................
.................
.....@...........
#####.###########

.................
.................
.................
#####@###########

`

QUnit.test('run_springbot() with no input', async function(assert) {
  const program = await fetch_input_program()
  assert.equal(
    run_springbot(program, []),
    'Input instructions:\n\nInvalid operation; expected something like AND, ' +
    'OR, or NOT\n',
  )
})

QUnit.test('run_springbot() example: jump into holes', async function(assert) {
  const program = await fetch_input_program()
  assert.equal(
    run_springbot(program, ['NOT D J', 'WALK']),
    failure,
  )
})

QUnit.test('Solutions', async function(assert) {
  const program = await fetch_input_program()
  assert.equal(
    run_springbot(program, [
      'NOT C J',
      'AND D J',
      'NOT A T',
      'OR T J',
      'WALK',
    ]),
    19351175,
    'Part 1: safe SpringScript program gives damage: 19,351,175'
  )
})
