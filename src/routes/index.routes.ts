import { Router } from "express";

const eventRouter = require("./event.routes");
const authRouter = require("./auth.routes");

const router: Router = require("express").Router();

router.use("/events", eventRouter);
router.use("/auth", authRouter);

module.exports = router;
