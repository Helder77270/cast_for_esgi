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
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityTokenBalancesLibrary = artifacts.require('SecurityTokenBalancesLibrary');
const IterableBalances = artifacts.require('IterableBalances');
const BasicTokenLibrary = artifacts.require('BasicTokenLibrary');
const OperatorManagerLibrary = artifacts.require('OperatorManagerLibrary');
const SettlementRepositoryLibrary = artifacts.require('SettlementRepositoryLibrary');
const SettlementWorkflowLibrary = artifacts.require('SettlementWorkflowLibrary');
module.exports = function (deployer) {
    return __awaiter(this, void 0, void 0, function* () {
        deployer.deploy(OperatorManagerLibrary);
        yield deployer.deploy(SettlementRepositoryLibrary);
        deployer.link(SettlementRepositoryLibrary, SettlementWorkflowLibrary);
        yield deployer.deploy(IterableBalances);
        deployer.link(IterableBalances, [SecurityTokenBalancesLibrary]);
        yield deployer.deploy(SecurityTokenBalancesLibrary);
        deployer.link(SecurityTokenBalancesLibrary, [
            BasicTokenLibrary,
            SettlementWorkflowLibrary,
        ]);
        yield deployer.deploy(SettlementWorkflowLibrary);
        yield deployer.deploy(BasicTokenLibrary);
    });
};
//# sourceMappingURL=2_deploy_libraries.js.map