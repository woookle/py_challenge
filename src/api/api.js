import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_API_PORT}`,
  withCredentials: true,
});

// Запросы для авторизации
export const register = async (userData) => {
  return await instance.post('/user/auth/register', userData);
};

export const login = async (userData) => {
  return await instance.post('/user/auth/login', userData);
};

export const logout = async () => {
  return await instance.post('/user/auth/logout');
}

// Запросы для задач
export const getTasks = async () => {
  return await instance.get('/task/tasks');
};

export const getTaskById = async (id) => {
  return await instance.get('/task/tasks/' + id)
}

export const createTask = async (taskData) => {
  return await instance.post('/task/create', taskData);
};

export const deleteTask = async (taskId) => {
  return await instance.delete(`/task/delete/${taskId}`);
};

// Запросы для профиля пользователя
export const getProfile = async () => {
  return await instance.get('/user/auth/get_me');
};

export const getMyStats = async () => {
  return await instance.get('/user/auth/get_stats');
}

export const uploadAvatar = async (formData) => {
  return await instance.patch('/user/auth/change_avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Запросы для выполнения кода
export const runCode = async (codeData) => {
  return await instance.post('/task/run_code', codeData);
};

// Запрос на получение пользователей
export const getUsers = async () => {
  return await instance.get('/user/')
}

// Запрос на получение данных о пользователе
export const getUserById = async (id) => {
  return await instance.get('/user/' + id)
}