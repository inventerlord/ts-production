"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketServer {
    constructor(nodeServer) {
        this.ioServer = new socket_io_1.Server(nodeServer, {
            cors: {
                origin: "*"
            }
        });
        this.ioServer.on('connection', (socket) => {
            console.log(socket.id);
            console.log("User Connected");
            socket.on('join-room', (data) => {
                socket.join(data.roomId);
                socket.to(data.roomId).emit("user-connected");
            });
            socket.on('disconnect', () => {
                console.log('User Disconnected');
            });
        });
    }
}
exports.default = SocketServer;
