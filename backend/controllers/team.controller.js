import { User } from "../models/user.model.js";

export const getAllMembers = async (req, res) => {
  const users = await User.find({}).select("-password -refreshToken");
  return res.status(200).json({ members: users, message: "Members fetched successfully" });
};

export const searchMembers = async (req, res) => {
  const { query } = req.query;
  const users = await User.find({
    $or: [
      { username: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
  }).select("-password -refreshToken");

  return res.status(200).json({ members: users, message: "Members found" });
};
export const inviteMember = async (req, res) => {
  const { email, role } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // In a real app, we would send an email and save to an Invitations collection
  // For now, we'll just return a success message and dummy invitation data
  const invitation = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    role,
    status: "Pending",
    sentAt: new Date(),
  };

  return res.status(201).json({ invitation, message: "Invitation sent successfully" });
};
