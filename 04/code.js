const ascending_pairs = new Set([
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13',
  '14', '15', '16', '17', '18', '19', '22', '23', '24', '25', '26', '27', '28',
  '29', '33', '34', '35', '36', '37', '38', '39', '44', '45', '46', '47', '48',
  '49', '55', '56', '57', '58', '59', '66', '67', '68', '69', '77', '78', '79',
  '88', '89', '99'
])

function check_password(password) {
  return password.toString()
                 .split('')
                 .reduce(function(rv, digit, ix, digits) {
                   let prev = (ix === 0) ? '' : digits[ix-1]
                   if ( digit === prev ) {
                     rv.groups[rv.groups.length - 1] += digit
                   } else {
                     rv.groups.push(digit)
                   }
                   if ( ix > 0 ) {
                     let pair = digits[ix-1] + digit
                     rv.ascending = (rv.ascending && ascending_pairs.has(pair))
                   }
                   return rv
                 },
               {
                 ascending: true,
                 groups: []
               })
}

function passwords_in_range(range) {
  const [start, end] = range.split('-').map(x => parseInt(x))
  let any_group = 0
  let two_group = 0

  for ( let p = start; p <= end; p++ ) {
    const { ascending, groups } = check_password(p)
    if ( ascending && (groups.filter(g => g.length > 1).length > 0) ) {
      any_group++
    }
    if ( ascending && (groups.filter(g => g.length === 2).length > 0) ) {
      two_group++
    }
  }

  return { any_group, two_group }
}
