"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./app/App"));
const MongoDb_1 = __importDefault(require("./database/MongoDb"));
const db_config_1 = __importDefault(require("./config/db.config"));
const logger_utils_1 = __importDefault(require("./utils/logger.utils"));
const helper_utils_1 = require("./utils/helper.utils");
const mongoDb = db_config_1.default.local.mongo;
// const mongoDb = dbConfig.server.mongo;
const app = new App_1.default({ port: process.env.PORT || 8000 });
const myDb = new MongoDb_1.default(mongoDb.uri);
while (!myDb.checkDbServer()) {
    logger_utils_1.default.error('Mongodb Server is Offline Or Not Working');
    (0, helper_utils_1.delay)(1500);
    logger_utils_1.default.info('Retying to Connoct MongoDb Server');
}
myDb.mongodbConnect();
myDb.db.once('open', () => {
    logger_utils_1.default.info('MongoDb Connected Successfully');
    app.startServer();
});
