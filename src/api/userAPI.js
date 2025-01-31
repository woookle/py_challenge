import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, getProfile, runCode, logout, uploadAvatar, changeBackground, changeUsername } from "./api";
import { toast } from "react-toastify";

// Асинхронное действие для регистрации
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      toast.success(
        `Вы успешно зарегистрировались, ${response.data.username}!`
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронное действие для входа
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      toast.success(`Добро пожаловать, ${response.data.username}!`);
      return response.data;
    } catch (error) {
      toast.error('Неправильный логин или пароль!')
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронное действия для выхода
export const logoutFromAcc = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      toast.success("Вы вышли с аккаунта!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронное действие для получения профиля
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронное действие на изменение аккаунта
export const avatar = createAsyncThunk(
  "auth/changeAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadAvatar(formData);
      toast.info('Аватарка успешно обновлена!')
      return response.data.avatar
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

// Асинхронное действие на изменение заднего фона пользователя
export const background = createAsyncThunk(
  "auth/changeBackground",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await changeBackground(formData);
      toast.info('Задний фон успешно обновлен!')
      return response.data.background
    } catch (error) {
      return rejectWithValue(error.response.data)      
    }
  }
)

// Асинхронное действие на изменение имени пользователя
export const username = createAsyncThunk(
  "auth/changeUsername",
  async (name, { rejectWithValue }) => {
    try {
      const response = await changeUsername(name);
      toast.info('Имя успешно обновлено!')
      return response.data.username
    } catch (error) {
      return rejectWithValue(error.response.data)      
    }
  }
)

// Действие если задание выполнено
export const successTask = createAsyncThunk(
  "auth/successTask",
  async (codeData, { rejectWithValue }) => {
    try {
      const response = await runCode(codeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
