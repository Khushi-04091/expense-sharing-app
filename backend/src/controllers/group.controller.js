import Group from "../models/Group.js";
import User from "../models/User.js";

// ✅ CREATE GROUP
export const createGroup = async (req, res) => {
  try {
    const { name, members = [] } = req.body;

    // creator ko members me add karo
    const uniqueMembers = new Set([
      req.user.toString(),
      ...members
    ]);

    const group = await Group.create({
      name,
      members: Array.from(uniqueMembers),
      createdBy: req.user
    });

    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET GROUPS OF LOGGED-IN USER
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user
    }).populate("members", "name email");

    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD MEMBER TO GROUP
export const addMemberToGroup = async (req, res) => {
  try {
    const { groupId, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(user._id)) {
      return res.status(400).json({ message: "User already in group" });
    }

    group.members.push(user._id);
    await group.save();

    res.json({ message: "Member added successfully", group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

