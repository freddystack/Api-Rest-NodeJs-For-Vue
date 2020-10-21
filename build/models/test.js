"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nuevoSchema = new mongoose_1.default.Schema({
    name: String
});
nuevoSchema.methods.mifuncion = function (para) {
    this.name;
    return para;
};
const nuevo = mongoose_1.default.model('nuevo', nuevoSchema);
exports.default = nuevo;
