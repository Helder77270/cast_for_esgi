"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../test/constants");
const BasicTokenLibrary = artifacts.require('BasicTokenLibrary');
const SecurityTokenBalancesLibrary = artifacts.require('SecurityTokenBalancesLibrary');
const SettlementWorkflowLibrary = artifacts.require('SettlementWorkflowLibrary');
const OperatorManagerLibrary = artifacts.require('OperatorManagerLibrary');
const SettlementRepositoryLibrary = artifacts.require('SettlementRepositoryLibrary');
const IterableBalances = artifacts.require('IterableBalances');
const ForgeBond = artifacts.require('ForgeBond');
const now = Math.floor(Date.now() / 1000);
const oneYearInSeconds = 365 * 24 * 3600;
const registrar = '0xf8e96a20ebfdf6daaa9d8a78b8a99f37747fb623';
const settler = '0x43eac518afd45580b5c966994013776b5c1e80f2';
module.exports = function (deployer, networks) {
    if (networks !== 'test') {
        console.log(`Not deploying instance of ForgeBond as we're not running tests`);
        return;
    }
    const owner = '0x067a19e0da942f7f297c2efab53fd0b1c0f8d70f';
    const bondParameters = {
        initialSupply: 10000,
        currentSupply: 10000,
        isinCode: 'FR0003500008',
        name: 'Test token',
        symbol: 'TST',
        denomination: 10000000,
        divisor: 100,
        startDate: now,
        initialMaturityDate: now + oneYearInSeconds * 10,
        firstCouponDate: now + oneYearInSeconds,
        couponFrequencyInMonths: 12,
        interestRateInBips: 36,
        callable: true,
        isSoftBullet: true,
        softBulletPeriodInMonths: oneYearInSeconds,
        currency: constants_1.Currency.EUR,
        registrar,
        settler,
        owner,
    };
    deployer.link(IterableBalances, ForgeBond);
    deployer.link(SecurityTokenBalancesLibrary, ForgeBond);
    deployer.link(BasicTokenLibrary, ForgeBond);
    deployer.link(OperatorManagerLibrary, ForgeBond);
    deployer.link(SettlementRepositoryLibrary, ForgeBond);
    deployer.link(SettlementWorkflowLibrary, ForgeBond);
    deployer.deploy(ForgeBond, bondParameters);
};
//# sourceMappingURL=3_deploy_forgebond.js.map