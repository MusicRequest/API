import { Router } from "express";

const eventRouter = require("./event.routes");
const authRouter = require("./auth.routes");
const visitorRouter = require("./visitor.routes");

const router: Router = require("express").Router();

router.use("/events", eventRouter);
router.use("/auth", authRouter);
router.use("/visitors", visitorRouter);
router.use("/activity-logs", require("./activity.routes"));

router.get("/test", (req, res) => {
  req.io.emit("test");
  return res.status(200).json({ status: "zdz" });
});

export default router;
