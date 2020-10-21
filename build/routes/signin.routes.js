"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_controllers_1 = require("../controllers/signIn.controllers");
class SignInRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/', signIn_controllers_1.signInController.SignIn);
    }
}
const signInRoutes = new SignInRoutes();
exports.default = signInRoutes.router;
