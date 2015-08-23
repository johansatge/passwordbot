(function(window)
{

    'use strict';

    var module = {};

    module.calculatePasswordScore = function(password)
    {

        // @todo calculate score

        return Math.floor(Math.random() * 99);
    };

    window.Score = module;

})(window);