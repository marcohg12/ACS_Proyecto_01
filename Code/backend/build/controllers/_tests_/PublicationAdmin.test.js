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
var PublicationDaoStub_1 = require("./PublicationDaoStub");
var PublicationAdmin_1 = require("../PublicationAdmin");
var Publication_1 = require("../../models/Publication");
jest.mock("fs");
describe('PublicationService', function () {
    var publicationAdmin;
    var publicationDAOStub;
    beforeEach(function () {
        publicationDAOStub = new PublicationDaoStub_1.PublicationDAOStub();
        publicationAdmin = new PublicationAdmin_1.PublicationAdmin(publicationDAOStub);
    });
    //Test Case ID: 121
    it('should get a publication with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publicationId, publication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publicationId = "60d9fbbf2b7e4e3a5c8e4f5b";
                    return [4 /*yield*/, publicationAdmin.getPublication(publicationId)];
                case 1:
                    publication = _a.sent();
                    expect(publication).toBeTruthy();
                    expect(publication._id).toBe(publicationId);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 122
    it('should throw an exception when trying to get a publication with a non-existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingId = "nonexistingid";
                    return [4 /*yield*/, expect(publicationAdmin.getPublication(nonExistingId))
                            .rejects
                            .toThrow("Publication with ID ".concat(nonExistingId, " not found"))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 123
    it('should get all publications in an acceptable time (0 to 2 seconds)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var startTime, publications, endTime, elapsedTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTime = Date.now();
                    return [4 /*yield*/, publicationAdmin.getPublications()];
                case 1:
                    publications = _a.sent();
                    endTime = Date.now();
                    elapsedTime = endTime - startTime;
                    expect(elapsedTime).toBeLessThanOrEqual(2000);
                    expect(elapsedTime).toBeGreaterThanOrEqual(0);
                    expect(publications).toBeTruthy();
                    expect(publications.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 124
    it('should get all publications with an existing category', function () { return __awaiter(void 0, void 0, void 0, function () {
        var categoryId, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryId = "1234567890abcdef12345678";
                    return [4 /*yield*/, publicationAdmin.getPublicationsByCategory(categoryId)];
                case 1:
                    publications = _a.sent();
                    expect(publications).toBeTruthy();
                    expect(publications.length).toBeGreaterThan(0);
                    publications.forEach(function (publication) {
                        expect(publication.categoryId).toBe(categoryId);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 125
    it('should throw an exception when trying to get publications with a non-existing category ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingCategoryId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingCategoryId = "nonexistingcategoryid";
                    return [4 /*yield*/, expect(publicationAdmin.getPublicationsByCategory(nonExistingCategoryId))
                            .rejects
                            .toThrow("No publications found for category ID ".concat(nonExistingCategoryId))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 126
    it('should get all publications with an existing tag', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tags, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tags = ["tag1", "tag2"];
                    return [4 /*yield*/, publicationAdmin.getPublicationsByTags(tags)];
                case 1:
                    publications = _a.sent();
                    expect(publications.length).toBeGreaterThan(0);
                    publications.forEach(function (publication) {
                        expect(publication.tags.some(function (tag) { return tags.includes(tag); })).toBe(true);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 127
    it('should throw an exception when trying to get publications with a non-existing tag', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingTag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingTag = "nonexistingtag";
                    return [4 /*yield*/, expect(publicationAdmin.getPublicationsByTags([nonExistingTag]))
                            .rejects
                            .toThrow("No publications found for tags ".concat(nonExistingTag))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 128
    it('should register a publication if receiving a publication object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publication = new Publication_1.Publication("1234567890abcdef12345678", new Date(), "Test publication", "test.jpg", ["test"]);
                    return [4 /*yield*/, expect(publicationAdmin.registerPublication(publication))
                            .resolves
                            .not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 129
    it('should reject to register a publication if receiving an object different from publication', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getTags: function () { return ["tag1", "tag2"]; }
                    };
                    return [4 /*yield*/, expect(publicationAdmin.registerPublication(invalidObject))
                            .rejects
                            .toThrow("Invalid publication object")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 130
    it('should update a publication if receiving a publication object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publication = new Publication_1.Publication("1234567890abcdef12345678", new Date(), "Test publication", "test.jpg", ["test"], "60d9fbbf2b7e4e3a5c8e4f5b");
                    return [4 /*yield*/, expect(publicationAdmin.updatePublication(publication))
                            .resolves
                            .not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 131
    it('should reject to update a publication if receiving an object different from publication', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getTags: function () { return ["tag1", "tag2"]; }
                    };
                    return [4 /*yield*/, expect(publicationAdmin.updatePublication(invalidObject))
                            .rejects
                            .toThrow("Invalid publication object")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 132
    it('should delete a publication with an existence ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publicationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publicationId = "60d9fbbf2b7e4e3a5c8e4f5b";
                    return [4 /*yield*/, expect(publicationAdmin.deletePublication(publicationId))
                            .resolves
                            .not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test Case ID: 133
    it('should reject to delete a publication with a non-existent ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistentPublicationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistentPublicationId = "nonexistentid";
                    return [4 /*yield*/, expect(publicationAdmin.deletePublication(nonExistentPublicationId))
                            .rejects
                            .toThrow("Publication not found")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
