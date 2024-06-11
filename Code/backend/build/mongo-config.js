"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var url = "mongodb+srv://nottwithtt:Nicolita1998+@cluster0.gi2w4fi.mongodb.net/DS_Project?retryWrites=true&w=majority";
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.getInstance = function () {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    };
    Database.prototype.connect = function () {
        mongoose_1.default
            .connect(url)
            .then(function () {
            console.log("Database connection successful");
        })
            .catch(function (err) {
            console.error("Database connection error");
        });
    };
    Database.prototype.disconnect = function () {
        return mongoose_1.default
            .disconnect()
            .then(function () {
            console.log("Database disconnection successful");
        })
            .catch(function (err) {
            console.error("Database disconnection error", err);
        });
    };
    return Database;
}());
exports.Database = Database;
