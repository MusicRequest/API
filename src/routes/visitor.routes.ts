import { Router } from "express";

const router: Router = require("express").Router();
const visitorController = require("../controller/visitor.controller");

// router.get("/", templateRouter.getAll);
// router.get("/:id", templateRouter.getById);
router.post("/", visitorController.post);
// router.put("/:id", templateRouter.put);
// router.delete("/:id", templateRouter.remove);

// Spécific Route
router.get("/:id/verify/:eventId", visitorController.verify);

module.exports = router;
