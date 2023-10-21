import { Response, Router, Request } from "express";

const router: Router = require("express").Router();
const authController = require("../controller/auth.controller");
import verifyJWT from "../middleware/verifyJWT";

router.post("/login", authController.login);
router.get("/me", verifyJWT, authController.me);

module.exports = router;
