import express from "express"
import { loginUser, registerUser } from "../../controller/authController.js";
import { validate } from "../../validation/zodValdition.js";
import { loginSchema, signUpSchema } from "../../utils/zodSchema.js";

const authRouter = express.Router();

authRouter.post("/register",validate(signUpSchema),registerUser  )
authRouter.post(
  "/login",
  validate(loginSchema),
  loginUser
);


export default authRouter;