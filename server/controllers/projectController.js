// controllers/projectController.js
import Project from '../models/Project.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';
import { validationResult } from 'express-validator';

const categoryMap = {
  web: 'Web Development',
  mobile: 'Mobile App',
  desktop: 'Desktop App',
  ai: 'AI/ML',
  game: 'Game Development',
  other: 'Other'
};


const statusMap = {
  planning: 'In Progress',
  development: 'In Progress',
  testing: 'On Hold',
  completed: 'Completed',
  'on-hold': 'On Hold'
};


// Helper function to upload images to Cloudinary
const uploadImagesToCloudinary = async (files) => {
  const uploadPromises = files.map(file => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'project_images',
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve({
            public_id: result.public_id,
            url: result.secure_url
          });
        }
      ).end(file.buffer);
    });
  });

  return Promise.all(uploadPromises);
};

// All controllers below
// const  createProject = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
//     }

//     const { title, description, technologies, liveUrl, githubUrl, category, status } = req.body;

//     let images = [];
//     if (req.files && req.files.length > 0) {
//       images = await uploadImagesToCloudinary(req.files);
//     }

//     const project = await Project.create({
//       title,
//       description,
//       technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
//       images,
//       liveUrl,
//       githubUrl,
//       category,
//       status,
//       author: req.user._id
//     });

//     await project.populate('author', 'username avatar');

//     res.status(201).json({
//       message: 'Project created successfully',
//       project
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error while creating project' });
//   }
// };

const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { title, description, technologies, liveUrl, githubUrl, category, status } = req.body;

    // Handle technologies: allow string or array
    let technologiesArray = [];
    if (typeof technologies === 'string') {
      technologiesArray = technologies.split(',').map(t => t.trim());
    } else if (Array.isArray(technologies)) {
      technologiesArray = technologies;
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = await uploadImagesToCloudinary(req.files);
    }

    // const project = await Project.create({
    //   title,
    //   description,
    //   technologies: technologiesArray,
    //   images,
    //   liveUrl,
    //   githubUrl,
    //   category,
    //   status,
    //   author: req.user._id
    // });

    const project = await Project.create({
  title,
  description,
  technologies: technologiesArray,
  images,
  liveUrl,
  githubUrl,
  category: categoryMap[category?.toLowerCase()] || 'Other',
  status: statusMap[status?.toLowerCase()] || 'In Progress',
  author: req.user._id,
  isPublic:   true

});


    await project.populate('author', 'username avatar');

    res.status(201).json({
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    console.error(error);
     console.error("Error creating project:", error);
    res.status(500).json({ message: 'Server error while creating project' });
  }
};


const getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { category, search, sortBy = 'createdAt' } = req.query;

    let query = { isPublic: true };

    if (category && category !== 'all') query.category = category;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let sortOption = {};
    switch (sortBy) {
      case 'likes':
        sortOption = { 'likes': -1, createdAt: -1 };
        break;
      case 'views':
        sortOption = { views: -1, createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const projects = await Project.find(query)
      .populate('author', 'username avatar')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProjects: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
};


const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('author', 'username avatar bio socialLinks')
      .populate('likes.user', 'username');

    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.isPublic) return res.status(403).json({ message: 'Project is private' });

    project.views += 1;
    await project.save();

    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching project' });
  }
};

const getUserProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

     const userId = req.user._id; // ✅ Use logged-in user
    // const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let query = { author: userId };
    if (!req.user || req.user._id.toString() !== userId) {
      query.isPublic = true;
    }

    const projects = await Project.find(query)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      user: {
        username: user.username,
        avatar: user.avatar,
        bio: user.bio
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProjects: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user projects' });
  }
};



const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    const { title, description, technologies, liveUrl, githubUrl, category, status, isPublic } = req.body;

    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = await uploadImagesToCloudinary(req.files);
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.technologies = technologies ? technologies.split(',').map(t => t.trim()) : project.technologies;
    project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
    project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
    project.category = category || project.category;
    project.status = status || project.status;
    project.isPublic = isPublic !== undefined ? isPublic : project.isPublic;

    if (newImages.length > 0) {
      project.images = [...project.images, ...newImages];
    }

    await project.save();
    await project.populate('author', 'username avatar');

    res.json({
      message: 'Project updated successfully',
      project
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    if (project.images && project.images.length > 0) {
      const deletePromises = project.images.map(image =>
        cloudinary.uploader.destroy(image.public_id)
      );
      await Promise.all(deletePromises);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting project' });
  }
};

const toggleLike = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const existingLike = project.likes.find(
      like => like.user.toString() === req.user._id.toString()
    );

    if (existingLike) {
      project.likes = project.likes.filter(
        like => like.user.toString() !== req.user._id.toString()
      );
    } else {
      project.likes.push({ user: req.user._id });
    }

    await project.save();

    res.json({
      message: existingLike ? 'Project unliked' : 'Project liked',
      likesCount: project.likes.length,
      isLiked: !existingLike
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while toggling like' });
  }
};


// const toggleProjectStatus = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });

//     // Check authorization
//     if (project.author.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Not authorized to change project status' });
//     }

//     // Toggle or update status
//     const validStatuses = ['planning', 'development', 'testing', 'completed', 'on-hold'];

//     if (req.body.status) {
//       const newStatus = req.body.status;
//       if (!validStatuses.includes(newStatus)) {
//         return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
//       }
//       project.status = newStatus;
//     } else {
//       // Optional: toggle between 'completed' and 'planning' if no specific status is provided
//       project.status = project.status === 'completed' ? 'planning' : 'completed';
//     }

//     await project.save();

//     res.json({
//       message: 'Project status updated successfully',
//       status: project.status
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error while toggling project status' });
//   }
// };

const toggleProjectStatus = async (req, res) => {
  // Handle validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check authorization
    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to change project status' });
    }

    const validStatuses = ['planning', 'development', 'testing', 'completed', 'on-hold'];

    if (req.body.status) {
      const newStatus = req.body.status;

      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      project.status = newStatus;
    } else {
      // Default toggle between 'completed' and 'planning' if no status provided
      project.status = project.status === 'completed' ? 'planning' : 'completed';
    }

    await project.save();

    res.json({
      message: 'Project status updated successfully',
      status: project.status
    });

  } catch (error) {
    console.error('Error toggling project status:', error);
    res.status(500).json({ message: 'Server error while toggling project status' });
  }
};


export {
  createProject,
  getAllProjects,
  getProject,
  getUserProjects,
  updateProject,
  deleteProject,
  toggleLike,
  toggleProjectStatus  // 👈 add this
};

// export  {
//   createProject,
//   getAllProjects,
//   getProject,
//   getUserProjects,
//   updateProject,
//   deleteProject,
//   toggleLike
// };
