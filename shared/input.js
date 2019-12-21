function fetch_puzzle_input() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'input.txt')
    xhr.onload = function() {
      if ( this.status >= 200 && this.status < 300 ) {
        resolve(clean_string(xhr.responseText))
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        })
      }
    }
    xhr.onerror = function() {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      })
    }
    xhr.send()
  })
}

function clean_string(str) {
  str = str.replace(/(\r)/gm, '')
  if ( str[str.length-1] === '\n' ) {
    str = str.substring(0, str.length-1)
  }
  return str
}

function fetch_puzzle_input_lines() {
  return fetch_puzzle_input().then(function(input) {
    return input.split('\n')
  })
}
