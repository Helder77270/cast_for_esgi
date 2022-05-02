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
const constants = __importStar(require("../../constants"));
const builders_1 = require("../../utils/builders");
const initialSupply = constants.initialSupply;
const currentSupply = constants.currentSupply;
const isinCode = constants.isinCode;
const name = constants.name;
const symbol = constants.symbol;
const divisor = constants.divisor;
const denomination = constants.denomination;
const startDate = constants.startDate;
const initialMaturityDate = constants.initialMaturityDate;
const firstCouponDate = constants.firstCouponDate;
const isSoftBullet = constants.isSoftBullet;
const softBulletPeriodInMonths = constants.softBulletPeriodInMonths;
const couponFrequencyInMonths = constants.couponFrequencyInMonths;
const interestRateInBips = constants.interestRateInBips;
const callable = constants.callable;
contract('ForgeBond', (accounts) => {
    let forgeBond;
    context('once deployed', function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                });
            });
            it('initialSupply member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.initialSupply().then((supply) => {
                        assert.equal(supply.toNumber(), initialSupply, 'Initial supply does not match');
                    });
                });
            });
            it('currentSupply should be initialized with initialSupply', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.currentSupply().then((supply) => {
                        assert.equal(supply.toNumber(), currentSupply, 'Current supply does not match');
                    });
                });
            });
            it('isinCode member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.isinCode().then((value) => {
                        assert.equal(value, isinCode, 'Isin Code does not match');
                    });
                });
            });
            it('getType member should match Bond', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.getType().then((value) => {
                        assert.equal(value, 'Bond', 'getType does not match');
                    });
                });
            });
            it('name member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.name().then((value) => {
                        assert.equal(value, name, 'Name does not match');
                    });
                });
            });
            it('symbol member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.symbol().then((value) => {
                        assert.equal(value, symbol, 'Name does not match');
                    });
                });
            });
            it('denomination member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.denomination().then((value) => {
                        assert.equal(value.toNumber(), denomination, 'Denomination does not match');
                    });
                });
            });
            it('startDate member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.startDate().then((date) => {
                        assert.equal(date.toNumber(), startDate, 'Start date does not match');
                    });
                });
            });
            it('maturityDate member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.maturityDate().then((date) => {
                        assert.equal(date.toNumber(), initialMaturityDate, 'Maturity date does not match');
                    });
                });
            });
            it('currentMaturityDate member should be equal to maturityDate', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.currentMaturityDate().then((currentMaturityDate) => {
                        assert.equal(currentMaturityDate.toNumber(), initialMaturityDate, 'Current maturity date does not match');
                    });
                });
            });
            it('firstCouponDate member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.firstCouponDate().then((date) => {
                        assert.equal(date.toNumber(), firstCouponDate, 'First coupon date does not match');
                    });
                });
            });
            it('couponFrequencyInMonths member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.couponFrequencyInMonths().then((frequency) => {
                        assert.equal(frequency.toNumber(), couponFrequencyInMonths, 'First coupon date does not match');
                    });
                });
            });
            it('interestRateInBips member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.interestRateInBips().then((rate) => {
                        assert.equal(rate.toNumber(), interestRateInBips, 'Interest rate does not match');
                    });
                });
            });
            it('callable member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.callable().then((isCallable) => {
                        assert.equal(isCallable, callable, 'Callable does not match');
                    });
                });
            });
            it('divisor member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.divisor().then((div) => {
                        assert.equal(div.toNumber(), divisor, 'divisor does not match');
                    });
                });
            });
            it('isSoftBullet member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.isSoftBullet().then((softBullet) => {
                        assert.equal(softBullet, isSoftBullet, 'isSoftBullet does not match');
                    });
                });
            });
            it('softBulletPeriodInMonths member should match the one given to constructor', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.softBulletPeriodInMonths().then((period) => {
                        assert.equal(period.toNumber(), softBulletPeriodInMonths, 'softBulletPeriodInMonths does not match');
                    });
                });
            });
            it('Owner should match owner', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.owner().then((owner) => {
                        assert.equal(owner, constants.owner, 'Owner does not match');
                    });
                });
            });
            it('should have 10000 ForgeBond in the first account', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.getBalance(constants.owner).then((balance) => {
                        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
                    });
                });
            });
            it('should have 0 ForgeBond in the second account', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond.getBalance(accounts[1]).then((balance) => {
                        assert.equal(balance.valueOf(), 0, 'Second account has a balance');
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=forge-bond.js.map