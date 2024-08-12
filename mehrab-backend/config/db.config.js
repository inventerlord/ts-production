"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    local: {
        mongo: {
            uri: "mongodb://127.0.0.1:27017/mehrab-backend",
        }
    },
    server: {
        mongo: {
            uri: "mongodb+srv://mehrab:WcIzxdzPsV6Ia8af@mehrab.e56uv.mongodb.net/mehrab_db",
        }
    },
};
exports.default = dbConfig;
