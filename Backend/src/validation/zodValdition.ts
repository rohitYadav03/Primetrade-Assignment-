import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
console.log("result is : ", result);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    // Replace req.body with validated + sanitized data
    req.body = result.data;

    next();
  };
