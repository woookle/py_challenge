import mongoose from 'mongoose';

const banlistSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  exp: { type: Number, default: 0 },
  completedTasks: [{ answer: { type: String }, taskID: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'} }],
  avatar: { type: String, default: '/uploads/avatars/default.jpg' },
  level: { type: Number, default: 1 },
  levelIcon: { type: String, default: '/uploads/levels/level1.png' },
  background: { type: String, default: 'default' },
  role: { type: String, enum: ['player', 'admin'], default: 'player' },
  reason: { type: String, required: true },
  banDate: { type: Date, default: Date.now },
  byAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model('Banlist', banlistSchema);