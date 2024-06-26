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
exports.CalendarDAO = void 0;
var date_fns_1 = require("date-fns");
var calendarEventS_1 = __importDefault(require("../schemas/calendarEventS"));
var CalendarDAO = /** @class */ (function () {
    function CalendarDAO() {
    }
    CalendarDAO.prototype.registerEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var newEvent, regEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newEvent = new calendarEventS_1.default({
                            date: event.getDate(),
                            duration: event.getDuration(),
                            description: event.getDescription(),
                            type: event.getType(),
                            customFields: event.getCustomFields(),
                        });
                        return [4 /*yield*/, newEvent.save()];
                    case 1:
                        regEvent = _a.sent();
                        return [2 /*return*/, regEvent];
                }
            });
        });
    };
    CalendarDAO.prototype.updateEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var userTimeZone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("EN EL DAO");
                        console.log(new Date());
                        userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        console.log("User Time Zone:", userTimeZone);
                        return [4 /*yield*/, calendarEventS_1.default.updateOne({ _id: event.getEventId() }, {
                                date: event.getDate(),
                                duration: event.getDuration(),
                                description: event.getDescription(),
                                type: event.getType(),
                                customFields: event.getCustomFields(),
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CalendarDAO.prototype.deleteEvent = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, calendarEventS_1.default.deleteOne({ _id: eventId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CalendarDAO.prototype.getEvent = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, calendarEventS_1.default.findOne({ _id: eventId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CalendarDAO.prototype.getEventsInRange = function (initDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, calendarEventS_1.default.find({
                            date: {
                                $gte: initDate,
                                $lte: endDate,
                            },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CalendarDAO.prototype.getEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, calendarEventS_1.default.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CalendarDAO.prototype.overlaps = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var eventInit, eventEnd, overlap, events, _i, events_1, calEvent, eventInit2, eventEnd2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventInit = new Date(event.getDate());
                        eventEnd = (0, date_fns_1.addHours)(eventInit, event.getDuration());
                        overlap = false;
                        return [4 /*yield*/, this.getEvents()];
                    case 1:
                        events = _a.sent();
                        // Por cada evento del día verificamos si chocan las horas
                        for (_i = 0, events_1 = events; _i < events_1.length; _i++) {
                            calEvent = events_1[_i];
                            // Ignoramos el propio evento si ya estuviera registrado
                            if (calEvent._id.toString() === event.getEventId()) {
                                continue;
                            }
                            eventInit2 = new Date(calEvent.date);
                            if (eventInit <= eventInit2 && eventInit2 < eventEnd) {
                                overlap = true;
                                break;
                            }
                            eventEnd2 = (0, date_fns_1.addHours)(eventInit2, calEvent.duration);
                            if (eventInit < eventEnd2 && eventEnd2 < eventEnd) {
                                overlap = true;
                                break;
                            }
                        }
                        return [2 /*return*/, overlap];
                }
            });
        });
    };
    return CalendarDAO;
}());
exports.CalendarDAO = CalendarDAO;
