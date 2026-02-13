import express from "express"
import authRouter from "./v1/authRouter.js";
import taskRouter from "./v1/taskRouter.js";

const v1Router = express.Router();

v1Router.use("/auth", authRouter)
v1Router.use("/tasks", taskRouter);

export default v1Router;