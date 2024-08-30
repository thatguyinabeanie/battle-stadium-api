import { object, string } from "zod";

export const signInSchema = object({
  email: string().email("Invalid email").optional(),
  username: string().optional(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(50, "Password must be less than 32 characters"),

}).refine(data => data.email || data.username, {
  message: "Either email or username is required",
  path: ["email", "username"],
});
