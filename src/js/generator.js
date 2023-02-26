export function generatePassword(options) {
  let charset = ''
  if (options.include_lowercase) {
    charset += 'abcdefghijkmonpqrstuvwxyz' + (!options.avoid_similar ? 'l' : '')
  }
  if (options.include_uppercase) {
    charset += 'ABCDEFGHJKLMNPQRTUVWXYZ' + (!options.avoid_similar ? 'OSI' : '')
  }
  if (options.include_digits) {
    charset += '2346789' + (!options.avoid_similar ? '015' : '')
  }
  if (options.include_special) {
    charset += '#@&"\'(!)°-_^*$%+=:/.;,?<>'
  }
  let password = ''
  if (charset.length > 0) {
    for (let char = 0; char < options.length; char += 1) {
      password += charset[getRandomPosition(charset.length - 1)]
    }
  }
  return password
}

export function getPasswordInformations(password) {
  return {
    length: password.length,
    lowercase: getCharactersCount(/[a-z]/g, password),
    uppercase: getCharactersCount(/[A-Z]/g, password),
    digits: getCharactersCount(/[0-9]/g, password),
    special: getCharactersCount(/[^a-zA-Z0-9]/g, password),
  }
}

function getCharactersCount(regex, subject) {
  const matches = subject.match(regex)
  return matches !== null ? matches.length : 0
}

function getRandomPosition(max) {
  const maxRandom = 256 * 256
  const byteArray = new Uint16Array(1)
  window.crypto.getRandomValues(byteArray)
  return Math.floor((byteArray[0] * (max - 1)) / maxRandom)
}