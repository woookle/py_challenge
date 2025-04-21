import mongoose from 'mongoose';

const reportlistSchema = new mongoose.Schema({
  intruder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  complaint: { type: String, required: true },
  punished: { type: Boolean, default: false }
});

export default mongoose.model('Reportlist', reportlistSchema);