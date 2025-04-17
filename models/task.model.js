import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['pending', 'done'], required: true },
  dueDate: { type: Date, required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task; // ✅ default export
