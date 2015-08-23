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
    };

    var _initEvents = function()
    {
        dom.input.addEventListener('change', _onUpdatePassword);
        dom.input.addEventListener('keyup', _onUpdatePassword);
        dom.generateButton.addEventListener('click', _onGeneratePassword);
        dom.copyButton.addEventListener('click', _onCopyPassword);
    };

    var _onUpdatePassword = function(evt)
    {
        console.log('@todo update strength checker');
    };

    var _onGeneratePassword = function(evt)
    {
        console.log('@todo generate');
    };

    var _onCopyPassword = function(evt)
    {
        console.log('@todo copy');
    };

    window.Bot = module;

})(window, document);