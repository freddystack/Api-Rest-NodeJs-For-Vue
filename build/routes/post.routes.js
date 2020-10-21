"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', post_controller_1.postController.getPost);
        this.router.get('/:_id', post_controller_1.postController.getOnePost);
        this.router.post('/', post_controller_1.postController.createPost);
        //   this.router.put('/:_id', postController.puntuation )
        this.router.put('/:_id', post_controller_1.postController.updatePost);
        this.router.delete('/:_id', post_controller_1.postController.deletePost);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
