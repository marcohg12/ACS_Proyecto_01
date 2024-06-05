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
exports.PublicationDAOStub = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var PublicationDAOStub = /** @class */ (function () {
    function PublicationDAOStub() {
        this.publications = [];
        this.publications = [
            {
                _id: "60d9fbbf2b7e4e3a5c8e4f5b",
                categoryId: "1234567890abcdef12345678",
                date: new Date(),
                description: "Test publication 1",
                photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5b.png",
                tags: ["test", "publication"],
                category: { _id: "1234567890abcdef12345678", name: "TestCategory" }
            },
            {
                _id: "60d9fbbf2b7e4e3a5c8e4f5c",
                categoryId: "1234567890abcdef12345678",
                date: new Date(),
                description: "Test publication 2",
                photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5c.png",
                tags: ["test", "publication2", "tag2"],
                category: { _id: "1234567890abcdef12345678", name: "TestCategory" }
            },
            {
                _id: "60d9fbbf2b7e4e3a5c8e4f5d",
                categoryId: "1234567890abcdef12345678",
                date: new Date(),
                description: "Test publication 1",
                photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5b.png",
                tags: ["test", "publication", "tag1"],
                category: { _id: "1234567890abcdef12345678", name: "TestCategory" }
            },
        ];
    }
    PublicationDAOStub.prototype.getPublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.publications.find(function (pub) { return pub._id === publicationId; }) || null];
            });
        });
    };
    PublicationDAOStub.prototype.getPublications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.publications];
            });
        });
    };
    PublicationDAOStub.prototype.getPublicationsByCategory = function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.publications.filter(function (pub) {
                        return pub.categoryId === categoryId ||
                            (pub.category && pub.category.fatherCategory === categoryId);
                    })];
            });
        });
    };
    PublicationDAOStub.prototype.getPublicationsByTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.publications.filter(function (pub) {
                        return pub.tags.some(function (tag) { return tags.includes(tag); });
                    })];
            });
        });
    };
    PublicationDAOStub.prototype.registerPublication = function (publication) {
        return __awaiter(this, void 0, void 0, function () {
            var newPublication;
            return __generator(this, function (_a) {
                if (!this.isValidPublication(publication)) {
                    throw new Error("Invalid publication object");
                }
                newPublication = {
                    _id: new mongoose_1.default.Types.ObjectId().toString(),
                    categoryId: publication.getCategoryID(),
                    date: new Date(),
                    description: publication.getDescription(),
                    photo: "/photos/publications/temp.png",
                    tags: publication.getTags(),
                    category: { _id: publication.getCategoryID(), name: "TestCategory" }
                };
                this.publications.push(newPublication);
                newPublication.photo = "/photos/publications/".concat(newPublication._id, ".png");
                return [2 /*return*/, newPublication._id];
            });
        });
    };
    PublicationDAOStub.prototype.isValidPublication = function (publication) {
        return (publication &&
            typeof publication.getCategoryID === 'function' &&
            typeof publication.getDescription === 'function' &&
            typeof publication.getTags === 'function' &&
            Array.isArray(publication.getTags()));
    };
    PublicationDAOStub.prototype.updatePublication = function (publicationToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.isValidPublication(publicationToUpdate)) {
                    throw new Error("Invalid publication object");
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve({ nModified: 1 });
                        }, 1000);
                    })];
            });
        });
    };
    PublicationDAOStub.prototype.deletePublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (publicationId === "nonexistentid") {
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
    return PublicationDAOStub;
}());
exports.PublicationDAOStub = PublicationDAOStub;
