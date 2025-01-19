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
exports.remove = exports.put = exports.post = exports.getById = exports.getAll = void 0;
const db_server_1 = require("../utils/db.server");
const logger_1 = __importDefault(require("../utils/logger"));
const enum_1 = require("../utils/enum");
const ENTITY = enum_1.Entity.Event;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Récupération des évents");
    try {
        const eventList = yield db_server_1.db[ENTITY].findMany({});
        return res.json(eventList).status(200);
    }
    catch (e) {
        logger_1.default.error("Erreur: " + e);
        return res.status(500).json({ status: "Une Erreur est survenue" });
    }
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        return res.sendStatus(400);
    logger_1.default.info(`Récupération id:${req.params.id}`);
    try {
        const event = yield db_server_1.db[ENTITY].findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!event)
            res.status(404);
        return res.status(200).json(event);
    }
    catch (e) {
        return res.status(500).json({ status: "Une Erreur est survenue" });
    }
});
exports.getById = getById;
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Création de ressouce id:${req.params.id}`);
    try {
        const event = yield db_server_1.db[ENTITY].create({ data: Object.assign({}, req.body) });
        return res.json(event).status(201);
    }
    catch (e) {
        logger_1.default.error("Une erreur c'est produite");
        logger_1.default.error(e);
        return res.status(500).json({ status: "Une Erreur est survenue" });
    }
});
exports.post = post;
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Modification de ressouce id:${req.params.id}`);
    try {
        const event = yield db_server_1.db[ENTITY].update({
            where: {
                id: req.params.id,
            },
            data: Object.assign({}, req.body),
        });
        return res.json(event).status(202);
    }
    catch (e) {
        return res.json({ status: "Une Erreur est survenue" }).status(500);
    }
});
exports.put = put;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Suppression de ressouce id:${req.params.id}`);
    try {
        yield db_server_1.db[ENTITY].delete({
            where: {
                id: req.params.id,
            },
        });
        return res.sendStatus(204);
    }
    catch (e) {
        return res.json({ status: "Une Erreur est survenue" }).status(500);
    }
});
exports.remove = remove;
