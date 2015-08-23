(function(window)
{

    'use strict';

    var module = {};

    module.generatePassword = function(options)
    {
        var charset = '';
        if (options.include_lowercase)
        {
            charset += 'abcdefghijklmonpqrstuvwxyz';
        }
        if (options.include_uppercase)
        {
            charset += 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
        }
        if (options.include_digits)
        {
            charset += '0123456789';
        }
        if (options.include_special)
        {
            charset += '#@&"\'(!)°-_^*$%+=:/.;,?<>';
        }
        var password = '';
        if (charset.length > 0)
        {
            for (var char = 0; char < options.length; char += 1)
            {
                password += charset[_getRandomPosition(charset.length - 1)];
            }
        }
        return password;
    };

    module.getPasswordInformations = function(password)
    {
        return {
            length: password.length,
            lowercase: _getCharactersCount(/[a-z]/g, password),
            uppercase: _getCharactersCount(/[A-Z]/g, password),
            digits: _getCharactersCount(/[0-9]/g, password),
            special: _getCharactersCount(/[^a-zA-Z0-9]/g, password)
        };
    };

    var _getCharactersCount = function(regex, subject)
    {
        var matches = subject.match(regex);
        return matches !== null ? matches.length : 0;
    };

    var _getRandomPosition = function(max)
    {
        var random;
        var max_random = 256 * 256;
        if (window.crypto && window.crypto.getRandomValues)
        {
            var byte_array = new Uint16Array(1);
            window.crypto.getRandomValues(byte_array);
            random = byte_array[0];
        }
        else
        {
            random = Math.floor(Math.random() * (max_random - 1));
        }
        return Math.floor((random * (max - 1)) / max_random);
    };

    window.Generator = module;

})(window);