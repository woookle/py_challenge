import Reportlist from "../models/Reportlist.js";

export const sendReport = async (req, res) => {
  try {
    const reporter = req.user._id;
    const intruder = req.params.id;
    const complaint = req.body.complaint;

    const newReport = Reportlist.create({
      intruder,
      reporter,
      complaint
    })
    await newReport.save();
    return res.status(200).json({ message: "Жалоба была отправлена!" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера!" })
  }
}

