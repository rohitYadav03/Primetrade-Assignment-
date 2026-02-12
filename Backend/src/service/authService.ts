import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { prisma } from "../config/prisma.js";
import { Role } from "../generated/prisma/enums.js";

type RegisterProps = {
    name : string
  email: string;
  password: string;
  role: "user" | "admin";
};

type LoginProps = {
  email: string;
  password: string;
};


export async function registerService(user: RegisterProps) {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = await prisma.user.create({
    data: {
        name : user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role === "admin" ? Role.Admin : Role.User,
    },
  });

  const token = generateToken({
    id: String(newUser.id),
    role: newUser.role,
  });

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  };
};


export async function loginService(user: LoginProps) {

    const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: String(existingUser.id),
    role: existingUser.role,
  });

  return {
    user: {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    token,
  };
}

