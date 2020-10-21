"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaCommentarys = new mongoose_1.Schema({
    thepost: { type: String, ref: 'post' },
    email: { type: String, required: true, ref: 'user' },
    username: { type: String, required: true, ref: 'user' },
    image: { type: String, required: true, ref: 'user' },
    commentary: { type: String, required: true }
});
exports.default = mongoose_1.model('comment', SchemaCommentarys);
