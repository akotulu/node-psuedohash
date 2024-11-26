/**
A simple hashing algorithm for integers.

Example output for the integers 1 through 10:

cJio3
EdRc6
qxAQ9
TGtEC
5ac2F
huKqI
KE3eL
wXmSO
YrVGR
BBE4U

Usage: see example.js

Ported to Javascript by Alec Gorge ( alecgorge.com ramblingwood.com )

Original by Kevin Burns Jr. at http://blog.kevburnsjr.com/php-unique-hash
*/

"use strict";
const chars62 = {0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, 10: 65,
  11: 66, 12: 67, 13: 68, 14: 69, 15: 70, 16: 71, 17: 72, 18: 73, 19: 74, 20: 75, 21: 76, 22: 77,
  23: 78, 24: 79, 25: 80, 26: 81, 27: 82, 28: 83, 29: 84, 30: 85, 31: 86, 32: 87, 33: 88, 34: 89,
  35: 90, 36: 97, 37: 98, 38: 99, 39: 100, 40: 101, 41: 102, 42: 103, 43: 104, 44: 105, 45: 106,
  46: 107, 47: 108, 48: 109, 49: 110, 50: 111, 51: 112, 52: 113, 53: 114, 54: 115, 55: 116, 56: 117,
  57: 118, 58: 119, 59: 120, 60: 121, 61: 122
}, golden_primes = {
  "1": BigInt("1"),
  "41": BigInt("59"),
  "2377": BigInt("1677"),
  "147299": BigInt("187507"),
  "9132313": BigInt("5952585"),
  "566201239": BigInt("643566407"),
  "35104476161": BigInt("22071637057"),
  "2176477521929": BigInt("294289236153"),
  "134941606358731": BigInt("88879354792675"),
  "8366379594239857": BigInt("7275288500431249"),
  "518715534842869223": BigInt("280042546585394647"),
  "32160363160257795059": BigInt("44574265781059650875"),
  "1993942515935983293581": BigInt("535548952060639952453"),
  "123624435988030964199509": BigInt("9884567988947108138237"),
  "7664715031257919780366721": BigInt("181314933833046994769537"),
  "475212331937991026382734707": BigInt("126879775084189015873169339"),
  "29463164580155443635729536113": BigInt("46760907966748916659717418129")
};

function base62(uint) {
  const key = [];
  while (uint > 0n) {
    let mod = uint - uint / 62n * 62n;
    key.push(String.fromCharCode(chars62[Number(mod)]));
    uint = uint / 62n;
  }
  return key.reverse().join("");
}

function unBase62(key) {
  const chars = key.split("").reverse();
  const chars62Keys = Object.keys(chars62);
  const chars62Values = Object.values(chars62);
  let uint = 0n;
  for (let i = 0; i < chars.length; i++) {
    let dec = chars62Keys[chars62Values.indexOf(chars[i].charCodeAt(0))];
    uint += BigInt(dec) * 62n ** BigInt(i);
  }
  return uint;
}

export function hash(num, len = 5) {
  const ceil = 62n ** BigInt(len);
  const prime = BigInt(Object.keys(golden_primes)[len]);
  const dec = BigInt(num) * prime % ceil;
  const hash2 = base62(dec);
  return hash2.padStart(len, "0");
}

export function unHash(hash2) {
  const len = BigInt(hash2.length);
  const ceil = 62n ** len;
  const mmi = Object.values(golden_primes)[Number(len)];
  const num = unBase62(hash2);
  return Number(BigInt.asUintN(64, num * mmi % ceil));
}
