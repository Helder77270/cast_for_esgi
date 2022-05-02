"use strict";
exports.__esModule = true;
var auth_1 = require("../../dist/auth");
var jws_1 = require("../../dist/jws");
var sk = '0x459975a29bf64c03a92388f8ae50bdc7eb7df4ff5ede58c58c626fa9be67a76a';
var pk = '0x58d9e3ac6ea256fa907db156e3a129f6b1228fc2a01748f2027706a79df5c90ca28f196d92c7417b90f520fef5f5c81d59ce745dfecce0e89b56d757f46f14dd';
console.log(auth_1.signJws(jws_1.generateNewJws(pk, 'to.who.it.may.concern', 'ETH'), sk));
