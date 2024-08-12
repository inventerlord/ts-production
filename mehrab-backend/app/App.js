"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("../routes/routes"));
const routeNotFoundMiddleware_1 = __importDefault(require("../middlewares/routeNotFoundMiddleware"));
const defaultErrorHandler_1 = __importDefault(require("../middlewares/defaultErrorHandler"));
class App {
    constructor({ port }) {
        this.port = port;
        this.serverInit();
        this.loadPlugins();
        this.loadRoutes();
        this.loadExceptionMiddlewares();
    }
    serverInit() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
    }
    loadPlugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:5173',
            optionsSuccessStatus: 200,
            credentials: true
        }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, compression_1.default)());
    }
    loadRoutes() {
        this.app.use('/api/v1', routes_1.default);
    }
    loadExceptionMiddlewares() {
        this.app.use(routeNotFoundMiddleware_1.default);
        this.app.use(defaultErrorHandler_1.default);
    }
    startServer() {
        this.server.listen(this.port, () => {
            console.log(`[Server]: Running On http://localhost:${this.port}`);
            console.log(`[Process ID]: PID ${process.ppid}`);
        });
    }
}
exports.default = App;
