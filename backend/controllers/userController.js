import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: hash,
      role: req.body.role,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 2592000000,
    });

    const { passwordHash, ...userData } = user._doc;

    return res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000 && err.keyPattern.username) {
      return res.status(500).json({ message: "Этот ник уже используется!" });
    }
    if (err.code === 11000 && err.keyPattern.email) {
      return res.status(500).json({ message: "Эта почта уже используется!" });
    }
    return res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      $or: [{ email: req.body.email }, { username: req.body.email }],
    });
    if (!user) {
      return res.status(404).json({
        message: "Такого аккаунта не существует",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 2592000000,
    });

    const { password, ...userData } = user._doc;

    return res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "Вы успешно вышли с аккаунта!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { password, ...userData } = user._doc;

    return res.json({ ...userData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    const userList = users.map((el) => ({
      _id: el._id,
      avatar: el.avatar,
      username: el.username,
      levelIcon: el.levelIcon,
      role: el.role,
      background: el.background,
    }));

    return res.json({ userList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Ошибка!",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id).select("-password -email");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден!" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Ошибка!",
    });
  }
};

export const myStats = async (req, res) => {
  try {
    const currentLevel = req.user.level;
    const user = await UserModel.findById(req.user._id)
      .populate({
        path: "completedTasks.taskID",
        model: "Task",
      })
      .exec();

    const levelThresholds = [
      { level: 1, expRequired: 0 },
      { level: 2, expRequired: 100 },
      { level: 3, expRequired: 300 },
      { level: 4, expRequired: 500 },
      { level: 5, expRequired: 1000 },
    ];

    const nextLevelThreshold = levelThresholds.find(
      (threshold) => threshold.level === currentLevel + 1
    );
    const remainingExp = nextLevelThreshold
      ? ((user.exp / nextLevelThreshold.expRequired) * 100).toFixed(2)
      : 100;

    return res.status(200).json({ remainingExp, tasks: user.completedTasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ошибка!",
    });
  }
};

export const changeAvatar = async (req, res) => {
  try {
    const user = req.user;
    user.avatar = `/uploads/avatars/${req.files["avatar"][0].filename}`;
    await user.save();
    return res
      .status(200)
      .json({ message: "Аватарка успешно изменена!", avatar: user.avatar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ошибка при загрузке аватара!", error: error.message });
  }
};

export const changeBackground = async (req, res) => {
  try {
    const user = req.user;
    user.background = `/uploads/backgrounds/${req.files["background"][0].filename}`;
    await user.save();
    return res.status(200).json({
      message: "Задний фон успешно изменен!",
      background: user.background,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ошибка при загрузке заднего фона!",
      error: error.message,
    });
  }
};

export const changeUsername = async (req, res) => {
  try {
    const user = req.user;
    user.username = req.body.username;
    await user.save();
    return res
      .status(200)
      .json({ message: "Имя успешно изменено!", username: user.username });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ошибка при изменении!", error: error.message });
  }
};

export const updateUserLevel = async (user) => {
  try {
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    let level = 1;
    let levelIcon = "/uploads/levels/level1.png";
    let isLevelUp = false;

    if (user.exp >= 100) {
      level = 2;
      levelIcon = "/uploads/levels/level2.png";
    }
    if (user.exp >= 300) {
      level = 3;
      levelIcon = "/uploads/levels/level3.png";
    }
    if (user.exp >= 500) {
      level = 4;
      levelIcon = "/uploads/levels/level4.png";
    }
    if (user.exp >= 1000) {
      level = 5;
      levelIcon = "/uploads/levels/level5.png";
    }

    if (user.level != level) {
      user.level = level;
      user.levelIcon = levelIcon;
      isLevelUp = true;
    }
    await user.save();
    return isLevelUp;
  } catch (error) {
    console.error("Ошибка при обновлении уровня пользователя", error);
  }
};
