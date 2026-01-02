import Project from "../models/project.js";

// Get all projects (public)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create project (admin only)
export const createProject = async (req, res) => {
  try {
    const { title, description, github, live, thumbnail, tags } = req.body;

    const newProject = await Project.create({
      title,
      description,
      github,
      live,
      thumbnail,
      tags: Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim()),
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update project (admin only)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, github, live, thumbnail, tags } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        github,
        live,
        thumbnail,
        tags: Array.isArray(tags)
          ? tags
          : tags.split(",").map((tag) => tag.trim()),
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete project (admin only)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
