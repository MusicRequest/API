import { Router } from "express";

const router: Router = require("express").Router();
const templateRouter = require("../controller/template.controller");

router.get("/", templateRouter.getAll);
router.get("/:id", templateRouter.getById);
router.post("/", templateRouter.post);
router.put("/:id", templateRouter.put);
router.delete("/:id", templateRouter.remove);

module.exports = router;
