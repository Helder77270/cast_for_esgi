"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../tools/utils");
const minimist_1 = __importDefault(require("minimist"));
const ForgeInstrumentRegistry = artifacts.require('ForgeInstrumentRegistry');
module.exports = function (deployer, network, accounts) {
    var _a;
    const argv = (0, minimist_1.default)(process.argv.slice(2));
    const networkFolder = (_a = argv['network-folder']) !== null && _a !== void 0 ? _a : process.env['NETWORK_FOLDER'];
    if (typeof networkFolder !== 'string') {
        console.error('Network folder argument must be set to deploy Registry');
        return;
    }
    const registrarAddress = (0, utils_1.getRegistrarAddressForNetwork)(networkFolder);
    console.log(`Deploying instrument registry for registrarAddress[${registrarAddress}]`);
    return deployer.deploy(ForgeInstrumentRegistry, registrarAddress);
};
//# sourceMappingURL=4_deploy_forgeinstrumentregistry.js.map