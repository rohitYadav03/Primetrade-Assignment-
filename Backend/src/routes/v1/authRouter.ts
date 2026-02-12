import express from "express"
import { getMe, loginUser, registerUser } from "../../controller/authController.js";
import { validate } from "../../validation/zodValdition.js";
import { loginSchema, signUpSchema } from "../../utils/zodSchema.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",validate(signUpSchema),registerUser  )
authRouter.post(
  "/login",
  validate(loginSchema),
  loginUser
);

authRouter.get(
  "/me",
  authenticate,
  getMe
);



export default authRouter;