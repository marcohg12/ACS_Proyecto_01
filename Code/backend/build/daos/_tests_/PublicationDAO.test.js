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
var DBPublicationStub_1 = __importDefault(require("./DBPublicationStub"));
var Publication_1 = require("../../models/Publication");
function measureTime(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var start, end;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = Date.now();
                    return [4 /*yield*/, fn()];
                case 1:
                    _a.sent();
                    end = Date.now();
                    return [2 /*return*/, end - start];
            }
        });
    });
}
describe('DBPublicationStub getPublication', function () {
    var dbStub;
    var publicationDAO;
    beforeEach(function () {
        dbStub = new DBPublicationStub_1.default();
    });
    //Test ID: 143
    it('should return a publication with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publicationId, publication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publicationId = 'publication1';
                    return [4 /*yield*/, dbStub.getPublication(publicationId)];
                case 1:
                    publication = _a.sent();
                    expect(publication).toBeDefined();
                    expect(publication === null || publication === void 0 ? void 0 : publication.getID()).toBe(publicationId);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 144
    it('should return undefined for a non-existing publication ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publicationId, publication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publicationId = 'nonExistingPublicationId';
                    return [4 /*yield*/, dbStub.getPublication(publicationId)];
                case 1:
                    publication = _a.sent();
                    expect(publication).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 145
    it('should get a publication within acceptable time for 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publicationId, concurrentUsers, maxAcceptableTime, getPublication, promises, times;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publicationId = 'publication1';
                    concurrentUsers = 1000;
                    maxAcceptableTime = 2000;
                    getPublication = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var publication;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, dbStub.getPublication(publicationId)];
                                case 1:
                                    publication = _a.sent();
                                    expect(publication).toBeDefined();
                                    expect(publication === null || publication === void 0 ? void 0 : publication.getID()).toBe(publicationId);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    promises = Array.from({ length: concurrentUsers }, function () { return measureTime(getPublication); });
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
    //Test ID: 146
    it('should get all publications within acceptable time for 1000 users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var concurrentUsers, maxAcceptableTime, getPublications, promises, times;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    concurrentUsers = 1000;
                    maxAcceptableTime = 2000;
                    getPublications = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var publications;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, dbStub.getPublications()];
                                case 1:
                                    publications = _a.sent();
                                    expect(publications).toBeDefined();
                                    expect(publications.length).toBe(102);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    promises = Array.from({ length: concurrentUsers }, function () { return measureTime(getPublications); });
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
    //Test ID: 147
    it('should return null when there are no publications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dbStub.setPublications([]);
                    return [4 /*yield*/, dbStub.getPublications()];
                case 1:
                    publications = _a.sent();
                    expect(publications).toBeNull();
                    dbStub.resetPublications();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 148
    it('should return all publications for an existing category', function () { return __awaiter(void 0, void 0, void 0, function () {
        var categoryId, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryId = 'category1';
                    return [4 /*yield*/, dbStub.getPublicationsByCategory(categoryId)];
                case 1:
                    publications = _a.sent();
                    expect(publications).toBeDefined();
                    expect(publications.length).toBeGreaterThan(0);
                    expect(publications.every(function (publication) { return publication.categoryId === categoryId; })).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 149
    it('should reject to get publications for a non-existing category', function () { return __awaiter(void 0, void 0, void 0, function () {
        var categoryId, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryId = 'nonExistingCategoryId';
                    return [4 /*yield*/, dbStub.getPublicationsByCategory(categoryId)];
                case 1:
                    publications = _a.sent();
                    expect(publications).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 150
    it('should handle 1000 users within 2 seconds', function () { return __awaiter(void 0, void 0, void 0, function () {
        var concurrentUsers, maxAcceptableTime, categoryId, getPublicationsByCategory, promises, times;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    concurrentUsers = 1000;
                    maxAcceptableTime = 2000;
                    categoryId = 'category1';
                    getPublicationsByCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var publications;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, dbStub.getPublicationsByCategory(categoryId)];
                                case 1:
                                    publications = _a.sent();
                                    expect(publications).toBeDefined();
                                    expect(publications.length).toBe(2);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    promises = Array.from({ length: concurrentUsers }, function () { return measureTime(getPublicationsByCategory); });
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
    //Test ID: 151
    it('should return all publications for existing tags', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tags, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tags = ['tag1', 'tag2'];
                    return [4 /*yield*/, dbStub.getPublicationsByTags(tags)];
                case 1:
                    publications = _a.sent();
                    expect(publications).toBeDefined();
                    expect(publications.length).toBeGreaterThan(0);
                    expect(publications.every(function (publication) { return publication.tags.some(function (tag) { return tags.includes(tag); }); })).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 152
    it('should reject to get publications for non-existing tags', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tags, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tags = ['nonExistingTag1', 'nonExistingTag2'];
                    return [4 /*yield*/, dbStub.getPublicationsByTags(tags)];
                case 1:
                    publications = _a.sent();
                    expect(publications).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 153
    it('should handle 1000 users within 2 seconds', function () { return __awaiter(void 0, void 0, void 0, function () {
        var concurrentUsers, maxAcceptableTime, tags, getPublicationsByTags, promises, times;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    concurrentUsers = 1000;
                    maxAcceptableTime = 2000;
                    tags = ['tag1', 'tag2'];
                    getPublicationsByTags = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var publications;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, dbStub.getPublicationsByTags(tags)];
                                case 1:
                                    publications = _a.sent();
                                    expect(publications).toBeDefined();
                                    expect(publications.length).toBeGreaterThan(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    promises = Array.from({ length: concurrentUsers }, function () { return measureTime(getPublicationsByTags); });
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
    //Test ID: 154
    it('should register a publication if receiving a valid publication object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validPublication, publicationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validPublication = new Publication_1.Publication('category1', new Date(), 'description1', 'photo1', ['tag1', 'tag2'], 'publication1');
                    return [4 /*yield*/, dbStub.registerPublication(validPublication)];
                case 1:
                    publicationId = _a.sent();
                    expect(publicationId).toBe("fakePublicationId");
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 155
    it('should reject to register a publication if receiving an invalid publication', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject, publicationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getTags: function () { return ["tag1", "tag2"]; }
                    };
                    return [4 /*yield*/, dbStub.registerPublication(invalidObject)];
                case 1:
                    publicationId = _a.sent();
                    expect(publicationId).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 156
    it('should update a publication if receiving a valid publication object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validPublication, publication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validPublication = new Publication_1.Publication('category1', new Date(), 'description1', 'photo1', ['tag2', 'tag2'], 'publication1');
                    return [4 /*yield*/, dbStub.updatePublication(validPublication)];
                case 1:
                    publication = _a.sent();
                    expect(publication).toBe("fakePublicationId");
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 157
    it('should reject to update a publication if receiving an invalid publication', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject, publicationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getTags: function () { return ["tag1", "tag2"]; }
                    };
                    return [4 /*yield*/, dbStub.updatePublication(invalidObject)];
                case 1:
                    publicationId = _a.sent();
                    expect(publicationId).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 158
    it('should delete a publication with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var existingPublicationId, deletedPublicationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingPublicationId = '1';
                    return [4 /*yield*/, dbStub.deletePublication(existingPublicationId)];
                case 1:
                    deletedPublicationId = _a.sent();
                    expect(deletedPublicationId).toBe(existingPublicationId);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 159
    it('should reject to delete a publication with a non-existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingPublicationId, publicationId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingPublicationId = 'nonExistingPublicationId';
                    return [4 /*yield*/, dbStub.deletePublication(nonExistingPublicationId)];
                case 1:
                    publicationId = _a.sent();
                    expect(publicationId).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
