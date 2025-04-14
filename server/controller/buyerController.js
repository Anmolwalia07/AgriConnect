import jwt from "jsonwebtoken";
import BuyerModel from "../models/buyersModel.js";
import bcrypt from "bcrypt"

export async function registerBuyer(req, res) {
    const { name, email, phone, password, role } = req.body;
    try {
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existUser = await BuyerModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "Email is already exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const buyer = await new BuyerModel({ name, email, password: hashPassword, phone, role });
        await buyer.save();
        res.status(201).json({ message: "Buyer registered successfully" });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export async function loginBuyer(req, res) {
    const { email, password } = req.body;
    try {
        const buyer = await BuyerModel.findOne({ email });
        if (!buyer) {
            return res.status(400).json({ message: "Invaild Email" });
        }
        const isMatch = await bcrypt.compare(password, buyer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invaild Password " });
        }
        const token = jwt.sign({ _id: buyer._id }, process.env.JWT_SECRET, { expiresIn: '2hr' });
        res.cookie('token', token, {
            httpOnly: true, // Prevent JavaScript access (mitigates XSS)
            maxAge: 1000 * 60 * 60 , // 7 days (adjust as needed)
        });        
        res.status(200).json({ message: "Buyer logged in successfully", token: token });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export async function getAllBuyers(req, res) {
    try {
        const buyers = await BuyerModel.find();
        res.status(200).json({ buyers: buyers });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export async function getIndividualBuyer(req, res) {
    try {
        const _id = req.params.id;
        const buyer = await BuyerModel.findOne({ _id });
        if (!buyer) {
            return res.status(400).json({ message: "Buyer not found" })
        }
        res.status(200).json({ buyer: buyer });
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

        const buyer = await BuyerModel.findByIdAndUpdate(
            _id,
            { $set: updateData }, // Use $set to handle partial updates
            { new: true }
        ).select("-password");

        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }

        res.status(200).json({ buyer: buyer });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function updatePassword(req, res) {
    try {
        const _id = req.params.id;
        const { oldPassword, newPassword } = req.body;
        const buyer = await BuyerModel.findById(_id);
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }
        const isValidPassword = await bcrypt.compare(oldPassword, buyer.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid old password" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        buyer.password = hashedPassword;
        await buyer.save();
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

export async function deleteBuyer(req, res) {
    try {
        const _id = req.params.id;
        const buyer = await BuyerModel.findByIdAndDelete(_id);
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }
        res.status(200).json({ message: "Buyer deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

export async function deleteAllBuyer(req, res) {
    try {
        const buyer = await BuyerModel.deleteMany();
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }
        res.status(200).json({ message: "All Buyers deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

