import { Router } from "express";

const router: Router = require("express").Router();
const activityRouter = require("../controller/activity.controller");

router.get("/:eventId", activityRouter.getAll);
// router.get("/:id", templateRouter.getById);
// router.post("/", templateRouter.post);
// router.put("/:id", templateRouter.put);
// router.delete("/:id", templateRouter.remove);

module.exports = router;
