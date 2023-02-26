import { calculatePasswordScore } from './score.js'
import {
  generatePassword,
  getPasswordInformations,
} from './generator.js'

const dom = {}

window.UI = {
  init: () => {
    initDOM()
    initEvents()
    initOptions()
    onGeneratePassword()
  },
}

function initDOM() {
  dom.input = document.querySelector('.js-input')
  dom.generateButton = document.querySelector('.js-generate')
  dom.saveButton = document.querySelector('.js-save')
  dom.options = document.querySelectorAll('.js-option')
  dom.saveMessage = document.querySelector('.js-save-message')
  dom.strengthLength = document.querySelector('.js-strength-length')
  dom.strengthLowercase = document.querySelector('.js-strength-lowercase')
  dom.strengthUppercase = document.querySelector('.js-strength-uppercase')
  dom.strengthDigits = document.querySelector('.js-strength-digits')
  dom.strengthSpecialChars = document.querySelector('.js-strength-specialchars')
  dom.strengthScore = document.querySelector('.js-strength-score')
  dom.strengthScoreBar = document.querySelector('.js-strength-score-bar')
}

function initEvents() {
  dom.input.addEventListener('change', onUpdatePassword)
  dom.input.addEventListener('keyup', onUpdatePassword)
  dom.generateButton.addEventListener('click', onGeneratePassword)
}

function initOptions() {
  let loaded = false
  for (let index = 0; index < dom.options.length; index += 1) {
    const input = dom.options[index]
    const userValue = localStorage.getItem('pwb_' + input.getAttribute('name'))
    if (userValue !== null) {
      if (input.getAttribute('type') === 'checkbox') {
        input.checked = userValue === '1'
      } else {
        input.value = userValue
      }
      loaded = true
    }
  }
  if (loaded) {
    dom.saveMessage.innerHTML = dom.saveMessage.getAttribute('data-msg-load')
  }
  dom.saveButton.addEventListener('click', onSaveOptions)
}

function onUpdatePassword() {
  const data = getPasswordInformations(dom.input.value)
  const score = calculatePasswordScore(dom.input.value)
  dom.strengthLength.innerHTML = data.length
  dom.strengthLowercase.innerHTML = data.lowercase
  dom.strengthUppercase.innerHTML = data.uppercase
  dom.strengthDigits.innerHTML = data.digits
  dom.strengthSpecialChars.innerHTML = data.special
  dom.strengthScore.innerHTML = score
  dom.strengthScoreBar.style.width = score + '%'
}

function onGeneratePassword() {
  dom.input.value = generatePassword(parseOptions())
  dom.input.dispatchEvent(new Event('change'))
  dom.input.select()
}

function onSaveOptions() {
  const options = parseOptions()
  for (let option in options) {
    localStorage.setItem('pwb_' + option, options[option])
  }
  dom.saveMessage.innerHTML = dom.saveMessage.getAttribute('data-msg-save')
}

function parseOptions() {
  const options = {}
  for (let index = 0; index < dom.options.length; index += 1) {
    const input = dom.options[index]
    const val = input.getAttribute('type') === 'checkbox' ? (input.checked ? 1 : 0) : input.value
    options[input.getAttribute('name')] = val
  }
  return options
}
