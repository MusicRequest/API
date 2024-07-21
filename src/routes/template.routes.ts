import { Router } from "express";
import {
  getAll,
  getById,
  post,
  put,
  remove,
} from "../controller/template.controller";

const router: Router = require("express").Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", put);
router.delete("/:id", remove);

module.exports = router;
