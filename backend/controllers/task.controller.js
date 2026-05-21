import { Task } from "../models/task.model.js";
import { Notification } from "../models/notification.model.js";

export const createTask = async (req, res) => {
  const { title, description, priority, status, dueDate, assignees, project, columnId } = req.body;

  if (!title || !project) {
    return res.status(400).json({ message: "Title and project are required" });
  }

  const task = await Task.create({
    title,
    description,
    priority,
    status,
    dueDate,
    assignees,
    project,
    columnId
  });

  if (!task) {
    throw new Error("Task creation failed");
  }

  // Create notifications for assignees
  if (assignees && assignees.length > 0) {
    const notifications = assignees.map(assigneeId => ({
      recipient: assigneeId,
      sender: req.user._id,
      type: "assignment",
      title: "New Task Assigned",
      message: `You have been assigned to: ${title}`,
      project: project,
      task: task._id
    }));
    await Notification.insertMany(notifications);
  }

  return res.status(201).json({ task, message: "Task created successfully" });
};

export const getProjectTasks = async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ project: projectId }).populate("assignees", "username email avatar");

  return res.status(200).json({ tasks, message: "Tasks fetched successfully" });
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updateData = req.body;

  const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json({ task, message: "Task updated successfully" });
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json({ message: "Task deleted successfully" });
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status, columnId } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  task.columnId = columnId;
  await task.save();

  // Notify owner/assignees about status change if needed (simplified for now)
  // For now, let's just create a notification for the first assignee if they aren't the one who changed it
  if (task.assignees && task.assignees.length > 0 && task.assignees[0].toString() !== req.user._id.toString()) {
    await Notification.create({
      recipient: task.assignees[0],
      sender: req.user._id,
      type: "status_change",
      title: "Task Status Updated",
      message: `Task "${task.title}" status changed to ${status}`,
      project: task.project,
      task: task._id
    });
  }

  return res.status(200).json({ task, message: "Task status updated successfully" });
};

export const getAssignedTasks = async (req, res) => {
  const tasks = await Task.find({ assignees: req.user._id }).populate("project", "name");
  return res.status(200).json({ tasks, message: "Assigned tasks fetched successfully" });
};

export const getAllTasks = async (req, res) => {
  // Logic: Find tasks in projects where user is owner or member, or where they are assigned
  // For simplicity, now fetching all tasks and populating project. 
  // In a real app, we'd filter by project membership.
  const tasks = await Task.find().populate("project", "name").populate("assignees", "username email avatar");
  return res.status(200).json({ tasks, message: "All tasks fetched successfully" });
};
