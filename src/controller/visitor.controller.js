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
exports.put = exports.getFromEvent = exports.verify = exports.post = void 0;
const db_server_1 = require("../utils/db.server");
const logger_1 = __importDefault(require("../utils/logger"));
const createActivityLog_1 = __importDefault(require("../helpers/createActivityLog"));
const enum_1 = require("../utils/enum");
const ENTITY = "visitor";
// const getAll = async (req: Request, res: Response): Promise<Response> => {
//   logger.info(`Récupération de collection (${ENTITY})`);
//   try {
//     const eventList = await db[ENTITY].findMany({});
//     return res.json(eventList).status(200);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     throw new Error("Error...");
//   }
// };
// const getById = async (req: Request, res: Response): Promise<Response> => {
//   if (!req.params.id) return res.sendStatus(400);
//   logger.info(`Récupération id:${req.params.id}`);
//   try {
//     const event = await db[ENTITY].findUnique({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!event) res.status(404);
//     return res.json(event).status(200);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     throw new Error("Error...");
//   }
// };
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Création de ressouce Visitor id:${req.params.id}`);
    const { name, eventId } = req.body;
    if (!name || !eventId) {
        throw new Error("Entrée invalide");
    }
    try {
        const visitor = yield db_server_1.db[ENTITY].create({
            data: { name, eventId, countVoting: 0 },
        });
        console.log(req.io);
        yield (0, createActivityLog_1.default)({
            io: req.io,
            message: `${name.charAt(0).toUpperCase() + name.slice(1)} vient de nous rejoindre !`,
            type: enum_1.ActivityLogsType.JoinUser,
            eventId: eventId,
        });
        return res.json(visitor).status(201);
    }
    catch (e) {
        logger_1.default.error("Une erreur c'est produite");
        return res.json({ status: "Une Erreur est survenue" }).status(500);
    }
});
exports.post = post;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, eventId } = req.params;
    logger_1.default.info(`Vérification du visiteur id:${req.params.id}`);
    if (!id || !eventId) {
        return res.json({ status: "Paramètres manquant" }).status(404);
    }
    //Vérifie que le user Existe
    let user = null;
    try {
        user = yield db_server_1.db[ENTITY].findUnique({
            where: {
                id: req.params.id,
            },
        });
    }
    catch (e) {
        return res
            .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
            .status(404);
    }
    if (!user) {
        return res
            .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
            .status(404);
    }
    //Vérifie que l'event Existe
    let event = null;
    try {
        event = yield db_server_1.db.event.findUnique({
            where: {
                id: req.params.eventId,
            },
        });
    }
    catch (e) {
        return res
            .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
            .status(404);
    }
    if (!event) {
        return res
            .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
            .status(404);
    }
    if ((user === null || user === void 0 ? void 0 : user.eventId) !== eventId) {
        return res.status(404).json({
            status: "Le visiteur ne correspond pas à l'événement en cours.",
        });
    }
    return res.json({ status: "ok" });
});
exports.verify = verify;
const getFromEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Récupération de collection (${ENTITY})`);
    try {
        const visitorList = yield db_server_1.db[ENTITY].findMany({
            where: { eventId: req.params.eventId },
        });
        return res.json(visitorList).status(200);
    }
    catch (e) {
        logger_1.default.error("Erreur: " + e);
        return res.json({ status: "Une Erreur est survenue" }).status(500);
    }
});
exports.getFromEvent = getFromEvent;
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Modification de ressouce id:${req.params.id}`);
    try {
        const event = yield db_server_1.db[ENTITY].update({
            where: {
                id: req.params.id,
            },
            data: Object.assign({}, req.body),
        });
        return res.status(202).json(event);
    }
    catch (e) {
        logger_1.default.error("Erreur: " + e);
        return res.status(202).json("Une erreur c'est produite");
    }
});
exports.put = put;
// const remove = async (req: Request, res: Response) => {
//   logger.info(`Suppression de ressouce id:${req.params.id}`);
//   try {
//     await db[ENTITY].delete({
//       where: {
//         id: req.params.id,
//       },
//     });
//     return res.status(204);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     throw new Error("Error...");
//   }
// };
