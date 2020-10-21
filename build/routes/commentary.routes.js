"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentary_controller_1 = require("../controllers/commentary.controller");
class CommentaryRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', commentary_controller_1.commentController.getCommentarys);
        this.router.post('/', commentary_controller_1.commentController.addCommentary);
    }
}
const commRoutes = new CommentaryRoutes();
exports.default = commRoutes.router;
