import type { Request, Response } from "express";
import { loginService, registerService } from "../service/authService.js";

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password, role, name } = req.body;

    const { user, token } = await registerService({
      email,
      password,
      role,
      name,
    });

    // Set JWT cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered and logged in successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginService({
      email,
      password,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
