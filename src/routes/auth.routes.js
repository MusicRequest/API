"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const auth_controller_1 = require("../controller/auth.controller");
router.post("/login", auth_controller_1.login);
router.get("/me", verifyJWT_1.default, auth_controller_1.me);
module.exports = router;
