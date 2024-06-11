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
Object.defineProperty(exports, "__esModule", { value: true });
// CartDAO.test.ts
var testDatabase_1 = require("./testDatabase");
var CartDAO_1 = require("../CartDAO");
var Cart_1 = require("../../models/Cart");
var measureTime = function (func) { return __awaiter(void 0, void 0, void 0, function () {
    var start, end;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start = Date.now();
                return [4 /*yield*/, func()];
            case 1:
                _a.sent();
                end = Date.now();
                return [2 /*return*/, end - start];
        }
    });
}); };
describe('CartDAO Tests', function () {
    var cartDAO;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, testDatabase_1.connectDB)()];
                case 1:
                    _a.sent();
                    cartDAO = new CartDAO_1.CartDAO();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, testDatabase_1.disconnectDB)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 8
    it('should not get a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = 'invalid';
                    return [4 /*yield*/, expect(cartDAO.getCart(userId)).resolves.toEqual({ products: [] })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 9
    it('should get a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, cart, cartData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = '6535bd7c8a49de9cdfa015de';
                    return [4 /*yield*/, cartDAO.getCart(userId)];
                case 1:
                    cartData = _a.sent();
                    cart = new Cart_1.Cart(userId, cartData.products, cartData._id);
                    expect(cart).toBeDefined();
                    expect(cart.getClient()).toBe(userId);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 10 y 11
    it('should handle getCart with 100 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var concurrentUsers, maxAcceptableTime, getCart, promises, times;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    concurrentUsers = 100;
                    maxAcceptableTime = 5000;
                    getCart = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
                        var start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    start = Date.now();
                                    return [4 /*yield*/, cartDAO.getCart(userId)];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    promises = Array.from({ length: concurrentUsers }, function (_, index) {
                        var userId = "user_".concat(index);
                        return measureTime(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getCart(userId)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    times = _a.sent();
                    times.forEach(function (time) {
                        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 12
    it('should reject adding a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, idInvalidUser, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'invalid';
                    units = 2;
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, cartDAO.addProduct(idProduct, units, idInvalidUser)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 13
    it('should add a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, idValidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b196dabde790bc08e3c4f';
                    units = 2;
                    idValidUser = '6530f3e3cdf1e06a4798f7e0';
                    return [4 /*yield*/, expect(cartDAO.addProduct(idProduct, units, idValidUser)).resolves.not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 14 y 15
    it('should handle adding a cart with a valid user for 100 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, numUsers, idValidUser, addProductTime, addProductPromises, addProductTimes, addProductTotalTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b2f0b9cddb8de686495a5';
                    units = 1;
                    numUsers = 100;
                    idValidUser = '6563bb4e2f2e18184bea1416';
                    addProductTime = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    start = Date.now();
                                    return [4 /*yield*/, cartDAO.addProduct(idProduct, units, idValidUser)];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    addProductPromises = Array.from({ length: numUsers }, function () { return addProductTime(); });
                    return [4 /*yield*/, Promise.all(addProductPromises)];
                case 1:
                    addProductTimes = _a.sent();
                    addProductTotalTime = addProductTimes.reduce(function (total, time) { return total + time; }, 0);
                    addProductTimes.forEach(function (time) {
                        expect(time).toBeLessThanOrEqual(2000);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 16
    it('should reject deleting a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idInvalidUser, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, cartDAO.deleteProduct(idProduct, idInvalidUser)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 17
    it('should delete a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idValidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b297a9cddb8de686494c3';
                    idValidUser = '6563bb4e2f2e18184bea1416';
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
    //Test ID: 18 y 19
    it('should handle deleting a cart with a valid user for 100 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, numUsers, idValidUser, startTimes, endTimes, totalTime, averageTimePerUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b2f0b9cddb8de686495a5';
                    numUsers = 100;
                    idValidUser = '6563bb4e2f2e18184bea1416';
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.addProduct(idProduct, 2, idValidUser); }))];
                case 1:
                    _a.sent();
                    startTimes = Array.from({ length: numUsers }, function () { return Date.now(); });
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.deleteProduct(idProduct, idValidUser); }))];
                case 2:
                    _a.sent();
                    endTimes = Array.from({ length: numUsers }, function () { return Date.now(); });
                    totalTime = endTimes.reduce(function (total, end, index) { return total + (end - startTimes[index]); }, 0);
                    averageTimePerUser = totalTime / numUsers;
                    expect(averageTimePerUser).toBeLessThanOrEqual(1000000);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 20
    it('should reject updating a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idInvalidUser, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, cartDAO.updateUnits(idProduct, 5, idInvalidUser)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 21 
    it('should update a cart with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idValidUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b297a9cddb8de686494c3';
                    idValidUser = '6563bb4e2f2e18184bea1416';
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
    //Test ID: 22 y 23
    it('should handle updating a cart with a valid user for 100 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, numUsers, idValidUser, maxAcceptableTime, measureTime, updatePromises, updateTimes, totalTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b2f0b9cddb8de686495a5';
                    units = 1;
                    numUsers = 100;
                    idValidUser = '653b2f0b9cddb8de686495a5';
                    maxAcceptableTime = 2000;
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.addProduct(idProduct, 2, idValidUser); }))];
                case 1:
                    _a.sent();
                    measureTime = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    start = Date.now();
                                    return [4 /*yield*/, cartDAO.updateUnits(idProduct, units, idValidUser)];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    updatePromises = Array.from({ length: numUsers }, function () { return measureTime(); });
                    return [4 /*yield*/, Promise.all(updatePromises)];
                case 2:
                    updateTimes = _a.sent();
                    totalTime = updateTimes.reduce(function (total, time) { return total + time; }, 0);
                    console.log("Total time for ".concat(numUsers, " users: ").concat(totalTime, " milliseconds"));
                    updateTimes.forEach(function (time) {
                        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 24
    it('should handle finding a cart with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idInvalidUser, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = 'product_1';
                    idInvalidUser = 'invalid';
                    return [4 /*yield*/, cartDAO.findProduct(idProduct, idInvalidUser)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 25
    it('should find a cart with a valid user and updated units', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, idValidUser, units;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b297a9cddb8de686494c3';
                    idValidUser = '6563bb4e2f2e18184bea1416';
                    return [4 /*yield*/, cartDAO.addProduct(idProduct, 2, idValidUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cartDAO.updateUnits(idProduct, 5, idValidUser)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cartDAO.findProduct(idProduct, idValidUser)];
                case 3:
                    units = _a.sent();
                    expect(units).toBe(5);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 26 y 27
    it('should handle finding a cart with a valid user for 100 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var idProduct, units, numUsers, idValidUser, findProductTime, findProductPromises, findProductTimes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idProduct = '653b196dabde790bc08e3c4f';
                    units = 2;
                    numUsers = 100;
                    idValidUser = '6563bb4e2f2e18184bea1416';
                    return [4 /*yield*/, Promise.all(Array.from({ length: numUsers }, function () { return cartDAO.addProduct(idProduct, units, idValidUser); }))];
                case 1:
                    _a.sent();
                    findProductTime = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    start = Date.now();
                                    return [4 /*yield*/, cartDAO.findProduct(idProduct, idValidUser)];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    findProductPromises = Array.from({ length: numUsers }, function () { return findProductTime(); });
                    return [4 /*yield*/, Promise.all(findProductPromises)];
                case 2:
                    findProductTimes = _a.sent();
                    findProductTimes.forEach(function (time) {
                        expect(time).toBeLessThanOrEqual(2000);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 28
    it('should reject to register an order with an invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validUser, validProductId, orderData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = '65a440f54ca3f04c1510ade2';
                    validProductId = '653b2f0b9cddb8de686495a5';
                    orderData = {
                        client: validUser,
                        orderDate: new Date(),
                        address: 'Test Address',
                        priceWithDelivery: 100,
                        lineProducts: [
                            { id: validProductId, name: 'Product 1', units: 2, price: 50 }
                        ],
                        state: 1,
                    };
                    return [4 /*yield*/, expect(cartDAO.registerOrder(orderData.client, orderData.orderDate, orderData.address, orderData.priceWithDelivery, orderData.lineProducts, orderData.state)).resolves.not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 29
    it('should register an order with a valid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validUser, orderData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = '65a440f54ca3f04c1510ade2';
                    orderData = {
                        client: validUser,
                        orderDate: new Date(),
                        address: 'Test Address',
                        priceWithDelivery: 100,
                        lineProducts: [{ id: '653b196dabde790bc08e3c4f', name: 'Product 1', units: 2, price: 50 }],
                        state: 1,
                    };
                    return [4 /*yield*/, expect(cartDAO.registerOrder(orderData.client, orderData.orderDate, orderData.address, orderData.priceWithDelivery, orderData.lineProducts, orderData.state)).resolves.not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 30 y 31
    it('should register an order with a valid user for 100 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var numUsers, registerOrderTime, registerOrderPromises, registerOrderTimes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numUsers = 100;
                    registerOrderTime = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var validUser, orderData, start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    validUser = '65a440f54ca3f04c1510ade2';
                                    orderData = {
                                        client: validUser,
                                        orderDate: new Date(),
                                        address: 'Test Address',
                                        priceWithDelivery: 100,
                                        lineProducts: [{ id: '653b196dabde790bc08e3c4f', name: 'Product 1', units: 2, price: 50 }],
                                        state: 1,
                                    };
                                    start = Date.now();
                                    return [4 /*yield*/, cartDAO.registerOrder(orderData.client, orderData.orderDate, orderData.address, orderData.priceWithDelivery, orderData.lineProducts, orderData.state)];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    registerOrderPromises = Array.from({ length: numUsers }, function () { return registerOrderTime(); });
                    return [4 /*yield*/, Promise.all(registerOrderPromises)];
                case 1:
                    registerOrderTimes = _a.sent();
                    registerOrderTimes.forEach(function (time) {
                        expect(time).toBeLessThanOrEqual(2000);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
