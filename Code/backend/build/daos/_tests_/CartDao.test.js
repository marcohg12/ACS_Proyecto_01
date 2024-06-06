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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DBCartStub_1 = __importDefault(require("./DBCartStub"));
var performance = require('perf_hooks').performance;
describe('CartDAO Tests', function () {
    var cartDAO;
    beforeEach(function () {
        cartDAO = new DBCartStub_1.default();
    });
    //Test Case ID: 8
    it('Test do not get a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = 'invalid';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cartDAO.getCart(userId)];
                case 2:
                    _a.sent();
                    fail("Expect an error");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    expect(error_1.message).toBe("Invalid User");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 9
    it('Test get a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, expectedCart, cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = 'valid_user';
                    expectedCart = {
                        products: [
                            { productRef: 'product_1', units: 2 },
                            { productRef: 'product_2', units: 3 },
                        ],
                    };
                    cartDAO.cartData[userId] = expectedCart;
                    return [4 /*yield*/, cartDAO.getCart(userId)];
                case 1:
                    cart = _a.sent();
                    expect(cart).toEqual(expectedCart);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 10 y 11
    it('Test getCart with 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var numUsers, userIds, start, promises, end, totalTime, averageTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numUsers = 1000;
                    userIds = Array.from({ length: numUsers }, function (_, index) { return "user_".concat(index); });
                    start = performance.now();
                    promises = userIds.map(function (userId) { return cartDAO.getCart(userId); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    end = performance.now();
                    totalTime = end - start;
                    averageTime = totalTime / numUsers;
                    console.log("Total time for ".concat(numUsers, " users: ").concat(totalTime, " miliseconds"));
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 12
    it('Test rejects to add a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, idInvalidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    units = 2;
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, expect(cartDAO.addProduct(idProduct, units, idInvalidUser)).rejects.toThrow("Invalid User")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 13
    it('Test add a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, idValidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    units = 2;
                    idValidUser = 'valid_user';
                    return [4 /*yield*/, expect(cartDAO.addProduct(idProduct, units, idValidUser)).resolves.not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 14 y 15
    test('Test add a cart with a valid user for 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, numUsers, idValidUser, startTime, endTime, totalTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    units = 2;
                    numUsers = 1000;
                    idValidUser = 'valid_user';
                    startTime = Date.now();
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.addProduct(idProduct, units, idValidUser); }))];
                case 1:
                    _a.sent();
                    endTime = Date.now();
                    totalTime = endTime - startTime;
                    console.log("Total time for ".concat(numUsers, " users: ").concat(totalTime, " miliseconds"));
                    expect(totalTime).toBeLessThanOrEqual(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 16
    it('Test rejects to delete a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idInvalidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, expect(cartDAO.deleteProduct(idProduct, idInvalidUser)).rejects.toThrow("Invalid User")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID:17
    it('Test delete a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idValidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    idValidUser = 'valid_user';
                    return [4 /*yield*/, cartDAO.addProduct(idProduct, 2, idValidUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(cartDAO.deleteProduct(idProduct, idValidUser)).resolves.not.toThrow()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 18 y 19
    it('Test delete a cart with a valid user for 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, numUsers, idValidUser, startTime, endTime, totalTime, averageTimePerUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    numUsers = 1000;
                    idValidUser = 'valid_user';
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.addProduct(idProduct, 2, idValidUser); }))];
                case 1:
                    _a.sent();
                    startTime = Date.now();
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.deleteProduct(idProduct, idValidUser); }))];
                case 2:
                    _a.sent();
                    endTime = Date.now();
                    totalTime = endTime - startTime;
                    averageTimePerUser = totalTime / numUsers;
                    console.log("Total time for ".concat(numUsers, " users: ").concat(totalTime, " miliseconds"));
                    expect(averageTimePerUser).toBeLessThanOrEqual(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 20
    it('Test rejects to update a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idInvalidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, expect(cartDAO.updateUnits(idProduct, 5, idInvalidUser)).rejects.toThrow("Invalid User")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 21
    test('Test update a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idValidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    idValidUser = 'valid_user';
                    return [4 /*yield*/, cartDAO.addProduct(idProduct, 2, idValidUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(cartDAO.updateUnits(idProduct, 5, idValidUser)).resolves.not.toThrow()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 22 y 23
    it('Test update a cart with a valid user for 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, numUsers, idValidUser, startTime, endTime, totalTime, averageTimePerUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    units = 3;
                    numUsers = 1000;
                    idValidUser = 'valid_user';
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.addProduct(idProduct, 2, idValidUser); }))];
                case 1:
                    _a.sent();
                    startTime = Date.now();
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.updateUnits(idProduct, units, idValidUser); }))];
                case 2:
                    _a.sent();
                    endTime = Date.now();
                    totalTime = endTime - startTime;
                    averageTimePerUser = totalTime / numUsers;
                    console.log("Total time for ".concat(numUsers, " users: ").concat(totalTime, " miliseconds"));
                    expect(averageTimePerUser).toBeLessThanOrEqual(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 24
    it('Test rejects to find a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idInvalidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'producto_1';
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, expect(cartDAO.findProduct(idProduct, idInvalidUser)).rejects.toThrow("Invalid User")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 25
    it('Test find a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idValidUser, units;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'producto_1';
                    idValidUser = 'valid_user';
                    return [4 /*yield*/, cartDAO.addProduct(idProduct, 2, idValidUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cartDAO.findProduct(idProduct, idValidUser)];
                case 2:
                    units = _a.sent();
                    expect(units).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 26 and 27
    it('Test find a cart with a valid user for 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, numUsers, idValidUser, startTime, endTime, totalTime, averageTimePerUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'producto_1';
                    units = 2;
                    numUsers = 1000;
                    idValidUser = 'valid_user';
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.addProduct(idProduct, 2, idValidUser); }))];
                case 1:
                    _a.sent();
                    startTime = Date.now();
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.findProduct(idProduct, idValidUser); }))];
                case 2:
                    _a.sent();
                    endTime = Date.now();
                    totalTime = endTime - startTime;
                    averageTimePerUser = totalTime / numUsers;
                    console.log("Total time for ".concat(numUsers, " users: ").concat(totalTime, " miliseconds"));
                    expect(averageTimePerUser).toBeLessThanOrEqual(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 28
    it('Test rejects to register an order with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidUser, orderData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidUser = 'invalid';
                    orderData = {
                        client: invalidUser,
                        orderDate: new Date(),
                        address: 'Dirección de prueba',
                        priceWithDelivery: 100,
                        lineProducts: [{ id: '1', name: 'Producto 1', units: 2, price: 50 }],
                        state: 1
                    };
                    return [4 /*yield*/, expect(cartDAO.registerOrder(orderData.client, orderData.orderDate, orderData.address, orderData.priceWithDelivery, orderData.lineProducts, orderData.state)).rejects.toThrow("Invalid User")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 29
    test('Test register an order with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validUser, orderData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = 'valid_user';
                    orderData = {
                        client: validUser,
                        orderDate: new Date(),
                        address: 'Dirección de prueba',
                        priceWithDelivery: 100,
                        lineProducts: [{ id: '1', name: 'Producto 1', units: 2, price: 50 }],
                        state: 1
                    };
                    return [4 /*yield*/, expect(cartDAO.registerOrder(orderData.client, orderData.orderDate, orderData.address, orderData.priceWithDelivery, orderData.lineProducts, orderData.state)).resolves.not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 30 and 31
    it('Test register an order with a valid user for 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var numUsers, validUser, orderData, startTime, endTime, totalTime, averageTimePerUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numUsers = 1000;
                    validUser = 'valid_user';
                    orderData = {
                        orderDate: new Date(),
                        address: 'Dirección de prueba',
                        priceWithDelivery: 100,
                        lineProducts: [{ id: '1', name: 'Producto 1', units: 2, price: 50 }],
                        state: 1
                    };
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () {
                            return cartDAO.registerOrder(validUser, orderData.orderDate, orderData.address, orderData.priceWithDelivery, orderData.lineProducts, orderData.state);
                        }))];
                case 1:
                    _a.sent();
                    startTime = Date.now();
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () {
                            return cartDAO.registerOrder(validUser, orderData.orderDate, orderData.address, orderData.priceWithDelivery, orderData.lineProducts, orderData.state);
                        }))];
                case 2:
                    _a.sent();
                    endTime = Date.now();
                    totalTime = endTime - startTime;
                    averageTimePerUser = totalTime / numUsers;
                    console.log("Total time for ".concat(numUsers, " users: ").concat(totalTime, " miliseconds"));
                    expect(averageTimePerUser).toBeLessThanOrEqual(2000);
                    return [2 /*return*/];
            }
        });
    }); });
});
