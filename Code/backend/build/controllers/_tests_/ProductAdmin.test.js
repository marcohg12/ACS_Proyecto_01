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
var Product_1 = require("../../models/Product");
var ProductDaoStub_1 = require("./ProductDaoStub");
var ProductAdmin_1 = require("../ProductAdmin");
jest.mock("fs");
describe('registerProduct function', function () {
    var productAdmin;
    var productDAOStub;
    beforeEach(function () {
        productDAOStub = new ProductDaoStub_1.ProductDAOStub();
        productAdmin = new ProductAdmin_1.ProductAdmin(productDAOStub);
    });
    //Test Case ID: 134
    it('registers a product if receiving a product object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product = new Product_1.Product("Product Description", "photo.jpg", "Product Name", 10, 100, "1234567890");
                    return [4 /*yield*/, expect(productAdmin.registerProduct(product))
                            .resolves
                            .not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 135
    it('rejects to register a product if receiving an object different from product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getUnits: function () { return 2; }
                    };
                    return [4 /*yield*/, expect(productAdmin.registerProduct(invalidObject)).rejects.toThrow("Invalid product object")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 136
    it('updates a product if receiving a product object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product, productId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product = new Product_1.Product("Product Description", "photo.jpg", "Product Name", 10, 100, "1234567890");
                    return [4 /*yield*/, productAdmin.updateProduct(product)];
                case 1:
                    productId = _a.sent();
                    expect(productId).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 137
    it('rejects to update a product if receiving an object different from product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getUnits: function () { return 2; }
                    };
                    return [4 /*yield*/, expect(productAdmin.updateProduct(invalidObject)).rejects.toThrow("Invalid product object")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 138
    it('should delete a product with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var existingProductId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingProductId = 'existingProductId123';
                    return [4 /*yield*/, expect(productAdmin.deleteProduct(existingProductId))
                            .resolves
                            .not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 139
    it('should reject to delete a product with a non-existent ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingId = 'nonexistingid';
                    jest.spyOn(productDAOStub, 'getProduct').mockResolvedValue(null);
                    return [4 /*yield*/, expect(productAdmin.deleteProduct(nonExistingId))
                            .rejects
                            .toThrow("Product with ID ".concat(nonExistingId, " not found"))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 140
    it('should get all products in an acceptable time (0 to 2 seconds)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var start, products, duration;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = Date.now();
                    return [4 /*yield*/, productAdmin.getProducts()];
                case 1:
                    products = _a.sent();
                    duration = Date.now() - start;
                    expect(products).toBeDefined();
                    expect(Array.isArray(products)).toBe(true);
                    expect(products.length).toBeGreaterThan(0);
                    expect(duration).toBeLessThanOrEqual(2000); // 2 segundos
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get a product with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var existingProductId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingProductId = '2';
                    return [4 /*yield*/, productAdmin.getProduct(existingProductId)];
                case 1:
                    product = _a.sent();
                    expect(product).toBeDefined();
                    expect(product === null || product === void 0 ? void 0 : product.getID()).toBe(existingProductId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject to get a product with a non-existent ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingId = 'nonexistingid';
                    return [4 /*yield*/, expect(productAdmin.getProduct(nonExistingId))
                            .rejects
                            .toThrow("Product with ID ".concat(nonExistingId, " not found"))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
