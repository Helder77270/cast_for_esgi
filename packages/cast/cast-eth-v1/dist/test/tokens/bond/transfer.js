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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants = __importStar(require("../../constants"));
const events_1 = require("../../utils/events");
const builders_1 = require("../../utils/builders");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const settlementTransactionId1 = '100000000000000000000000000000000000001';
const settlementTransactionId2 = '200000000000000000000000000000000000002';
const settlementTransactionId3 = '300000000000000000000000000000000000003';
const TOKEN_LOCKED = 2;
const CASH_RECEIVED = 3;
const CASH_SENT = 4;
const CANCELED = 5;
const SUBSCRIPTION = 0x1;
const operationId = 0xdab;
const txHash = '0xABBA';
const fromRegistrarTransactionDetails = { from: constants.registrar };
const fromSettlerTransactionDetails = { from: constants.settler };
contract('ForgeBond', (accounts) => {
    let forgeBond;
    context('Transfer - initiateSubscription ', function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                });
            });
            it('should succeed when issuer balance is lower than the transaction quantity', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const settlementTransaction1 = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor1Address,
                        deliveryQuantity: 1000,
                        txHash,
                    };
                    const settlementTransaction2 = {
                        txId: settlementTransactionId2,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: 23,
                        txHash,
                    };
                    yield forgeBond.initiateSubscription(settlementTransaction1, fromRegistrarTransactionDetails);
                    yield forgeBond
                        .initiateSubscription(settlementTransaction2, fromRegistrarTransactionDetails)
                        .then((res) => {
                        const index = (0, events_1.assertEvent)(res, 'SubscriptionInitiated');
                        (0, events_1.assertEventArgs)(res, index, 'settlementTransactionId', settlementTransactionId2);
                    })
                        .then(() => __awaiter(this, void 0, void 0, function* () {
                        return assert.equal((yield forgeBond.getCurrentState(settlementTransactionId1)).toNumber(), TOKEN_LOCKED);
                    }));
                    yield forgeBond.getOperationType(operationId).then((res) => {
                        assert.equal(res.toNumber(), SUBSCRIPTION, 'operationType store in the smartContract should be SUBSCRIPTION');
                    });
                });
            });
            it('should succeed when issuer balance is equal to the transaction quantity', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const settlementTransaction = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor1Address,
                        deliveryQuantity: 10000,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then((res) => {
                        const index = (0, events_1.assertEvent)(res, 'SubscriptionInitiated');
                        (0, events_1.assertEventArgs)(res, index, 'settlementTransactionId', settlementTransactionId1);
                    })
                        .then(() => __awaiter(this, void 0, void 0, function* () {
                        return assert.equal((yield forgeBond.getCurrentState(settlementTransactionId1)).toNumber(), TOKEN_LOCKED);
                    }));
                    yield forgeBond.getOperationType(operationId).then((res) => {
                        assert.equal(res.toNumber(), SUBSCRIPTION, 'operationType store in the smartContract should be SUBSCRIPTION');
                    });
                });
            });
            it('should fail when not enough token are available on the issuer balance (first transaction)', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let res;
                    const settlementTransaction = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor1Address,
                        deliveryQuantity: 10001,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => {
                        res = true;
                    })
                        .catch(() => {
                        res = false;
                    });
                    assert.isNotOk(res, 'initiateSubscription should not succeed');
                    yield forgeBond.getOperationType(operationId).then((res) => {
                        assert.equal(res.toNumber(), 0, 'operationType store in the smartContract should not be SUBSCRIPTION');
                    });
                });
            });
            it('should fail when not enough token are available on the issuer balance (second transaction)', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let res;
                    const settlementTransaction1 = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor1Address,
                        deliveryQuantity: 23,
                        txHash,
                    };
                    const settlementTransaction2 = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: 10000,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction1, fromRegistrarTransactionDetails)
                        .then(() => forgeBond.initiateSubscription(settlementTransaction2, fromRegistrarTransactionDetails))
                        .then(() => {
                        res = true;
                    })
                        .catch(() => {
                        res = false;
                    });
                    assert.isNotOk(res, 'initiateSubscription should not succeed');
                });
            });
            it('should fail when operator is not authorised', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let res;
                    const settlementTransaction = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor1Address,
                        deliveryQuantity: 23,
                        txHash,
                    };
                    yield forgeBond.initiateSubscription
                        .call(settlementTransaction, {
                        from: constants.investor1Address,
                    })
                        .then(() => {
                        res = true;
                    })
                        .catch(() => {
                        res = false;
                    });
                    assert.isNotOk(res, 'initiateSubscription should not succeed');
                });
            });
            it('should fail when deliverySenderAccountNumber is not issuer', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let res;
                    let errorMessage;
                    const settlementTransaction = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.investor2Address,
                        deliveryReceiverAccountNumber: constants.investor1Address,
                        deliveryQuantity: 1,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => {
                        res = true;
                    })
                        .catch((error) => {
                        res = false;
                        errorMessage = error.reason;
                    });
                    assert.isNotOk(res, 'initiateSubscription should not succeed');
                    assert.equal(errorMessage, 'deliverySenderAccountNumber must match token owner');
                });
            });
        });
    });
    context('Transfer - confirmPaymentReceived ', function () {
        return __awaiter(this, void 0, void 0, function* () {
            it('should change subscription status to CASH_RECEIVED', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const quantity = 1000;
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                    const settlementTransaction1 = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: quantity,
                        txHash,
                    };
                    const settlementTransaction2 = {
                        txId: settlementTransactionId2,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: 23,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction1, fromRegistrarTransactionDetails)
                        .then(() => forgeBond.initiateSubscription(settlementTransaction2, fromRegistrarTransactionDetails))
                        .then(() => forgeBond.confirmPaymentReceived(settlementTransactionId1, fromSettlerTransactionDetails))
                        .then(() => forgeBond.confirmPaymentReceived(settlementTransactionId2, fromSettlerTransactionDetails))
                        .then(() => __awaiter(this, void 0, void 0, function* () {
                        assert.equal((yield forgeBond.getCurrentState(settlementTransactionId1)).toNumber(), CASH_RECEIVED);
                        assert.equal((yield forgeBond.getCurrentState(settlementTransactionId2)).toNumber(), CASH_RECEIVED);
                    }));
                    yield forgeBond.getOperationType(operationId).then((res) => {
                        assert.equal(res.toNumber(), SUBSCRIPTION, 'operationType store in the smartContract should be SUBSCRIPTION');
                    });
                });
            });
            it('should emit PaymentReceived event', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const quantity = 1000;
                    const subscriptionCode = 0x01;
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                    const settlementTransaction = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: quantity,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => forgeBond.confirmPaymentReceived(settlementTransactionId1, fromSettlerTransactionDetails))
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        const index = (0, events_1.assertEvent)(res, 'PaymentReceived');
                        (0, events_1.assertEventArgs)(res, index, 'settlementTransactionId', settlementTransactionId1);
                        (0, events_1.assertEventArgs)(res, index, 'settlementTransactionOperationType', new bignumber_js_1.default(subscriptionCode).toFixed());
                    }));
                });
            });
        });
    });
    context('Transfer - confirmPaymentTransferred ', function () {
        return __awaiter(this, void 0, void 0, function* () {
            it('should change subscription status to CASH_SENT', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const quantity = 1000;
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                    const settlementTransaction = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: quantity,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => forgeBond.confirmPaymentReceived(settlementTransactionId1, fromSettlerTransactionDetails))
                        .then(() => forgeBond.confirmPaymentTransferred(settlementTransactionId1, fromSettlerTransactionDetails))
                        .then(() => __awaiter(this, void 0, void 0, function* () {
                        return assert.equal((yield forgeBond.getCurrentState(settlementTransactionId1)).toNumber(), CASH_SENT);
                    }));
                });
            });
            it('should emit PaymentTransferred event', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const quantity = 1000;
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                    const settlementTransaction = {
                        txId: settlementTransactionId1,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: quantity,
                        txHash,
                    };
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => forgeBond.confirmPaymentReceived(settlementTransactionId1, fromSettlerTransactionDetails))
                        .then(() => forgeBond.confirmPaymentTransferred(settlementTransactionId1, fromSettlerTransactionDetails))
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        const index = (0, events_1.assertEvent)(res, 'PaymentTransferred');
                        (0, events_1.assertEventArgs)(res, index, 'settlementTransactionId', settlementTransactionId1);
                    }));
                });
            });
        });
    });
    context('cancelSettlementTransaction ', function () {
        return __awaiter(this, void 0, void 0, function* () {
            it('should cancelTransaction + emit SettlementTransactionCanceled event', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const quantity = 1000;
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                    const settlementTransaction = {
                        txId: settlementTransactionId3,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: quantity,
                        txHash,
                    };
                    yield forgeBond
                        .initiateTrade(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => forgeBond.cancelSettlementTransaction(settlementTransaction, fromRegistrarTransactionDetails))
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        const index = (0, events_1.assertEvent)(res, 'SettlementTransactionCanceled');
                        (0, events_1.assertEventArgs)(res, index, 'settlementTransactionId', settlementTransactionId3);
                    }));
                    yield forgeBond.getCurrentState(settlementTransactionId3).then((res) => {
                        assert.equal(res.toNumber(), CANCELED, 'operationType store in the smartContract should be CANCELLED');
                    });
                });
            });
            it('should fail calling cancelSettlementTransaction if settlementTransaction status !== tockenLocked', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const quantity = 1000;
                    let res;
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                    const settlementTransaction = {
                        txId: settlementTransactionId3,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: quantity,
                        txHash,
                    };
                    yield forgeBond;
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => forgeBond.confirmPaymentReceived(settlementTransactionId3, fromSettlerTransactionDetails))
                        .then(() => forgeBond.cancelSettlementTransaction(settlementTransaction, fromRegistrarTransactionDetails))
                        .then(() => {
                        res = true;
                    })
                        .catch(() => {
                        res = false;
                    });
                    assert.isNotOk(res, 'cancelSettlementTransaction should not succeed');
                    yield forgeBond.getCurrentState(settlementTransactionId3).then((res) => {
                        assert.equal(res.toNumber(), CASH_RECEIVED, 'operationType store in the smartContract should be CASH_RECEIVED');
                    });
                });
            });
            it('should fail calling cancelSettlementTransaction for a not existing transactionId', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const quantity = 1000;
                    let res;
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                    const settlementTransaction = {
                        txId: settlementTransactionId3,
                        operationId,
                        deliverySenderAccountNumber: constants.owner,
                        deliveryReceiverAccountNumber: constants.investor2Address,
                        deliveryQuantity: quantity,
                        txHash,
                    };
                    yield forgeBond;
                    yield forgeBond
                        .initiateSubscription(settlementTransaction, fromRegistrarTransactionDetails)
                        .then(() => {
                        settlementTransaction.txId = settlementTransactionId2;
                        return forgeBond.cancelSettlementTransaction(settlementTransaction, fromRegistrarTransactionDetails);
                    })
                        .then(() => {
                        res = true;
                    })
                        .catch(() => {
                        res = false;
                    });
                    assert.isNotOk(res, 'cancelSettlementTransaction should not succeed');
                    yield forgeBond.getCurrentState(settlementTransactionId3).then((res) => {
                        assert.equal(res.toNumber(), TOKEN_LOCKED, 'operationType store in the smartContract should be TOKEN_LOCKED');
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=transfer.js.map