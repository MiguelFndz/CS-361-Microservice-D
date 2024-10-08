import express from "express";
import * as UserController from "../controllers/user-controller";

const router = express.Router();

router.post("/", UserController.createUser);

router.post("/login", UserController.login);

export default router;