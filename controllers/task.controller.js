import Task from '../models/task.model.js';
import { taskValidationSchema } from '../validations/task.validation.js';
import { sendResponse } from '../utils/helpers.js';


export const createTask = async (req, res) => {
  const { error } = taskValidationSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, null, error.details[0].message);
  }

  try {
    const task = await Task.create(req.body);
    return sendResponse(res, 201, task, 'Task created successfully');
  } catch (err) {
    return sendResponse(res, 500, null, 'Failed to create task');
  }
};

// ✅ Get All Tasks or Filtered by Status
export const getTasks = async (req, res) => {
  try {
    const { status, sort } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;

    // Default sort is by dueDate ascending
    let sortOption = { dueDate: 1 };

    // Override with user-provided sort
    if (sort === 'dueDate') {
      sortOption = { dueDate: 1 }; // ascending
    } else if (sort === '-dueDate') {
      sortOption = { dueDate: -1 }; // descending
    }

    // Build and execute the query
    const tasks = await Task.find(filter).sort(sortOption).exec();
   
    let sortDescription = '';
if (sort === '-dueDate') {
  sortDescription = ', sorted by dueDate (descending)';
} else if (sort === 'dueDate') {
  sortDescription = ', sorted by dueDate (ascending)';
} else {
  sortDescription = ''; // No explicit sort requested
}

    // Dynamic message based on input
   
const message = tasks.length
? `Retrieved ${tasks.length} task(s)${status ? ` with status "${status}"` : ''}${sortDescription}`
: 'No tasks found for the specified criteria.';

    return sendResponse(res, 200, tasks, message);
  } catch (err) {
    return sendResponse(res, 500, null, 'Failed to retrieve tasks');
  }
}
// ✅ Task Statistics
export const getTaskStats = async (_req, res) => {
  try {
    const stats = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const result = stats.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, { pending: 0, done: 0 });

    const message =
      result.pending === 0 && result.done === 0
        ? 'No tasks available to generate stats'
        : 'Task statistics retrieved successfully';

    return sendResponse(res, 200, result, message);
  } catch (err) {
    return sendResponse(res, 500, null, 'Failed to retrieve task statistics');
  }
};
