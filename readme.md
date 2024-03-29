![PasswordBot](logo.png)

Simple password checker & generator - [passwordbotapp.com](http://passwordbotapp.com).

---

* [Why](#why)
* [Score calculation](#score-calculation)
* [About similar characters](#about-similar-characters)
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
* Understandable [generator function](assets/js/src/generator.js)

## Score calculation

The score calculation is based on my own preferences: a 16-chars password made of:

* 4 lowercase letters
* 4 uppercase letters
* 4 digits
* 4 special characters

Each character has the same weight.

It is a basic way to calculate the password strength, but for now there are no unquestioned way to do so - [entropy calculation](https://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength) is one of the most discussed methods, but it is [not reliable in all cases](https://diogomonica.com/posts/password-security-why-the-horse-battery-staple-is-not-correct/), as it does not take the user behavior into account.

## About similar characters

The *avoid similar characters* option, when enabled, removes the following when generating a password:

* `l`, `I` and `1` (lowercase *L*, uppercase *i* and digit *one*)
* `O` and `0` (uppercase *o* and digit *zero*)
* `S` and `5` (uppercase *s* and digit *five*)

## Development

Checkout the project, then run:

```bash
$ npm install
```

and:

```bash
$ npm run watch
```

To build the projet in `dist/` when a change occurs.

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| `1.3.2` | 2022-02-26 | Revamp build & move to ES6 |
| `1.3.1` | 2016-04-25 | Removes dependencies to CDNs |
| `1.3.0` | 2016-02-17 | Adds *Avoid similar characters* option |
| `1.2.0` | 2015-12-22 | Responsive behavior |
| `1.1.1` | 2015-08-26 | Fix cookie duration |
| `1.1.0` | 2015-08-26 | Allows the user to save his options |
| `1.0.0` | 2015-08-23 | Initial version |

## License

This project is released under the [MIT License](license.md).

## Credits

* [cookie.js](https://github.com/js-coder/cookie.js)
* [chokidar](https://github.com/kimmobrunfeldt/chokidar-cli)
* [ejs](http://ejs.co/)
* [Font Awesome](http://fontawesome.io/)
* [hasha](https://github.com/sindresorhus/hasha)
* [html-minifier](https://github.com/kangax/html-minifier)
* [ncp](https://github.com/AvianFlu/ncp)
* [node-sass](https://github.com/sass/node-sass)
* [Open Sans](http://www.opensans.com/)
* [rimraf](https://github.com/isaacs/rimraf)
* [uglify-js](https://github.com/mishoo/UglifyJS2)
