import Banlist from "../models/Banlist.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getBanlist = async (req, res) => {
  try {
    const list = await Banlist.find().populate('byAdmin');
    return res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const BanById = async (req, res) => {
  try {
    const id = req.params.id;
    const reason = req.body.reason;
    const admin = req.user._id;
    const adminRole = req.user.role;
    if (!reason) {
      return res.status(400).json({
        message: "Причина не введена!",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден!",
      });
    }
    if(adminRole != 'mainAdmin' && user.role === 'mainAdmin') {
      return res.status(404).json({ message: "Недостаточно прав!" })
    }
    await Task.deleteMany({ author: user._id });
    await User.findByIdAndDelete(id);
    await Banlist.create({
      ...user.toObject(),
      reason,
      byAdmin: admin,
    });
    return res.status(200).json({
      message: `Пользователь ${user.username} был забанен по причине ${reason}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const unBanById = async (req, res) => {
  try {
    const id = req.params.id;
    const bannedUser = await Banlist.findById(id);
    if (!bannedUser) {
      return res
        .status(404)
        .json({ message: "Пользователь не найден в бан-листе!" });
    }
    const { reason, banDate, ...userData } = bannedUser.toObject();
    await User.create(userData);
    await Banlist.findByIdAndDelete(id);
    return res.status(200).json({
      message: `Пользователь ${bannedUser.username} был успешно разбанен.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Задание не найдено!" });
    }
    return res.status(200).json({
      message: `Задание '${deletedTask.task}' было успешно удалено!`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const assignAdminRole = async (req, res) => {
  try {
    const id = req.params.id;
    const user = User.findById(id);
    if(!user) {
      return res.status(404).json({ message: "Пользователь не найден!" })
    }
    user.role = 'admin';
    await user.save();
    return res.status(200).json({ message: `Вы выдали пользователю ${user.username} права администратора` })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Внутрення ошибка сервера" })
  }
}

export const downgradeAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const user = User.findById(id);
    if(!user) {
      return res.status(404).json({ message: "Пользователь не найден!" })
    }
    user.role = 'player';
    await user.save();
    return res.status(200).json({ message: `Вы отобрали права админа у пользователя ${user.username}` })
  } catch (error) {
    
  }
}