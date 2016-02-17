![PasswordBot](logo.png)

Simple password checker & generator - [passwordbotapp.com](http://passwordbotapp.com).

---

* [Why](#why)
* [Score calculation](#score-calculation)
* [Development](#development)
* [Changelog](#changelog)
* [License](#license)
* [Credits](#credits)

## Why

I wanted to make an online password generator, which would match those needs:

* Easy to use
* Minimalistic UI
* No tracking at all
* No ads
* Understandable [generator function](assets/js/generator.js)

## Score calculation

The score calculation is based on my own preferences: a 16-chars password made of:

* 4 lowercase letters
* 4 uppercase letters
* 4 digits
* 4 special characters

Each character has the same weight.

It is a basic way to calculate the password strength, but for now there are no unquestioned way to do so - [entropy calculation](https://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength) is one of the most discussed methods, but it is [not reliable in all cases](https://diogomonica.com/posts/password-security-why-the-horse-battery-staple-is-not-correct/), as it does not take the user behavior into account.

# Development

Checkout the project, then run:

```bash
$ npm install
```

and:

```bash
$ npm run watch:all
```

To minify the JS files and compile the SASS styles when a change occurs.

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| `1.2.0` | December 22, 2015 | Responsive behavior |
| `1.1.1` | August 26, 2015 | Fix cookie duration |
| `1.1.0` | August 26, 2015 | Allows the user to save his options |
| `1.0.0` | August 23, 2015 | Initial version |

## License

This project is released under the [MIT License](license).

## Credits

* [cookie.js](https://github.com/js-coder/cookie.js)
* [chokidar](https://github.com/kimmobrunfeldt/chokidar-cli)
* [node-sass](https://github.com/sass/node-sass)
* [npm-run-all](https://github.com/mysticatea/npm-run-all)
* [uglify-js](https://github.com/mishoo/UglifyJS2)