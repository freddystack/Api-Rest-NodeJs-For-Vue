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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInController = exports.com = exports.pass = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createTokens_1 = __importDefault(require("../tokens/createTokens"));
exports.pass = (user) => {
    return user.password;
};
exports.com = (user, pass) => {
    return bcryptjs_1.default.compare(pass, user.password);
};
class SignInController {
    constructor() {
    }
    SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log(email, password);
            if (!email || !password) {
                return res.status(400).send("POR FAVOR INGRESA TODO LOS CAMPOS");
            }
            const USEREMAIL = yield user_1.default.findOne({ email });
            if (!USEREMAIL) {
                return res.status(401).send("Este usuario no existe");
            }
            const IsMatch = yield USEREMAIL.comparePassword(password);
            if (IsMatch) {
                return res.status(200).json({ token: createTokens_1.default(USEREMAIL) });
            }
            return res.status(400).send("ESTE ES EL MENSAJE 400");
        });
    }
}
exports.signInController = new SignInController();
