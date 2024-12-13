const Project = require("../models/Project");

exports.addProject = async (req, res) => {
  const newProject = new Project(req.body);

  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletedProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProjects = async (req, res) => {
  const qNew = req.query.new;
  try {
    let projects;

    if (qNew) {
      projects = await Project.find().sort({ createdAt: -1 }).limit(1);
    } else {
      projects = await Project.find();
    }

    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
