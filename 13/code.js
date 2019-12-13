function count_blocks(program) {
  const outputs = run_program(program).output
  return Array(outputs.length/3).fill()
                                .map((_, x) =>outputs[(x*3)+2])
                                .filter(x => x === 2)
                                .length
}
