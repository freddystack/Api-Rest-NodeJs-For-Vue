"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//import { ConnectionOptions } from 'tls';
class Conection {
    conec() {
        const USER = "userfreddy";
        const PASS = "passfreddy";
        const DBNAME = "NODEJSMONGO";
        const MONGO_URI = `mongodb+srv://userfreddy:passfreddy@cluster0.qe72a.mongodb.net/NODEJSMONGO?retryWrites=true&w=majority`;
        const dbOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        };
        mongoose_1.default.set('useFindAndModify', true); // useUnifiedTopology: true
        mongoose_1.default.connect(MONGO_URI || process.env.MONGO_URL, dbOptions)
            .then(bd => console.log('DB IS CONECTED'))
            .catch(err => {
            console.log(err);
            process.exit(0);
        });
    }
}
const conexion = new Conection();
exports.default = conexion;
