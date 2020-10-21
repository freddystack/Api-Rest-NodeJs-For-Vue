"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const conection_1 = __importDefault(require("./db/conection"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
// jwtSecret: process.env.JWT_SECRET || 'screttoken'
///   RUTAS
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const signin_routes_1 = __importDefault(require("./routes/signin.routes"));
const commentary_routes_1 = __importDefault(require("./routes/commentary.routes"));
class server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //// userfreddy passfreddy
    config() {
        conection_1.default.conec();
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(passport_1.default.initialize());
        passport_1.default.use(passport_2.default);
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/api/post', passport_1.default.authenticate('jwt', { session: false }), post_routes_1.default);
        this.app.use('/api/user', /* passport.authenticate('jwt',{ session: false})  , */ user_routes_1.default);
        this.app.use('/api/signin', signin_routes_1.default);
        this.app.use('/api/commentary', commentary_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`SERVER ON PORT ${this.app.get('port')}`);
        });
    }
}
exports.server = server;
const serve = new server();
serve.start();
