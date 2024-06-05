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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDAOStub = void 0;
var Product_1 = require("../../models/Product");
var mongoose_1 = __importDefault(require("mongoose"));
var ProductDAOStub = /** @class */ (function () {
    function ProductDAOStub() {
        this.products = [
            new Product_1.Product("Description 1", "/photos/products/1.png", "Product 1", 10, 100, "existingProductId123"),
            new Product_1.Product("Description 2", "/photos/products/2.png", "Product 2", 20, 200, "2"),
            // Agrega más productos si es necesario
        ];
    }
    ProductDAOStub.prototype.isValidProduct = function (product) {
        return (product instanceof Product_1.Product &&
            typeof product.getName === 'function' &&
            typeof product.getDescription === 'function' &&
            typeof product.getUnits === 'function' &&
            typeof product.getPrice === 'function' &&
            typeof product.getPhoto === 'function');
    };
    ProductDAOStub.prototype.registerProduct = function (productToRegister) {
        return __awaiter(this, void 0, void 0, function () {
            var fakeId;
            return __generator(this, function (_a) {
                if (!this.isValidProduct(productToRegister)) {
                    throw new Error("Invalid product object");
                }
                fakeId = new mongoose_1.default.Types.ObjectId().toString();
                productToRegister.setId(fakeId); // Asegúrate de que el ID se establece en el producto
                this.products.push(productToRegister);
                return [2 /*return*/];
            });
        });
    };
    ProductDAOStub.prototype.getProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                product = this.products.find(function (product) { return product.getID() === productId; });
                if (!product) {
                    throw new Error("Product with ID ".concat(productId, " not found"));
                }
                return [2 /*return*/, product];
            });
        });
    };
    ProductDAOStub.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, __spreadArray([], this.products, true)];
            });
        });
    };
    ProductDAOStub.prototype.deleteProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (productId === "nonexistentid") {
                                reject(new Error('Publication not found'));
                            }
                            else {
                                resolve({ nDeleted: 1 });
                            }
                        }, 1000);
                    })];
            });
        });
    };
    ProductDAOStub.prototype.updateProduct = function (productToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.isValidProduct(productToUpdate)) {
                    throw new Error("Invalid product object");
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve({ nModified: 1 });
                        }, 1000);
                    })];
            });
        });
    };
    ProductDAOStub.prototype.updateProductUnits = function (productId, units) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve({ nModified: 1 });
                        }, 1000);
                    })];
            });
        });
    };
    return ProductDAOStub;
}());
exports.ProductDAOStub = ProductDAOStub;
