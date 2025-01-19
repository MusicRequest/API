"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = startIo;
const logger_1 = __importDefault(require("../utils/logger"));
const db_server_1 = require("../utils/db.server");
function startIo(io) {
    // io.close();
    io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
        const { idUser, token } = socket.handshake.query;
        console.log(socket.handshake.query);
        if (!idUser)
            return;
        const userExists = (yield db_server_1.db.visitor.findUnique({
            where: {
                id: idUser,
            },
        }));
        if (userExists) {
            // Set id du socket en base de données
            yield db_server_1.db.visitor.update({
                where: {
                    id: userExists.id,
                },
                data: Object.assign(Object.assign({}, userExists), { socketId: socket.id }),
            });
        }
        console.log(socket.handshake.query);
        logger_1.default.error(socket.id, ": Connection websocket");
    }));
}
