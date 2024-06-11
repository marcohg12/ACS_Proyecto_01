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
var testDatabase_1 = require("./testDatabase");
var ProductDAO_1 = require("../ProductDAO");
var CartDAO_1 = require("../CartDAO");
var Product_1 = require("../../models/Product");
var mongoose_1 = __importDefault(require("mongoose"));
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
describe('ProductDAO Tests', function () {
    var productDAO;
    var cartDAO;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, testDatabase_1.connectDB)()];
                case 1:
                    _a.sent();
                    productDAO = new ProductDAO_1.ProductDAO();
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
    // Test ID: 160
    var productId;
    it('should register a product if receiving a product object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validProduct, result, registeredProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validProduct = new Product_1.Product("Effalclar Duo+ La Roche Posay - 75 ml", "/photos/products/652751e03bfa6a1d5636d453.png", "Effaclar Duo+", 195, 24000);
                    return [4 /*yield*/, productDAO.registerProduct(validProduct)];
                case 1:
                    result = _a.sent();
                    productId = result;
                    expect(productId).toBeDefined();
                    return [4 /*yield*/, productDAO.getProduct(productId)];
                case 2:
                    registeredProduct = _a.sent();
                    expect(registeredProduct.description).toBe("Effalclar Duo+ La Roche Posay - 75 ml");
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 161
    it('should reject to register a product if receiving an object different from product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getPrice: function () { return 100; }
                    };
                    return [4 /*yield*/, expect(productDAO.registerProduct(invalidObject)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 162
    it('should update a product if receiving a product object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validProduct, result, registeredProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validProduct = new Product_1.Product("Effalclar Duo+ La Roche Posay - 75 ml", "/photos/products/652751e03bfa6a1d5636d453.png", "Effaclar Duo+", 195, 23500, productId);
                    return [4 /*yield*/, productDAO.updateProduct(validProduct)];
                case 1:
                    result = _a.sent();
                    expect(result).toBeDefined();
                    return [4 /*yield*/, productDAO.getProduct(validProduct.getID())];
                case 2:
                    registeredProduct = _a.sent();
                    expect(registeredProduct === null || registeredProduct === void 0 ? void 0 : registeredProduct.description).toBe("Effalclar Duo+ La Roche Posay - 75 ml");
                    expect(registeredProduct === null || registeredProduct === void 0 ? void 0 : registeredProduct.price).toBe(23500);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 163
    it('should return null if receiving an object different from product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getPrice: function () { return 200; }
                    };
                    return [4 /*yield*/, expect(productDAO.updateProduct(invalidObject)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 164
    it('should delete a product with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deleteResult, fetchedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productDAO.deleteProduct(productId)];
                case 1:
                    deleteResult = _a.sent();
                    expect(deleteResult.deletedCount).toBe(1);
                    return [4 /*yield*/, productDAO.getProduct(productId)];
                case 2:
                    fetchedProduct = _a.sent();
                    expect(fetchedProduct).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 165
    it('should reject to delete a product with a non-existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingProductId, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingProductId = new mongoose_1.default.Types.ObjectId().toString();
                    return [4 /*yield*/, productDAO.deleteProduct(nonExistingProductId)];
                case 1:
                    result = _a.sent();
                    expect(result.deletedCount).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 166
    it('should delete a product with an existing ID and remove it from all carts', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, deletedProduct, updatedCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = "652751e03bfa6a1d5636d453";
                    return [4 /*yield*/, productDAO.deleteProduct(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, productDAO.getProduct(id)];
                case 2:
                    deletedProduct = _a.sent();
                    expect(deletedProduct).toBeNull();
                    return [4 /*yield*/, cartDAO.findProduct(id, "6535bd7c8a49de9cdfa015de")];
                case 3:
                    updatedCart = _a.sent();
                    expect(updatedCart).toBe(-1);
                    return [4 /*yield*/, productDAO.registerProduct(new Product_1.Product("Effalclar Duo+ La Roche Posay - 75 ml", "/photos/products/652751e03bfa6a1d5636d453.png", "Effaclar Duo+", 195, 23500))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, cartDAO.addProduct("652751e03bfa6a1d5636d453", 3, "6535bd7c8a49de9cdfa015de")];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 167
    it('should get all products in an acceptable time (0 to 2 seconds)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var maxAcceptableTime, startTime, products, endTime, elapsedTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maxAcceptableTime = 2000;
                    startTime = Date.now();
                    return [4 /*yield*/, productDAO.getProducts()];
                case 1:
                    products = _a.sent();
                    endTime = Date.now();
                    elapsedTime = endTime - startTime;
                    expect(products.length).toBeGreaterThan(0);
                    expect(elapsedTime).toBeLessThanOrEqual(maxAcceptableTime);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 168
    it('should get all products in an acceptable time (0 to 5 seconds) for 100 users at the same time', function () { return __awaiter(void 0, void 0, void 0, function () {
        var concurrentUsers, maxAcceptableTime, getProducts, promises, times;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    concurrentUsers = 100;
                    maxAcceptableTime = 5000;
                    getProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var products;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, productDAO.getProducts()];
                                case 1:
                                    products = _a.sent();
                                    expect(products.length).toBeGreaterThan(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    promises = Array.from({ length: concurrentUsers }, function () { return measureTime(getProducts); });
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
    // Test ID: 169
    it('should get a product with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var existingProductId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingProductId = '65a47961cbe3389cb4892774';
                    return [4 /*yield*/, productDAO.getProduct(existingProductId)];
                case 1:
                    product = _a.sent();
                    expect(product).toBeDefined();
                    expect(product._id.toString()).toBe(existingProductId);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 170
    it('should reject to get a product with a non-existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingProductId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingProductId = new mongoose_1.default.Types.ObjectId().toString();
                    return [4 /*yield*/, productDAO.getProduct(nonExistingProductId)];
                case 1:
                    product = _a.sent();
                    expect(product).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
