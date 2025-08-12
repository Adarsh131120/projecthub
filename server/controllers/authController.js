import User from '../models/user.js';
import {generateToken} from '../utils/generateToken.js';
import { validationResult } from 'express-validator';
import cloudinary from '../config/cloudinary.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public



export const registerUser = async (req, res) => {
    console.log("Incoming Register Request Body:", req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { username, email, password, bio, socialLinks ={} } = req.body;

    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      return res.status(400).json({ 
        message: userExists.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      bio,
      socialLinks
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        socialLinks: user.socialLinks,
        createdAt: user.createdAt
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        socialLinks: user.socialLinks,
        createdAt: user.createdAt
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        socialLinks: user.socialLinks,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
// export const updateUserProfile = async (req, res) => {
//   try {
//     const { username, bio, socialLinks } = req.body;
    
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (username && username !== user.username) {
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already taken' });
//       }
//     }

//     user.username = username || user.username;
//     user.bio = bio !== undefined ? bio : user.bio;
//     user.socialLinks = socialLinks || user.socialLinks;

//     await user.save();

//     res.json({
//       message: 'Profile updated successfully',
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         bio: user.bio,
//         avatar: user.avatar,
//         socialLinks: user.socialLinks,
//         updatedAt: user.updatedAt
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const updateUserProfile = async (req, res) => {
  try {
    const { username, bio, socialLinks } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if username is changing and unique
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // ✅ Handle avatar upload
    if (req.file) {
      // Delete old avatar if exists
      if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload new avatar to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'avatars',
            transformation: [
              { width: 300, height: 300, crop: 'fill' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }

    user.username = username || user.username;
    user.bio = bio !== undefined ? bio : user.bio;
    user.socialLinks = socialLinks || user.socialLinks;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        socialLinks: user.socialLinks,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

