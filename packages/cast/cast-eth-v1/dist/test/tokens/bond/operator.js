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
const builders_1 = require("../../utils/builders");
const constants = __importStar(require("../../constants"));
contract('ForgeBond', (accounts) => {
    let forgeBond;
    context('operators', function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    forgeBond = yield (0, builders_1.buildForgeBond)(constants.owner);
                });
            });
            it('should fail when authorizeOperator() not called by owner', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let res = false;
                    yield forgeBond
                        .authorizeOperator('0x143', accounts[1], {
                        from: accounts[1],
                    })
                        .then(() => (res = true))
                        .catch((err) => {
                        res = false;
                        assert.equal(err.reason, 'Only issuer can perform this action');
                    });
                    assert.isNotOk(res, 'Call should fail when not owner');
                });
            });
            it('should name a new operator with his role', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond
                        .authorizeOperator('0x143', accounts[1], {
                        from: accounts[0],
                    })
                        .then(() => forgeBond.isOperatorWithRoleAuthorized(accounts[1], '0x143'))
                        .then((res) => assert.isOk(res, 'New Operation with role created'));
                });
            });
            it('should revoke operator authorization', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield forgeBond
                        .authorizeOperator('0x143', accounts[1], {
                        from: accounts[0],
                    })
                        .then(() => forgeBond.revokeOperatorAuthorization(accounts[1], '0x143'))
                        .then(() => forgeBond.isOperatorWithRoleAuthorized(accounts[1], '0x143'))
                        .then((res) => assert.isOk(!res, 'revoke performed on operator authorization'));
                });
            });
        });
    });
});
//# sourceMappingURL=operator.js.map