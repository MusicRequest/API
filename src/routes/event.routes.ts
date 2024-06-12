import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import {
  getAll,
  getById,
  post,
  put,
  remove,
} from "../controller/event.controller";

const router: Router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", verifyJWT, post);
router.put("/:id", verifyJWT, put);
router.delete("/:id", verifyJWT, remove);

module.exports = router;
