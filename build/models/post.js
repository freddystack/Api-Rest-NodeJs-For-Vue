"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    url: { type: String, required: true, unique: true, lowercase: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    handup: { type: Number },
    handdown: { type: Number },
    createAt: { type: Date, default: Date.now },
    updatedAt: Date,
    imagen: { type: String },
    username: { type: String, ref: 'user' },
    email: { type: String, ref: 'user' },
    image: { type: String, ref: 'user' },
    commentarys: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'comment'
        }]
});
exports.default = mongoose_1.model('post', PostSchema);
