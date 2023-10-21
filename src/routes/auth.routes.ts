import { Response, Router, Request } from "express";

const router: Router = require("express").Router();
const authController = require("../controller/auth.controller");

router.get("/", async (req: Request, res: Response): Promise<any> => {
  // const { username, password } = req.body;
  // if (!username || !password) return res.sendStatus(404);
  // await bcrypt
  //   .genSalt(10)
  //   .then((salt: any) => {
  //     console.log("Salt: ", salt);
  //     console.log(bcrypt.hash("admin", salt));
  //     return bcrypt.hash("admin", salt);
  //   })
  //   .then((hash: any) => {
  //     console.log("Hash: ", hash);
  //   })
  //   .catch((err: any) => console.error(err.message));
  // if (!process.env.admin) {
  //   return;
  // }
  // await bcrypt.compare("admin", process.env.admin, function (err, result) {
  //   // result == true
  //   console.log(result);
  //   console.log(err);
  // });
});

router.post("/login", authController.login);

module.exports = router;
