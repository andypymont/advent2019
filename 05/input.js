function fetch_puzzle_input() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'input.txt')
    xhr.onload = function() {
      if ( this.status >= 200 && this.status < 300 ) {
        resolve(xhr.responseText)
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
