import jwt from "jsonwebtoken";
import FarmerModel from "../models/farmerModel.js"
import bcrypt from "bcrypt"

export async function registerFarmer(req, res) {
    const { name, email, phone, password, role } = req.body;
    try {
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existUser = await FarmerModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "Email is already exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const farmer = await new FarmerModel({ name, email, password: hashPassword, phone, role });
        await farmer.save();
        res.status(201).json({ message: "Farmer registered successfully" });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export async function loginFarmer(req, res) {
    const { email, password } = req.body;
    try {
        const farmer = await FarmerModel.findOne({ email });
        if (!farmer) {
            return res.status(400).json({ message: "Invaild Email" });
        }
        const isMatch = await bcrypt.compare(password, farmer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invaild Password " });
        }
        const token = jwt.sign({ _id: farmer._id }, process.env.JWT_SECRET, { expiresIn: '2hr' });
        res.cookie('token', token, {
            httpOnly: true, // Prevent JavaScript access (mitigates XSS)
            maxAge: 1000 * 60 * 60 
        });        
        res.status(200).json({ message: "Farmer logged in successfully", token: token });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export async function getAllFarmers(req, res) {
    try {
        const farmers = await FarmerModel.find();
        res.status(200).json({ farmers: farmers });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export async function getIndividualFarmer(req, res) {
    try {
        const _id = req.params.id;
        const farmer = await FarmerModel.findOne({ _id });
        if (!farmer) {
            return res.status(400).json({ message: "farmer not found" })
        }
        res.status(200).json({ farmer: farmer });
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
}

export async function updateProfile(req, res) {
    try {
        const _id = req.params.id;

        // Sanitize input to exclude sensitive fields
        const allowedUpdates = ['name', 'phone', 'address', 'profilePicture'];
        const updateData = {};
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const farmer = await FarmerModel.findByIdAndUpdate(
            _id,
            { $set: updateData }, // Use $set to handle partial updates
            { new: true }
        ).select("-password");

        if (!farmer) {
            return res.status(404).json({ message: "farmer not found" });
        }

        res.status(200).json({ farmer: farmer });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function updatePassword(req, res) {
    try {
        const _id = req.params.id;
        const { oldPassword, newPassword } = req.body;
        const farmer = await FarmerModel.findById(_id);
        if (!farmer) {
            return res.status(404).json({ message: "farmer not found" });
        }
        const isValidPassword = await bcrypt.compare(oldPassword, farmer.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid old password" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        farmer.password = hashedPassword;
        await farmer.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Logout failed', error: err.message });
    }
}

export async function deleteFarmer(req, res) {
    try {
        const _id = req.params.id;
        const farmer = await FarmerModel.findByIdAndDelete(_id);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }
        res.status(200).json({ message: "Farmer deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

export async function deleteAllFarmer(req, res) {
    try {
        const farmer = await FarmerModel.deleteMany();
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }
        res.status(200).json({ message: "All Farmers deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

