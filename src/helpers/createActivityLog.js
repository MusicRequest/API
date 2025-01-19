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
exports.default = createActivityLog;
const logger_1 = __importDefault(require("../utils/logger"));
const db_server_1 = require("../utils/db.server");
const enum_1 = require("../utils/enum");
function createActivityLog(_a) {
    return __awaiter(this, arguments, void 0, function* ({ io, message, eventId, type, }) {
        logger_1.default.info("Création d'un log d'activité");
        try {
            yield db_server_1.db[enum_1.Entity.ActivityLogs].create({
                data: {
                    eventId: eventId,
                    type: type,
                    message: message,
                },
            });
            // io.broadcast.emit(EmitType.NewActivity, ressoure);
        }
        catch (e) {
            logger_1.default.error("Une erreur c'est produite durant la création d'un log d'activité");
            logger_1.default.error("Erreur: ", e);
        }
    });
}
