import { Router } from "express";

const eventRouter = require("./event.routes");

const router: Router = require("express").Router();

router.use("/events", eventRouter);

module.exports = router;
