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
exports.userController = void 0;
const user_1 = __importDefault(require("../models/user"));
const createTokens_1 = __importDefault(require("../tokens/createTokens"));
const encryptpass_1 = __importDefault(require("../encrypt/encryptpass"));
/* export const CreateToken = (user: IUser ) =>{
  return jwt.sign({id : user.id, email: user.email  } , config.jwSecret ,{
      expiresIn: 86400
  })

} */
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const User = yield user_1.default.find();
            res.json(User);
        });
    }
    getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params._id;
            const oneuser = yield user_1.default.findOne({ _id: id }).populate('post');
            return res.json(oneuser);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, firsname, lastname, image, post } = req.body;
                console.log(req.body);
                if ((!username || !password) || (!email || !firsname)) {
                    return res.status(204).json({ mensajw: "ENVIA TODOS LOS CAMPOS" });
                }
                const USER = yield user_1.default.findOne({ email });
                if (USER) {
                    return res.status(206).json({ mensaje: 'ESTE USUARIO YA ISXISTE' });
                }
                const NEWUSER = new user_1.default({ username, email, password, firsname, lastname, image, post });
                yield NEWUSER.save();
                console.log("CREADOS");
                // return res.send("ACEEPT ")
                return res.status(201).json({ token: createTokens_1.default(NEWUSER) });
            }
            catch (error) {
                return res.status(400).json({ mensaje: 'HA OCURRIDO UN ERROR' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const postParametro = req.body.post;
            const id = req.params._id;
            console.log(req.body);
            if (req.body.password) {
                body.password = yield encryptpass_1.default.encryptPass(body.password);
            }
            if (postParametro) {
                yield user_1.default.findOneAndUpdate({ _id: id }, { $push: { post: postParametro } });
                return res.json({ mensaje: 'SE AÑADIDO UN NUEVO POST' });
            }
            const US = yield user_1.default.findOneAndUpdate({ _id: id }, body, { new: true });
            console.log(US);
            return res.json({ mensaje: 'updateOne' });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params._id;
            yield user_1.default.findOneAndDelete({ _id: id });
            return res.json({ mensaje: "USER DALETED" });
        });
    }
}
exports.userController = new UserController();
