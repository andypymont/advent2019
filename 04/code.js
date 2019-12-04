function check_password(password) {
  const digits = password.toString().split('').map(d => parseInt(d))

  let adjacent = false
  for ( d = 1; d < digits.length; d++ ) {
    adjacent = adjacent || (digits[d-1] == digits[d])
    if ( digits[d] < digits[d-1] ) {
      return false
    }
  }
  return adjacent
}

function passwords_in_range(range) {
  const [start, end] = range.split('-').map(x => parseInt(x))
  let possible = 0

  for ( let p = start; p <= end; p++ ) {
    if ( check_password(p) ) {
      possible++
    }
  }

  return possible
}
