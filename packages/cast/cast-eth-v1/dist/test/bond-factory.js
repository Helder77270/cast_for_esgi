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
const ForgeBondFactory = artifacts.require('ForgeBondFactory');
const ForgeInstrumentRegistry = artifacts.require('ForgeInstrumentRegistry');
const ForgeBond = artifacts.require('ForgeBond');
const constants = __importStar(require("./constants.js"));
const initialSupply = constants.initialSupply;
const currentSupply = constants.currentSupply;
const isinCode = constants.isinCode;
const name = constants.name;
const symbol = constants.symbol;
const divisor = constants.divisor;
const denomination = constants.denomination;
const startDate = constants.startDate;
const initialMaturityDate = constants.initialMaturityDate;
const interestRateInBips = constants.interestRateInBips;
const callable = constants.callable;
const isSoftBullet = constants.isSoftBullet;
const softBulletPeriodInMonths = 24;
const firstCouponDate = constants.firstCouponDate;
const couponFrequencyInMonths = constants.couponFrequencyInMonths;
const registrar = constants.registrar;
const settler = constants.settler;
const owner = constants.owner;
const bondParameters = {
    initialSupply,
    currentSupply,
    isinCode,
    name,
    symbol,
    denomination,
    divisor,
    startDate,
    initialMaturityDate,
    firstCouponDate,
    couponFrequencyInMonths,
    interestRateInBips,
    callable,
    isSoftBullet,
    softBulletPeriodInMonths,
    currency: constants.currency,
    registrar,
    settler,
    owner,
};
const bondParametersWithDifferentName = {
    initialSupply,
    currentSupply,
    isinCode,
    name: 'different name',
    symbol,
    denomination,
    divisor,
    startDate,
    initialMaturityDate,
    firstCouponDate,
    couponFrequencyInMonths,
    interestRateInBips,
    callable,
    isSoftBullet,
    softBulletPeriodInMonths,
    currency: constants.currency,
    registrar,
    settler,
    owner,
};
const bondParametersWithDifferentNameAndIsin = {
    initialSupply,
    currentSupply,
    isinCode: 'different isin',
    name: 'different name',
    symbol,
    denomination,
    divisor,
    startDate,
    initialMaturityDate,
    firstCouponDate,
    couponFrequencyInMonths,
    interestRateInBips,
    callable,
    isSoftBullet,
    softBulletPeriodInMonths,
    currency: constants.currency,
    registrar,
    settler,
    owner,
};
function assertEvent(response, eventName, index) {
    assert.equal(response.logs[index].event, eventName, `${eventName} event should fire`);
}
function assertEventArgs(response, eventIndex, argName, expectedValue) {
    assert.equal(response.logs[eventIndex].args[argName], expectedValue, `${argName} expected to be equal to ${expectedValue}`);
}
let forgeBondFactory;
let forgeBond;
let forgeInstrumentRegistry;
function createForgeBondFactory() {
    return __awaiter(this, void 0, void 0, function* () {
        forgeInstrumentRegistry = yield ForgeInstrumentRegistry.new(registrar);
        forgeBondFactory = yield ForgeBondFactory.new(registrar);
    });
}
function authorizeFactory() {
    return __awaiter(this, void 0, void 0, function* () {
        yield forgeInstrumentRegistry.authorizeFactory('Bond', forgeBondFactory.address, {
            from: registrar,
        });
    });
}
contract('ForgeBondFactory', () => {
    context('isFactoryAuthorized', () => __awaiter(void 0, void 0, void 0, function* () {
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield createForgeBondFactory();
            });
        });
        it('should isFactoryAuthorized registry method return true', () => __awaiter(void 0, void 0, void 0, function* () {
            const res1 = yield forgeInstrumentRegistry.isFactoryAuthorized('0x0000000000000000000000000000000000000000');
            expect(res1).to.be.eql(false);
            yield authorizeFactory();
            const res = yield forgeInstrumentRegistry.isFactoryAuthorized(forgeBondFactory.address);
            expect(res).to.be.eql(true);
        }));
    }));
    context('getInstrumentRegistry', () => __awaiter(void 0, void 0, void 0, function* () {
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield createForgeBondFactory();
                yield authorizeFactory();
            });
        });
    }));
    context('createForgeBond', function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield createForgeBondFactory();
                    yield authorizeFactory();
                });
            });
            it('should return address of created contract', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBondFactory.createForgeBond
                        .call(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .then((contractAddress) => {
                        assert.notEqual(contractAddress, '0', 'Returned address should not be 0');
                    });
                });
            });
            it('should return address of valid ForgeBond instance', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let returnedAddress;
                    yield forgeBondFactory.createForgeBond
                        .call(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .then((contractAddress) => {
                        returnedAddress = contractAddress;
                    });
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    });
                    forgeBond = yield ForgeBond.at(returnedAddress);
                    forgeBond
                        .initialSupply()
                        .then((supply) => supply &&
                        assert.equal(supply.toNumber(), initialSupply, 'Initial supply does not match'))
                        .catch((err) => err && assert.fail('Call to initialSupply() should not fail'));
                    forgeBond
                        .owner()
                        .then((address) => assert.equal(address, constants.owner, 'Owner address does not match'))
                        .catch((err) => err && assert.fail('Call to owner() should not fail'));
                    forgeBond
                        .maturityDate()
                        .then((date) => date &&
                        assert.equal(date.toNumber(), initialMaturityDate, 'Maturity date does not match'))
                        .catch((err) => err && assert.fail('Call to maturityDate() should not fail'));
                    forgeBond
                        .callable()
                        .then((isCallable) => assert.equal(isCallable, callable, 'Maturity date does not match'))
                        .catch((err) => err && assert.fail('Call to callable() should not fail'));
                });
            });
            it('should emit InstrumentListed event with the right parameters', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let returnedAddress;
                    yield forgeBondFactory.createForgeBond
                        .call(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .then((contractAddress) => {
                        returnedAddress = contractAddress;
                    });
                    yield forgeBondFactory
                        .createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .then((response) => {
                        assertEvent(response, 'InstrumentListed', 2);
                        assertEventArgs(response, 2, '_instrumentAddress', returnedAddress);
                    });
                });
            });
            it('should fail if a contract with the same name already exists', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    });
                    let err;
                    yield forgeBondFactory
                        .createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .catch((error) => {
                        err = error;
                    });
                    assert.equal(err.reason, 'Bond with this name already exists', 'Wrong error message');
                });
            });
            it('should fail if a contract with the same isin code already exists', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    });
                    let err;
                    yield forgeBondFactory
                        .createForgeBond(forgeInstrumentRegistry.address, bondParametersWithDifferentName, {
                        from: constants.registrar,
                    })
                        .catch((error) => {
                        err = error;
                    });
                    assert.equal(err.reason, 'Bond with this isin already exists', 'Wrong error message');
                });
            });
            it('should not fail if no contract exists with same name or isin', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    });
                    let err;
                    yield forgeBondFactory
                        .createForgeBond(forgeInstrumentRegistry.address, bondParametersWithDifferentNameAndIsin, {
                        from: constants.registrar,
                    })
                        .catch((error) => {
                        err = error;
                    });
                    assert.equal(err, undefined, 'Should not fail');
                });
            });
        });
    });
    context('just to test instrument registry getBondByName', function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield createForgeBondFactory();
                    yield authorizeFactory();
                });
            });
            it('should return 0 if no contract with this name', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeInstrumentRegistry
                        .getInstrumentByName(name)
                        .then((contractAddress) => {
                        assert.equal(contractAddress, constants.ZERO_ADDRESS, 'Returned address should be 0');
                    });
                });
            });
            it('should return address of the corresponding contract', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let returnedAddress;
                    yield forgeBondFactory.createForgeBond
                        .call(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .then((contractAddress) => {
                        returnedAddress = contractAddress;
                    });
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    });
                    yield forgeInstrumentRegistry
                        .getInstrumentByName(name)
                        .then((contractAddress) => {
                        assert.equal(contractAddress, returnedAddress, 'Wrong returned address');
                    });
                });
            });
        });
    });
    context('just to test instrument registry getBondByIsinCode', function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield createForgeBondFactory();
                    yield authorizeFactory();
                });
            });
            it('should return 0 if no contract with this isin code', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeInstrumentRegistry
                        .getInstrumentByIsinCode(isinCode)
                        .then((contractAddress) => {
                        assert.equal(contractAddress, constants.ZERO_ADDRESS, 'Returned address should be 0');
                    });
                });
            });
            it('should return address of the corresponding contract', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let returnedAddress;
                    yield forgeBondFactory.createForgeBond
                        .call(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .then((contractAddress) => {
                        returnedAddress = contractAddress;
                    });
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    });
                    yield forgeInstrumentRegistry
                        .getInstrumentByIsinCode(isinCode)
                        .then((contractAddress) => {
                        assert.equal(contractAddress, returnedAddress, 'Wrong returned address');
                    });
                });
            });
        });
    });
    context('just to test instrument registry getAllBonds', function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield createForgeBondFactory();
                    yield authorizeFactory();
                });
            });
            it('should return all tokens addresses', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const returnedAddresses = [];
                    yield forgeBondFactory.createForgeBond
                        .call(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    })
                        .then((contractAddress) => {
                        returnedAddresses.push(contractAddress);
                    });
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParameters, {
                        from: constants.registrar,
                    });
                    yield forgeBondFactory.createForgeBond
                        .call(forgeInstrumentRegistry.address, bondParametersWithDifferentNameAndIsin, {
                        from: constants.registrar,
                    })
                        .then((contractAddress) => {
                        returnedAddresses.push(contractAddress);
                    });
                    yield forgeBondFactory.createForgeBond(forgeInstrumentRegistry.address, bondParametersWithDifferentNameAndIsin, {
                        from: constants.registrar,
                    });
                    assert.equal(returnedAddresses.length, 2, 'Wrong number of addresses');
                    yield forgeInstrumentRegistry
                        .getAllInstruments()
                        .then((addresses) => {
                        assert.deepEqual(addresses, returnedAddresses, 'Wrong returned addresses');
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=bond-factory.js.map