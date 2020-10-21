"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', user_controller_1.userController.getUser);
        this.router.get('/:_id', user_controller_1.userController.getOneUser);
        this.router.post('/', user_controller_1.userController.createUser);
        this.router.put('/:_id', user_controller_1.userController.updateUser);
        this.router.delete('/:_id', user_controller_1.userController.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
