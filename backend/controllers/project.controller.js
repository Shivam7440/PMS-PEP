import { Project } from "../models/project.model.js";
import { Notification } from "../models/notification.model.js";

export const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
    members: [req.user._id],
  });

  return res.status(201).json({ project, message: "Project created successfully" });
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }],
  }).populate("owner members", "username email avatar");

  return res.status(200).json({ projects, message: "Projects fetched successfully" });
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId).populate("owner members", "username email avatar");

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.status(200).json({ project, message: "Project fetched successfully" });
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description, status } = req.body;

  const project = await Project.findByIdAndUpdate(
    projectId,
    { name, description, status },
    { new: true }
  );

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Notify members about project update
  if (project.members && project.members.length > 0) {
    const notifications = project.members
      .filter(memberId => memberId.toString() !== req.user._id.toString())
      .map(memberId => ({
        recipient: memberId,
        sender: req.user._id,
        type: "status_change",
        title: "Project Updated",
        message: `Project "${project.name}" has been updated`,
        project: project._id
      }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }
  }

  return res.status(200).json({ project, message: "Project updated successfully" });
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.status(200).json({ message: "Project deleted successfully" });
};

export const addMemberToProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.members.includes(userId)) {
    return res.status(400).json({ message: "User is already a member of this project" });
  }

  project.members.push(userId);
  await project.save();

  const updatedProject = await Project.findById(projectId).populate("owner members", "username email avatar");

  // Notify the new member
  await Notification.create({
    recipient: userId,
    sender: req.user._id,
    type: "assignment",
    title: "Added to Project",
    message: `You have been added to the project "${project.name}"`,
    project: project._id
  });

  return res.status(200).json({ project: updatedProject, message: "Member added successfully" });
};

export const removeMemberFromProject = async (req, res) => {
  const { projectId, userId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.members = project.members.filter(id => id.toString() !== userId);
  await project.save();

  const updatedProject = await Project.findById(projectId).populate("owner members", "username email avatar");

  return res.status(200).json({ project: updatedProject, message: "Member removed successfully" });
};
