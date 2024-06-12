import { Router } from "express";
import {
  post,
  verify,
  getFromEvent,
  put,
} from "../controller/visitor.controller";
import verifyJWT from "../middleware/verifyJWT";

const router: Router = require("express").Router();

// router.get("/", templateRouter.getAll);
router.get("/:eventId", verifyJWT, getFromEvent);
router.post("/", post);
router.put("/:id", put);
// router.delete("/:id", templateRouter.remove);

// Spécific Route
router.get("/:id/verify/:eventId", verify);

module.exports = router;
