import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../../controller/taskController.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../validation/zodValdition.js";
import { createTaskSchema, updateTaskSchema } from "../../utils/zodSchema.js";

const taskRouter = express.Router();

taskRouter.use(authenticate);

taskRouter.post("/", validate(createTaskSchema), createTask);

taskRouter.get("/", getAllTasks);

taskRouter.get("/:id", getTaskById);

taskRouter.put("/:id", validate(updateTaskSchema), updateTask);

taskRouter.delete("/:id", deleteTask);

export default taskRouter;