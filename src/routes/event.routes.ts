import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";

const router: Router = require("express").Router();
const eventController = require("../controller/event.controller");

router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);
router.post("/", verifyJWT, eventController.post);
router.put("/:id", verifyJWT, eventController.put);
router.delete("/:id", verifyJWT, eventController.remove);

module.exports = router;
