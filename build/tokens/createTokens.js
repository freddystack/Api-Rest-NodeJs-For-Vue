"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configSecret_1 = __importDefault(require("./configSecret"));
class tokens {
    constructor() {
        this.CreateToken = (user) => {
            return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, configSecret_1.default.jwSecret, {
                expiresIn: 86400
            });
        };
    }
}
const token = new tokens();
exports.default = token.CreateToken;
