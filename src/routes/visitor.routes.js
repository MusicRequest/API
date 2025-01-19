"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_controller_1 = require("../controller/visitor.controller");
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const router = require("express").Router();
// router.get("/", templateRouter.getAll);
router.get("/:eventId", verifyJWT_1.default, visitor_controller_1.getFromEvent);
router.post("/", visitor_controller_1.post);
router.put("/:id", visitor_controller_1.put);
// router.delete("/:id", templateRouter.remove);
// Spécific Route
router.get("/:id/verify/:eventId", visitor_controller_1.verify);
module.exports = router;
