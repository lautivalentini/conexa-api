import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required." }).email(
      "Invalid email."
    ),
    password: string({ required_error: "Password is required." })
      .min(8, "Password must be more than 8 characters.")
      .max(32, "Password must be less than 32 characters."),
  }),
});

export const authenticateUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required." }).email(
      "Invalid email."
    ),
    password: string({ required_error: "Password is required." })
      .min(8, "Invalid password.")
      .max(32, "Invalid password."),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type AuthenticateUserInput = TypeOf<
  typeof authenticateUserSchema
>["body"];
