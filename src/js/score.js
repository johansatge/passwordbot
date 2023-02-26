export function calculatePasswordScore(password) {
  const requirements = [{
    regex: /[a-z]/g,
    count: 4,
  }, {
    regex: /[A-Z]/g,
    count: 4,
  }, {
    regex: /[0-9]/g,
    count: 4,
  }, {
    regex: /[^a-zA-Z0-9]/g,
    count: 4,
  }]
  let score = 0
  for (let index = 0; index < requirements.length; index += 1) {
    const needed_count = requirements[index].count
    const regex = password.match(requirements[index].regex)
    const found_count = regex !== null ? regex.length : 0
    const percentage = (found_count * 100) / needed_count
    score += percentage < 100 ? percentage : 100
  }
  return Math.floor(score / 4)
}

/*
Calculation using weights

module.calculatePasswordScore = function(password)
{
var requirements = [
{
regex: /[a-z]/g,
weight: 3
},
{
regex: /[A-Z]/g,
weight: 4
},
{
regex: /[0-9]/g,
weight: 8
},
{
regex: /[^a-zA-Z0-9]/g,
weight: 10
}
];

var total_weight = 0;
for (var index = 0; index < requirements.length; index += 1)
{
var regex = requirements[index].regex;
var weight = requirements[index].weight;
var matches = password.match(regex);
total_weight += matches !== null ? matches.length * weight : 0;
}
return total_weight < 100 ? total_weight : 100;
};
*/
/*

Entropy calculation sample (http://codereview.stackexchange.com/questions/868/calculating-entropy-of-a-string)

module.calculatePasswordScore = function(password)
{
var map = {};
for (var index = 0; index < password.length; index += 1)
{
if (typeof map[password[index]] === 'undefined')
{
map[password[index]] = 0;
}
map[password[index]] += 1;
}
var result = 0;
for (index in map)
{
var frequency = map[index] / password.length;
result -= frequency * (Math.log(frequency) / Math.log(2));
}

console.log(result);

return 0;
};
*/