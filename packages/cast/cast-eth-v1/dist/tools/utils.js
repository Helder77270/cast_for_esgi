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
exports.getRegistrarAddressForNetwork = exports.getEthAddress = void 0;
const fs = __importStar(require("fs"));
const ethereumjs_util_1 = require("ethereumjs-util");
function getEthAddress(privateKey) {
    return (0, ethereumjs_util_1.addHexPrefix)((0, ethereumjs_util_1.bufferToHex)((0, ethereumjs_util_1.privateToAddress)((0, ethereumjs_util_1.toBuffer)(privateKey))));
}
exports.getEthAddress = getEthAddress;
function getRegistrarAddressForNetwork(networkFolder) {
    const keyFilePath = `${networkFolder}/ethereum/keys.json`;
    let keyFile;
    try {
        keyFile = fs.readFileSync(keyFilePath, 'utf8');
    }
    catch (e) {
        throw new Error(`Could not read keys.json file for network file ${networkFolder}: ${e.toString()}`);
    }
    let keys;
    try {
        keys = JSON.parse(keyFile);
    }
    catch (e) {
        throw new Error(`Could not parse keys.json file for network file ${networkFolder}: ${e.toString()}`);
    }
    if ((keys === null || keys === void 0 ? void 0 : keys.REGISTRAR) === null || (keys === null || keys === void 0 ? void 0 : keys.REGISTRAR) === undefined) {
        throw new Error(`Could not find registrar private key in keys.json for network file ${networkFolder}`);
    }
    if (typeof (keys === null || keys === void 0 ? void 0 : keys.REGISTRAR) !== 'string') {
        throw new Error(`Invalid registrar address in keys.json. Value should be a string`);
    }
    return getEthAddress(keys === null || keys === void 0 ? void 0 : keys.REGISTRAR);
}
exports.getRegistrarAddressForNetwork = getRegistrarAddressForNetwork;
//# sourceMappingURL=utils.js.map