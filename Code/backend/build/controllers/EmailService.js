"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
var nodemailer = __importStar(require("nodemailer"));
var EmailService = /** @class */ (function () {
    function EmailService() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "codeduende@gmail.com",
                pass: "btkhgxybyxemyqjq",
            },
        });
    }
    EmailService.prototype.sendEmail = function (email, subject, content) {
        // Configura el contenido del correo
        var mailOptions = {
            from: "codeduende@gmail.com",
            to: email,
            subject: subject,
            text: content,
        };
        // Envía el correo
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error al enviar el correo:", error);
            }
            else {
                console.log("Correo electrónico enviado:", info.response);
            }
        });
    };
    return EmailService;
}());
exports.EmailService = EmailService;
