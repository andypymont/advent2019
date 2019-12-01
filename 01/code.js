function fuel_required(mass) {
  return Math.floor(mass / 3) - 2
}

const sum = (accumulator, current) => (accumulator + current)

function total_fuel_required(input) {
  return input.split('\n').map(x => parseInt(x))
                          .map(fuel_required)
                          .reduce(sum)
}
