import { Router } from "express";

const router: Router = require("express").Router();
const eventController = require("../controller/event.controller");

router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);
router.post("/", eventController.post);
router.put("/:id", eventController.put);
router.delete("/:id", eventController.remove);

module.exports = router;
