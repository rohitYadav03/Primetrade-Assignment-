import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  createTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "../service/taskService.js";

export async function createTask(req: AuthRequest, res: Response) {
  try {
    const { title, description, status, priority } = req.body;
    const userId = Number(req.user?.id);

    const task = await createTaskService({
      title,
      description,
      status,
      priority,
      userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function getAllTasks(req: AuthRequest, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const isAdmin = req.user?.role === "Admin";

    const tasks = await getAllTasksService(userId, isAdmin);

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function getTaskById(req: AuthRequest, res: Response) {
  try {
    const taskId = Number(req.params.id);
    const userId = Number(req.user?.id);
    const isAdmin = req.user?.role === "Admin";

    const task = await getTaskByIdService(taskId);

    if (!isAdmin && task.userId !== userId) {
      return res.status(403).json({
        message: "You don't have permission to view this task",
      });
    }

    return res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error: any) {
    if (error.message === "Task not found") {
      return res.status(404).json({
        message: error.message,
      });
    }
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateTask(req: AuthRequest, res: Response) {
  try {
    const taskId = Number(req.params.id);
    const userId = Number(req.user?.id);
    const isAdmin = req.user?.role === "Admin";
    const updateData = req.body;

    const task = await updateTaskService(taskId, userId, isAdmin, updateData);

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error: any) {
    if (error.message === "Task not found") {
      return res.status(404).json({
        message: error.message,
      });
    }
    if (error.message.includes("permission")) {
      return res.status(403).json({
        message: error.message,
      });
    }
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  try {
    const taskId = Number(req.params.id);
    const userId = Number(req.user?.id);
    const isAdmin = req.user?.role === "Admin";

    const result = await deleteTaskService(taskId, userId, isAdmin);

    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Task not found") {
      return res.status(404).json({
        message: error.message,
      });
    }
    if (error.message.includes("permission")) {
      return res.status(403).json({
        message: error.message,
      });
    }
    return res.status(400).json({
      message: error.message,
    });
  }
}