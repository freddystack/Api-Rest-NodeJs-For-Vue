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
exports.postController = void 0;
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
class PostController {
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.headers.authorization);
            const Pots = yield post_1.default.find();
            res.json(Pots);
        });
    }
    getOnePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params._id;
            const onepost = yield post_1.default.findOne({ _id: id }).populate('commentarys');
            res.json(onepost);
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url, titulo, descripcion, imagen, username, email, image, handup, handdown } = req.body;
                if ((!titulo || !descripcion) || (!username || !email)) {
                    return res.status(401).json({ mensaje: 'DEBE DE ENVIAR LOS CAMPOS REQUERIDOS' });
                }
                const USER = yield user_1.default.findOne({ email });
                if (!USER) {
                    return res.status(401).json({ mensaje: 'ESTE USUARIO NO EXISTE EN LA DB' });
                }
                console.log(req.body);
                const NEWPOST = new post_1.default({ url, titulo, descripcion, imagen, username, email, image, handup, handdown });
                yield NEWPOST.save();
                return res.json(NEWPOST);
            }
            catch (error) {
                return res.status(400).json({ mensaje: error });
            }
        });
    }
    puntuation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   5f5d5ee038d97e3fd4af6d90
                const body = req.body;
                const id = req.params._id;
                //const USER = await post.findOne({url})
                console.log("DATOS   " + id, body);
                let postUpdate = yield post_1.default.findOne({ _id: id });
                if (!postUpdate) {
                    console.log("ESTE ESUARIO NO EXISTE ");
                }
                const updateOne = yield post_1.default.findOneAndUpdate({ _id: id }, body, { new: true });
                return res.json({ updated: updateOne });
            }
            catch (error) {
                return res.json({ error: "NO EXISTE ESTE USUARIO" });
            }
            // const NEWPUNT = new post({handup,handdown});
            // await NEWPUNT.save()
            // res.json({json : NEWPUNT})
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // DATOS DESDE EL BODY Y PARAMNS
                const { commentarys, titulo, descripcion, imagen, handup, handdown } = req.body;
                const body = req.body;
                const COMMENTARY = req.body.commentarys;
                const id = req.params._id;
                console.log(id, body);
                if (COMMENTARY) {
                    yield post_1.default.findOneAndUpdate({ _id: id }, { $push: { commentarys: COMMENTARY } });
                    return res.json({ mensaje: 'SE AÑADIDO UN NUEVO COMMENTARIO' });
                }
                // HAY TRES UPDATE PARA EL POST
                const POST = yield post_1.default.findOne({ _id: id });
                if (POST) {
                    const POSTUPDATE = yield post_1.default.findOneAndUpdate({ _id: id }, body, { new: true });
                    return res.json(POSTUPDATE);
                }
            }
            catch (error) {
                return res.send("NO EXISTE " + error);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params._id;
            yield post_1.default.findOneAndDelete({ _id: id });
            return res.status(200).json({ mensaje: 'Post Eliminated' });
        });
    }
}
exports.postController = new PostController();
