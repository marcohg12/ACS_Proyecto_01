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
var Publication_1 = require("../../models/Publication");
var DBPublicationStub = /** @class */ (function () {
    function DBPublicationStub() {
        this.publications = [];
        this.resetPublications();
    }
    DBPublicationStub.prototype.isValidPublication = function (publication) {
        return (publication &&
            typeof publication.getCategoryID === 'function' &&
            typeof publication.getDescription === 'function' &&
            typeof publication.getTags === 'function' &&
            Array.isArray(publication.getTags()));
    };
    DBPublicationStub.prototype.setPublications = function (publications) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.publications = publications;
                return [2 /*return*/];
            });
        });
    };
    DBPublicationStub.prototype.resetPublications = function () {
        return __awaiter(this, void 0, void 0, function () {
            var publication1, publication2, i, publication;
            return __generator(this, function (_a) {
                publication1 = new Publication_1.Publication('category1', new Date(), 'description1', 'photo1', ['tag1', 'tag2'], 'publication1');
                publication2 = new Publication_1.Publication('category2', new Date(), 'description2', 'photo2', ['tag3', 'tag4'], 'publication2');
                publication1.setID('1');
                this.publications.push(publication1, publication2);
                for (i = 1; i <= 100; i++) {
                    publication = new Publication_1.Publication("category".concat(i), new Date(), "Description ".concat(i), "photo".concat(i, ".jpg"), ["tag".concat(i)], "publication".concat(i));
                    this.publications.push(publication);
                }
                return [2 /*return*/];
            });
        });
    };
    DBPublicationStub.prototype.getPublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            var publication;
            return __generator(this, function (_a) {
                publication = this.publications.find(function (publication) { return publication.getID() === publicationId; });
                return [2 /*return*/, publication || null];
            });
        });
    };
    DBPublicationStub.prototype.getPublications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.publications.length === 0) {
                    return [2 /*return*/, null];
                }
                else {
                    return [2 /*return*/, this.publications];
                }
                return [2 /*return*/];
            });
        });
    };
    DBPublicationStub.prototype.getPublicationsByCategory = function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var publicationsInCategory;
            return __generator(this, function (_a) {
                publicationsInCategory = this.publications.filter(function (publication) { return publication.categoryId === categoryId; });
                if (publicationsInCategory.length === 0) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, publicationsInCategory];
            });
        });
    };
    DBPublicationStub.prototype.getPublicationsByTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            var publicationsWithTags;
            return __generator(this, function (_a) {
                publicationsWithTags = this.publications.filter(function (publication) {
                    return tags.every(function (tag) { return publication.tags.includes(tag); });
                });
                if (publicationsWithTags.length === 0) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, publicationsWithTags];
            });
        });
    };
    DBPublicationStub.prototype.registerPublication = function (publicationToRegister) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.isValidPublication(publicationToRegister)) {
                    return [2 /*return*/, null];
                }
                this.publications.push(publicationToRegister);
                return [2 /*return*/, "fakePublicationId"];
            });
        });
    };
    DBPublicationStub.prototype.updatePublication = function (publicationToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.isValidPublication(publicationToUpdate)) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, "fakePublicationId"];
            });
        });
    };
    DBPublicationStub.prototype.deletePublication = function (publicationId) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = this.publications.findIndex(function (publication) { return publication.getID() === publicationId; });
                if (index !== -1) {
                    this.publications.splice(index, 1);
                    return [2 /*return*/, publicationId];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    return DBPublicationStub;
}());
exports.default = DBPublicationStub;
