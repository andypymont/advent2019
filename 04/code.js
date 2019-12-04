const ascending_pairs = new Set([
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13',
  '14', '15', '16', '17', '18', '19', '22', '23', '24', '25', '26', '27', '28',
  '29', '33', '34', '35', '36', '37', '38', '39', '44', '45', '46', '47', '48',
  '49', '55', '56', '57', '58', '59', '66', '67', '68', '69', '77', '78', '79',
  '88', '89', '99'
])

function check_password(password) {
  let groups = []
  let current_group = 'X'
  let ascending = true

  password.toString()
          .split('')
          .forEach(function(digit, ix, digits) {
            if ( digit === current_group[0] ) {
              current_group += digit
            } else {
              groups.push(current_group)
              current_group = digit
              if ( ix > 0 ) {
                ascending = ( ascending &&
                              ascending_pairs.has(digits[ix-1] + digit) )
              }
            }
          })
  groups.push(current_group)

  return {
    ascending: ascending,
    groups: groups.filter(group => group.length > 1)
  }

}

const has_any_group = groups => groups.length > 0
const has_two_group = groups => groups.filter(g => g.length === 2).length > 0

function passwords_in_range(range) {
  const [start, end] = range.split('-').map(x => parseInt(x))
  let any_group = 0
  let two_group = 0

  for ( let p = start; p <= end; p++ ) {
    const { ascending, groups } = check_password(p)

    if ( ascending && (groups.length > 0) ) {
      any_group++
    }
    if ( ascending && (groups.filter(g => g.length === 2).length > 0) ) {
      two_group++
    }
  }

  return { any_group, two_group }
}
