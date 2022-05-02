"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../tools/utils");
const minimist_1 = __importDefault(require("minimist"));
const BasicTokenLibrary = artifacts.require('BasicTokenLibrary');
const SecurityTokenBalancesLibrary = artifacts.require('SecurityTokenBalancesLibrary');
const ForgeInstrumentRegistry = artifacts.require('ForgeInstrumentRegistry');
const ForgeBondFactory = artifacts.require('ForgeBondFactory');
const OperatorManagerLibrary = artifacts.require('OperatorManagerLibrary');
const SettlementRepositoryLibrary = artifacts.require('SettlementRepositoryLibrary');
const SettlementWorkflowLibrary = artifacts.require('SettlementWorkflowLibrary');
const IterableBalances = artifacts.require('IterableBalances');
module.exports = function (deployer, network, accounts) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const argv = (0, minimist_1.default)(process.argv.slice(2));
        const networkFolder = (_a = argv['network-folder']) !== null && _a !== void 0 ? _a : process.env['NETWORK_FOLDER'];
        deployer.link(IterableBalances, ForgeBondFactory);
        deployer.link(SecurityTokenBalancesLibrary, ForgeBondFactory);
        deployer.link(BasicTokenLibrary, ForgeBondFactory);
        deployer.link(OperatorManagerLibrary, ForgeBondFactory);
        deployer.link(SettlementRepositoryLibrary, ForgeBondFactory);
        deployer.link(SettlementRepositoryLibrary, ForgeBondFactory);
        deployer.link(SettlementWorkflowLibrary, ForgeBondFactory);
        if (typeof networkFolder !== 'string') {
            console.error('Network folder argument must be set to deploy Bond factory');
            return;
        }
        const registrarAddress = (0, utils_1.getRegistrarAddressForNetwork)(networkFolder);
        const instrumentRegistry = yield ForgeInstrumentRegistry.deployed();
        console.log(`Deploying bond factory for registrarAddress[${registrarAddress}] instrumentRegistryAddress[${instrumentRegistry.address}]`);
        yield deployer.deploy(ForgeBondFactory, registrarAddress);
        const factory = yield ForgeBondFactory.deployed();
        console.log(`Registering factory[${factory.address}] on instrument registry[${instrumentRegistry.address}]`);
        yield instrumentRegistry.authorizeFactory('Bond', factory.address, {
            from: registrarAddress,
        });
    });
};
//# sourceMappingURL=5_deploy_forgebondfactory.js.map