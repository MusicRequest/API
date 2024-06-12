import { Router } from "express";

const eventRouter = require("./event.routes");
const authRouter = require("./auth.routes");
const visitorRouter = require("./visitor.routes");

const router: Router = require("express").Router();

router.use("/events", eventRouter);
router.use("/auth", authRouter);
router.use("/visitors", visitorRouter);

module.exports = router;
