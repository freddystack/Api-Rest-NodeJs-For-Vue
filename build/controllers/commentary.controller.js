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
exports.commentController = void 0;
const commentarys_1 = __importDefault(require("../models/commentarys"));
const user_1 = __importDefault(require("../models/user"));
class CommentaryController {
    addCommentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, username, commentary } = req.body;
                console.log(req.body);
                if (!email || !commentary) {
                    return res.status(400).json({ mensaje: 'Completa los campos por favor' });
                }
                const USER = yield user_1.default.findOne({ email, username });
                if (USER) {
                    var image = USER.image;
                    const COMMENT = new commentarys_1.default({ email, username, commentary, image });
                    yield COMMENT.save();
                    console.log(COMMENT);
                    return res.status(200).json(COMMENT);
                }
                else {
                    console.log("NO EXISTE EN LA DB");
                    return res.status(401).json({ mensaje: 'El usuario que ingresate no existe' });
                }
            }
            catch (error) {
                console.log("ESTE ES EL CATCH NO EXISTE");
                return res.status(404).json({ mensaje: 'ESTE USUARIO NO EXISTE EN LA DB' });
            }
        });
    }
    getCommentarys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const COMMENTARYS = yield commentarys_1.default.find();
                return res.status(200).json(COMMENTARYS);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
}
exports.commentController = new CommentaryController();
