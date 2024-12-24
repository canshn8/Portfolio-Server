const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const Project = require("../models/Project");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Yükleme klasörü
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Dosya ismi
  },
});

// Multer Middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
}).fields([  // Burada 'fields' kullanarak her alanı tanımlayalım
  { name: 'main', maxCount: 1 },
  { name: 'secondary1', maxCount: 1 },
  { name: 'secondary2', maxCount: 1 }
]);

const fixImagePaths = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => item.replace(/\\/g, "/"));
  }
  if (!data) {
    console.error("Data is null or undefined.");
    return null; 
  }
  return data.replace(/\\/g, "/");
};

// Add Project with Dynamic Image Handling
exports.addProject = async (req, res) => {
  try {
    const user = await User.findOne({ author: req.body.author });

    if (!user) {
      return res.status(404).json({ message: "Wrong User!" });
    }

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File upload error", error: err });
      }

      const mainImage = req.files.main ? req.files.main[0].path : null;
      const additionalImages = [
        req.files.secondary1 ? req.files.secondary1[0].path : null,
        req.files.secondary2 ? req.files.secondary2[0].path : null,
      ].filter(Boolean); // Remove null values

      // Normalize file paths
      const normalizedMainImage = fixImagePaths(mainImage);
      const normalizedAdditionalImages = fixImagePaths(additionalImages);

      const newProject = {
        title: req.body.title,
        desc: req.body.desc,
        mainImage: normalizedMainImage, // Main image with normalized path
        additionalImages: normalizedAdditionalImages, // Additional images with normalized paths
        tag: JSON.parse(req.body.tag),
        explain: JSON.parse(req.body.explain),
        previewLink: req.body.previewLink,
        author: user._id,
      };

      const savedProject = await Project.create(newProject);
      res.status(200).json(savedProject);
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
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
