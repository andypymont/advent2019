function fuel_required(mass) {
  return Math.floor(mass / 3) - 2
}

function fuel_required_including_fuel_mass(mass) {
  let fuel = 0
  while ( mass > 0 ) {
    mass = fuel_required(mass)
    fuel += Math.max(mass, 0)
  }
  return fuel
}

const sum = (accumulator, current) => (accumulator + current)

function total_fuel_required(input, account_for_fuel) {
  const f = account_for_fuel ? fuel_required_including_fuel_mass : fuel_required
  return input.split('\n').map(x => parseInt(x))
                          .map(f)
                          .reduce(sum)
}
