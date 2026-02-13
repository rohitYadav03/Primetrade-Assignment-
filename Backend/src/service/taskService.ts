import { prisma } from "../config/prisma.js";
import { Priority, Status } from "../generated/prisma/enums.js";

type CreateTaskProps = {
  title: string;
  description: string | null;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  userId: number;
};

type UpdateTaskProps = {
  title?: string;
  description?: string | null;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
};

export async function createTaskService(data: CreateTaskProps) {
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status ? Status[data.status] : Status.PENDING,
      priority: data.priority ? Priority[data.priority] : Priority.MEDIUM,
      userId: data.userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return task;
}

export async function getAllTasksService(userId: number, isAdmin: boolean) {
  const tasks = await prisma.task.findMany({
    where: isAdmin ? {} : { userId }, 
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", 
    },
  });

  return tasks;
}

export async function getTaskByIdService(taskId: number) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
}

export async function updateTaskService(
  taskId: number,
  userId: number,
  isAdmin: boolean,
  data: UpdateTaskProps
) {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  if (!isAdmin && existingTask.userId !== userId) {
    throw new Error("You don't have permission to update this task");
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.status && { status: Status[data.status] }),
      ...(data.priority && { priority: Priority[data.priority] }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return updatedTask;
}

export async function deleteTaskService(
  taskId: number,
  userId: number,
  isAdmin: boolean
) {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  if (!isAdmin && existingTask.userId !== userId) {
    throw new Error("You don't have permission to delete this task");
  }

  await prisma.task.delete({
    where: { id: taskId },
  });

  return { message: "Task deleted successfully" };
}