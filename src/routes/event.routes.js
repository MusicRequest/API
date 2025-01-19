"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const event_controller_1 = require("../controller/event.controller");
const router = require("express").Router();
router.get("/", event_controller_1.getAll);
router.get("/:id", event_controller_1.getById);
router.post("/", verifyJWT_1.default, event_controller_1.post);
router.put("/:id", verifyJWT_1.default, event_controller_1.put);
router.delete("/:id", verifyJWT_1.default, event_controller_1.remove);
module.exports = router;
