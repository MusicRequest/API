import { Response, Router, Request } from "express";

const router: Router = require("express").Router();
import verifyJWT from "../middleware/verifyJWT";

import { login, me } from "../controller/auth.controller";

router.post("/login", login);
router.get("/me", verifyJWT, me);

module.exports = router;
