(function(window, document)
{

    'use strict';

    var module = {};
    var dom = {};

    module.init = function()
    {
        _initDOM();
        _initEvents();
    };

    var _initDOM = function()
    {
        dom.input = document.querySelector('.js-input');
        dom.generateButton = document.querySelector('.js-generate');
        dom.options = document.querySelectorAll('.js-option');
        dom.strengthLength = document.querySelector('.js-strength-length');
        dom.strengthLowercase = document.querySelector('.js-strength-lowercase');
        dom.strengthUppercase = document.querySelector('.js-strength-uppercase');
        dom.strengthDigits = document.querySelector('.js-strength-digits');
        dom.strengthSpecialChars = document.querySelector('.js-strength-specialchars');
        dom.strengthScore = document.querySelector('.js-strength-score');
        dom.strengthScoreBar = document.querySelector('.js-strength-score-bar');
    };

    var _initEvents = function()
    {
        dom.input.addEventListener('change', _onUpdatePassword);
        dom.input.addEventListener('keyup', _onUpdatePassword);
        dom.generateButton.addEventListener('click', _onGeneratePassword);
    };

    var _onUpdatePassword = function()
    {
        var data = Generator.getPasswordInformations(dom.input.value);
        var score = Score.calculatePasswordScore(dom.input.value);
        dom.strengthLength.innerHTML = data.length;
        dom.strengthLowercase.innerHTML = data.lowercase;
        dom.strengthUppercase.innerHTML = data.uppercase;
        dom.strengthDigits.innerHTML = data.digits;
        dom.strengthSpecialChars.innerHTML = data.special;
        dom.strengthScore.innerHTML = score;
        dom.strengthScoreBar.style.width = score + '%';
    };

    var _onGeneratePassword = function()
    {
        var options = _parseOptions();
        dom.input.value = Generator.generatePassword(options);
        dom.input.dispatchEvent(new Event('change'));
        dom.input.select();
    };

    var _parseOptions = function()
    {
        var options = {};
        for (var index = 0; index < dom.options.length; index += 1)
        {
            var input = dom.options[index];
            options[input.getAttribute('name')] = input.getAttribute('type') === 'checkbox' ? input.checked : input.value;
        }
        return options;
    };

    window.UI = module;

})(window, document);