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
var PublicationDAO_1 = require("../PublicationDAO");
var Publication_1 = require("../../models/Publication");
var testDatabase_1 = require("./testDatabase");
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_1 = require("mongodb");
describe('PublicationDAO Integration Tests', function () {
    var publicationDAO;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, testDatabase_1.connectDB)()];
                case 1:
                    _a.sent();
                    publicationDAO = new PublicationDAO_1.PublicationDAO();
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
    //Test ID: 143
    it('should get a publication with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validPublication, result, fetchedPublication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validPublication = new Publication_1.Publication('652aed63e7ae5f6d676bc0f1', new Date(), 'description2', 'photo2', ['tag1', 'tag2']);
                    return [4 /*yield*/, publicationDAO.registerPublication(validPublication)];
                case 1:
                    result = _a.sent();
                    publicationId = result;
                    return [4 /*yield*/, publicationDAO.getPublication(publicationId)];
                case 2:
                    fetchedPublication = _a.sent();
                    expect(fetchedPublication).toBeDefined();
                    expect(fetchedPublication._id.equals(publicationId)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 144
    it('should reject to get a publication with a non-existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingPublicationId, fetchedPublication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingPublicationId = new mongoose_1.default.Types.ObjectId().toString();
                    return [4 /*yield*/, publicationDAO.getPublication(nonExistingPublicationId)];
                case 1:
                    fetchedPublication = _a.sent();
                    expect(fetchedPublication).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 145
    it('should get a publication for 100 recurrent users in an acceptable time (0 to 10 seconds)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var numUsers, maxAcceptableTime, getPublicationTime, getPublicationPromises, getPublicationTimes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numUsers = 100;
                    maxAcceptableTime = 10000;
                    getPublicationTime = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    start = Date.now();
                                    return [4 /*yield*/, publicationDAO.getPublications()];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    getPublicationPromises = Array.from({ length: numUsers }, function () { return getPublicationTime(); });
                    return [4 /*yield*/, Promise.all(getPublicationPromises)];
                case 1:
                    getPublicationTimes = _a.sent();
                    getPublicationTimes.forEach(function (time) {
                        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 146
    it('should get all publications in an acceptable time (0 to 2 seconds)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var maxAcceptableTime, startTime, publications, endTime, elapsedTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maxAcceptableTime = 10000;
                    startTime = Date.now();
                    return [4 /*yield*/, publicationDAO.getPublications()];
                case 1:
                    publications = _a.sent();
                    endTime = Date.now();
                    elapsedTime = endTime - startTime;
                    expect(publications.length).toBeGreaterThan(0);
                    expect(elapsedTime).toBeLessThanOrEqual(maxAcceptableTime);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 147
    it('should return an empty array when there are no publications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(publicationDAO, 'getPublications').mockResolvedValue([]);
                    return [4 /*yield*/, publicationDAO.getPublications()];
                case 1:
                    publications = _a.sent();
                    expect(publications).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 148
    it('should return an empty array when there are no publications with a non-existent tag', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistentTag, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistentTag = 'nonexistenttag';
                    return [4 /*yield*/, publicationDAO.getPublicationsByTags([nonExistentTag])];
                case 1:
                    publications = _a.sent();
                    expect(publications.length).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 149
    it('should reject getting publications with a non-existing category ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingCategoryId, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingCategoryId = new mongodb_1.ObjectId().toHexString();
                    return [4 /*yield*/, publicationDAO.getPublicationsByCategory(nonExistingCategoryId)];
                case 1:
                    publications = _a.sent();
                    expect(publications).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 150
    it('should get all publications with an existing category in an acceptable time (0 to 2 seconds) for 100 users at the same time', function () { return __awaiter(void 0, void 0, void 0, function () {
        var concurrentUsers, maxAcceptableTime, getPublicationsByCategory, promises, times;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    concurrentUsers = 100;
                    maxAcceptableTime = 2000;
                    getPublicationsByCategory = function (categoryId) { return __awaiter(void 0, void 0, void 0, function () {
                        var start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    start = Date.now();
                                    return [4 /*yield*/, publicationDAO.getPublicationsByCategory(categoryId)];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    promises = Array.from({ length: concurrentUsers }, function () {
                        var categoryId = '652aedc6e7ae5f6d676bc58b';
                        return getPublicationsByCategory(categoryId);
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
    //Test ID: 151
    it('should get all publications with existing tags', function () { return __awaiter(void 0, void 0, void 0, function () {
        var existingTags, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingTags = ['Marvel', 'Morado', 'Azúl'];
                    return [4 /*yield*/, publicationDAO.getPublicationsByTags(existingTags)];
                case 1:
                    publications = _a.sent();
                    expect(publications.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 152
    it('should return an empty array when there are no publications with a non-existent tag', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistentTag, publications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistentTag = 'nonexistenttag';
                    return [4 /*yield*/, publicationDAO.getPublicationsByTags([nonExistentTag])];
                case 1:
                    publications = _a.sent();
                    expect(publications.length).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 153
    it('should get all publications with an existing tag in an acceptable time (0 to 2 seconds) for 100 users at the same time', function () { return __awaiter(void 0, void 0, void 0, function () {
        var concurrentUsers, maxAcceptableTime, existingTags, getPublications, start, promises, times, end, totalTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    concurrentUsers = 100;
                    maxAcceptableTime = 2000;
                    existingTags = ['Marvel', 'Morado', 'Azúl'];
                    getPublications = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var start, end;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    start = Date.now();
                                    return [4 /*yield*/, publicationDAO.getPublicationsByTags(existingTags)];
                                case 1:
                                    _a.sent();
                                    end = Date.now();
                                    return [2 /*return*/, end - start];
                            }
                        });
                    }); };
                    start = Date.now();
                    promises = Array.from({ length: concurrentUsers }, function () { return getPublications(); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    times = _a.sent();
                    end = Date.now();
                    totalTime = end - start;
                    times.forEach(function (time) {
                        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
                    });
                    console.log("Total time for ".concat(concurrentUsers, " users: ").concat(totalTime, " milliseconds"));
                    return [2 /*return*/];
            }
        });
    }); });
    //Test ID: 154
    var publicationId;
    // Test ID: 160
    it('should register a publication if receiving a valid publication object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validPublication, result, registeredPublication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validPublication = new Publication_1.Publication('652aed63e7ae5f6d676bc0f1', new Date(), 'description1', 'photo1', ['tag1', 'tag2']);
                    return [4 /*yield*/, publicationDAO.registerPublication(validPublication)];
                case 1:
                    result = _a.sent();
                    publicationId = result;
                    expect(publicationId).toBeDefined();
                    return [4 /*yield*/, publicationDAO.getPublication(publicationId)];
                case 2:
                    registeredPublication = _a.sent();
                    expect(registeredPublication.description).toBe('description1');
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 155
    it('should reject to register a publication if receiving an invalid object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getCategoryID: function () { return "invalidCategory"; }
                    };
                    return [4 /*yield*/, expect(publicationDAO.registerPublication(invalidObject)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 156
    it('should update a publication if receiving a valid publication object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validPublication, result, publicationId, updatedPublication, updateResult, fetchedPublication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validPublication = new Publication_1.Publication('652aed63e7ae5f6d676bc0f1', new Date(), 'description1', 'photo1', ['tag1', 'tag2']);
                    return [4 /*yield*/, publicationDAO.registerPublication(validPublication)];
                case 1:
                    result = _a.sent();
                    publicationId = result;
                    updatedPublication = new Publication_1.Publication('652aed63e7ae5f6d676bc0f1', new Date(), 'updated description', 'updated photo', ['tag1', 'tag3']);
                    updatedPublication.setID(publicationId);
                    return [4 /*yield*/, publicationDAO.updatePublication(updatedPublication)];
                case 2:
                    updateResult = _a.sent();
                    expect(updateResult).toBeTruthy(); // Ensure update was successful
                    return [4 /*yield*/, publicationDAO.getPublication(publicationId)];
                case 3:
                    fetchedPublication = _a.sent();
                    expect(fetchedPublication.description).toBe('updated description');
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 157
    it('should return null if receiving an invalid object to update', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidObject = {
                        getDescription: function () { return "Description"; },
                        getCategoryID: function () { return "invalidCategory"; }
                    };
                    return [4 /*yield*/, expect(publicationDAO.updatePublication(invalidObject)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 158
    it('should delete a publication with an existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deleteResult, fetchedPublication;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, publicationDAO.deletePublication(publicationId)];
                case 1:
                    deleteResult = _a.sent();
                    expect(deleteResult.deletedCount).toBe(1);
                    return [4 /*yield*/, publicationDAO.getPublication(publicationId)];
                case 2:
                    fetchedPublication = _a.sent();
                    expect(fetchedPublication).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test ID: 159
    it('should reject to delete a publication with a non-existing ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nonExistingPublicationId, deleteResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nonExistingPublicationId = new mongoose_1.default.Types.ObjectId().toString();
                    return [4 /*yield*/, publicationDAO.deletePublication(nonExistingPublicationId)];
                case 1:
                    deleteResult = _a.sent();
                    expect(deleteResult.deletedCount).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
