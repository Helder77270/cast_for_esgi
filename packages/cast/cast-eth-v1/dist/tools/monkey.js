"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monkeyFromType = exports.monkeyBool = exports.monkeyString = exports.monkeyAddress = exports.monkeyUint = void 0;
const constants = __importStar(require("../test/constants.js"));
const monkeyUint = (max = 0xff) => Math.ceil(Math.random() * max);
exports.monkeyUint = monkeyUint;
const monkeyAddress = () => constants.registrar;
exports.monkeyAddress = monkeyAddress;
const monkeyString = () => Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, (0, exports.monkeyUint)(5) + 1);
exports.monkeyString = monkeyString;
const monkeyBool = () => (Math.random() >= 0.5 ? 0 : 1);
exports.monkeyBool = monkeyBool;
const monkeyFromType = (type) => {
    switch (type) {
        case 'uint':
            return (0, exports.monkeyUint)();
        case 'address':
            return (0, exports.monkeyAddress)();
        case 'string':
            return (0, exports.monkeyString)();
        case 'bool':
            return (0, exports.monkeyBool)();
    }
};
exports.monkeyFromType = monkeyFromType;
//# sourceMappingURL=monkey.js.map