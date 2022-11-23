const myName = 'Dmitry';
let myAge = 35;
let myScores = 7777777n;
const haveKid = true;
let prisonBreaks = null;
let reasonsToDie = undefined;
let myPerson = {
  name: 'Dmitry',
  age: 35,
  child: 'Yaroslav',
  musicBand: 'Genoex'
};
let myMusic = Symbol('genoex');

console.log(Number(myName), String(myName), Boolean(myName));
console.log(Number(myAge), String(myAge), Boolean(myAge));
console.log(Number(myScores), String(myScores), Boolean(myScores));
console.log(Number(haveKid), String(haveKid), Boolean(haveKid));
console.log(Number(prisonBreaks), String(prisonBreaks), Boolean(prisonBreaks));
console.log(Number(reasonsToDie), String(reasonsToDie), Boolean(reasonsToDie));
console.log(Number(myPerson), String(myPerson), Boolean(myPerson));
console.log(Number(myMusic), String(myMusic), Boolean(myMusic));
