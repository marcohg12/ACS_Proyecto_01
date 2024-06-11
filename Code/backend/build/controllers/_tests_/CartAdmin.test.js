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
var CartAdmin_1 = require("../CartAdmin");
var CartDaoStub_1 = __importDefault(require("./CartDaoStub")); // Importamos el stub
var ToManyProductsInCart = require("../../exceptions/exceptions").ToManyProductsInCart;
jest.mock("fs");
describe("CartAdmin", function () {
    var cartAdmin;
    var cartDaoStub;
    beforeEach(function () {
        // Se crea una instancia de CartAdmin antes de cada prueba
        cartDaoStub = new CartDaoStub_1.default();
        cartAdmin = new CartAdmin_1.CartAdmin(cartDaoStub);
    });
    //Test Case ID: 1
    it("Test should add product to cart when units are in range (0-5)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, productId, units, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = "user1";
                    productId = "product1";
                    units = 3;
                    cartDaoStub.setFindProductValue(1);
                    return [4 /*yield*/, cartAdmin.addProductToCart(userId, productId, units)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(4);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 2
    it("Test should not add product to cart when units are lower tan 5)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, productId, units, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = "user1";
                    productId = "product1";
                    units = -2;
                    cartDaoStub.setFindProductValue(1);
                    return [4 /*yield*/, cartAdmin.addProductToCart(userId, productId, units)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(-1);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 3
    it("Test should not add product to cart when units are higher tan 5)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, productId, units;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = "user1";
                    productId = "product1";
                    units = 70;
                    cartDaoStub.setFindProductValue(1);
                    return [4 /*yield*/, expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, cartAdmin.addProductToCart(userId, productId, units)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }).rejects.toThrow(ToManyProductsInCart)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 4
    //Asumimos que pasa porque no deja correr si quiera con las unidades como string
    //Test Case ID: 5
    it("Test should not generate an order when cart is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, address, totalPrice, photoPath, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = "user1";
                    address = "Guacima";
                    totalPrice = 5000;
                    photoPath = "image";
                    cartDaoStub.setGetCartValue({ products: [] });
                    return [4 /*yield*/, cartAdmin.sendOrder(userId, address, totalPrice, photoPath)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 6
    it("Test should generate an order with products in the cart", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, address, totalPrice, photoPath, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = "user1";
                    address = "Guacima";
                    totalPrice = 5000;
                    photoPath = "Hello.png";
                    cartDaoStub.setGetCartValue({ products: [] });
                    cartDaoStub.setRegisterOrderValue(1);
                    return [4 /*yield*/, cartAdmin.sendOrder(userId, address, totalPrice, photoPath)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 7
    it("Test should generate an order whit products in the car and handle error when registering the order.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, address, totalPrice, photoPath, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = "user1";
                    address = "Guacima";
                    totalPrice = 5000;
                    photoPath = "Hello.png";
                    cartDaoStub.setGetCartValue({ products: [] });
                    cartDaoStub.setRegisterOrderValue(-1);
                    return [4 /*yield*/, cartAdmin.sendOrder(userId, address, totalPrice, photoPath)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); });
});
