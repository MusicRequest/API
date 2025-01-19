"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyJWT;
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = __importDefault(require("../utils/logger"));
function verifyJWT(req, res, next) {
    if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
        logger_1.default.error("Variable d'environement manquante (ACCES_TOKEN)");
        return res.status(500);
    }
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(401)
            .json("Vous n'êtes pas autorisé! Un token valide est nécessaire");
    }
    (0, jsonwebtoken_1.verify)(token.replace("Bearer ", ""), process.env.ACCESS_TOKEN_SECRET_KEY, (err) => {
        if (err) {
            return res.status(401).json({
                auth: false,
                errorMessage: "L'authentification a échouée",
                status: 401,
            });
        }
        next();
    });
}
