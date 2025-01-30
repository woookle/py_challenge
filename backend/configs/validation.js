import { body } from "express-validator";

export const loginValidation = [
  body("password", "Пароль должен быть минимум 8 символов").isLength({
    min: 8,
  }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 8 символов").isLength({
    min: 8,
  }),
  body("username", "Укажите имя").isLength({ min: 3 }),
];