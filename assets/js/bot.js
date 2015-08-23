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
        dom.copyButton = document.querySelector('.js-copy');
        dom.options = document.querySelectorAll('.js-option');

        dom.strengthLength = document.querySelector('.js-strength-length');
        dom.strengthLowercase = document.querySelector('.js-strength-lowercase');
        dom.strengthUppercase = document.querySelector('.js-strength-uppercase');
        dom.strengthDigits = document.querySelector('.js-strength-digits');
        dom.strengthSpecialChars = document.querySelector('.js-strength-specialchars');
    };

    var _initEvents = function()
    {
        dom.input.addEventListener('change', _onUpdatePassword);
        dom.input.addEventListener('keyup', _onUpdatePassword);
        dom.generateButton.addEventListener('click', _onGeneratePassword);
        dom.copyButton.addEventListener('click', _onCopyPassword);
    };

    var _onUpdatePassword = function()
    {
        var password = dom.input.value;

        dom.strengthLength.innerHTML = password.length;
        dom.strengthLowercase.innerHTML = _getMatchesCount(/[a-z]/g, password);
        dom.strengthUppercase.innerHTML = _getMatchesCount(/[A-Z]/g, password);
        dom.strengthDigits.innerHTML = _getMatchesCount(/[0-9]/g, password);
        dom.strengthSpecialChars.innerHTML = _getMatchesCount(/[^a-zA-Z0-9]/g, password);


        console.log(password);


    };

    var _onGeneratePassword = function(evt)
    {
        console.log('@todo generate');
    };

    var _onCopyPassword = function(evt)
    {
        console.log('@todo copy');
    };

    var _getMatchesCount = function(regex, subject)
    {
        var matches = subject.match(regex);
        return matches !== null ? matches.length : 0;
    };

    window.Bot = module;

})(window, document);