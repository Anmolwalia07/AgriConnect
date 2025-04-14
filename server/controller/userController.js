import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Farmer from '../models/farmerModel.js';
import Buyer from '../models/buyersModel.js';

// Register Farmer
export const registerBuyer = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    console.log(req.body);

    // Check if user exists with the same role
    const existUser = await User.findOne({ email });

    if (existUser && existUser.role === role) {
      return res.status(400).json({ message: "User with this role already exists" });
    }

    // Hash Password only for new users
    let user;
    if (existUser) {
      user = existUser;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User if it does not exist
      user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
      });

      await user.save();
    }

    // Check if the user is already registered as a Buyer
    const existingBuyer = await Buyer.findOne({ user: user._id });
    if (existingBuyer) {
      return res.status(400).json({ message: "User is already registered as a Buyer" });
    }

    // Create Buyer linked to User
    const buyer = new Buyer({ user: user._id });
    await buyer.save();

    res.status(201).json({ message: "Buyer registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


// Register Farmer
export const registerFarmer = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user exists
    const existUser = await User.findOne({ email });

    if (existUser && existUser.role === role) {
      return res.status(400).json({ message: "User with this role already exists" });
    }

    let user;
    if (existUser) {
      user = existUser;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User if it does not exist
      user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
      });

      await user.save();
    }

    // Check if the user is already registered as a Farmer
    const existingFarmer = await Farmer.findOne({ user: user._id });
    if (existingFarmer) {
      return res.status(400).json({ message: "User is already registered as a Farmer" });
    }

    // Create Farmer linked to User
    await Farmer.create({ user: user._id });

    res.status(201).json({ message: "Farmer registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Login
export const login = async (req, res) => {
  try {
    const { email, password,role } = req.body;

    // Find user by email
    const user = await User.findOne({ email ,role});
    if (!user) return res.status(400).json({ message: 'Invalid Email or Role' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token",token)
    res.status(200).json({ token :token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete User and associated data
    await User.findByIdAndDelete(userId);
    await Farmer.findOneAndDelete({ user: userId });
    await Buyer.findOneAndDelete({ user: userId });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};