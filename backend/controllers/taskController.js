import { PythonShell } from "python-shell";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import Task from "../models/Task.js";
import { updateUserLevel } from "./userController.js";

export const runCode = async (req, res) => {
  try {
    const { code, taskId } = req.body;
    const user = req.user;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ message: "Задание не найдено!" });
    }
    if (user.completedTasks.includes(taskId)) {
      return res.status(400).send({ message: "Вы уже выполнили это задание!" });
    }

    const fullCode = `${code}\n\n${task.tests}`;

    const fileName = uuidv4() + ".py";
    const tempDir = path.join(process.cwd(), "temp");
    const filePath = path.join(tempDir, fileName);

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    fs.writeFileSync(filePath, fullCode);
    try {
      PythonShell.run(filePath, { timeout: 5000 })
        .then(async (results) => {
          // fs.unlinkSync(filePath) deleting a file after its execution
          user.completedTasks.push({ answer: code, taskID: taskId });
          user.exp += 100;
          const isLevelUp = await updateUserLevel(user);
          await user.save();

          return res.status(200).json({
            message: "Задача решена правильно! Вам начислено 100 очков опыта!",
            user,
            isLevelUp,
          });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ message: "Ошибка в коде: " + err.message });
        });
    } catch (error) {
      return res.status(500).json({ message: "Ошибка: " + error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, task, functionName, tests } = req.body;
    const userid = req.user._id;

    if (!title || !task || !functionName || !tests) {
      return res.status(400).json({ message: "Заполните все строки!" });
    }

    const newTask = new Task({
      title,
      task,
      functionName,
      tests,
      author: userid,
    });

    await newTask.save();

    res.status(201).json({ message: "Задание создано!", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Ошибка создания задания!", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Задание не найдено" });
    }

    res
      .status(200)
      .json({ message: "Задание успешно удалено", task: deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении задания", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("author", "-password");

    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id).populate("author", "-password");

    if (!task) {
      return res.status(404).json({ message: "Задание не найдено!" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
