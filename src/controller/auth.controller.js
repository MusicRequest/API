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
exports.me = exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = __importDefault(require("../utils/logger"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password || username !== "admin") {
        return res.sendStatus(403);
    }
    if (!process.env.admin || !process.env.ACCESS_TOKEN_SECRET_KEY) {
        logger_1.default.error("Variable d'environement manquante (Mot de passe admin)");
        return res.sendStatus(500);
    }
    const match = yield (0, bcrypt_1.compare)(password, process.env.admin);
    if (!match) {
        return res.status(403).send({ error: "Mot de passe incorrect" });
    }
    const token = (0, jsonwebtoken_1.sign)({}, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "30d",
    });
    logger_1.default.info("Connection d'un admin");
    return res.status(200).send({ token });
});
exports.login = login;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ status: "ok" });
});
exports.me = me;
