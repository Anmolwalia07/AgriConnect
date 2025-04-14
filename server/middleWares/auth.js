import jwt from 'jsonwebtoken';
import BuyerModel from '../models/buyersModel.js';
import AdminModel from "../models/adminModel.js"
import FarmerModel from '../models/farmerModel.js';
export const authMiddlewareBuyer = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const buyer = await BuyerModel.findOne({_id: decoded._id});
    if (!buyer) return res.status(401).json({ message: 'Invalid token' });
    req.buyer = buyer;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export const authMiddlewareFarmer = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const farmer = await FarmerModel.findOne({_id: decoded._id});
    if (!farmer) return res.status(401).json({ message: 'Invalid token' });
    req.farmer = farmer;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export const authMiddlewareAdmin=async (req,res,next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminModel.findOne({_id: decoded._id});
    if (!admin) return res.status(401).json({ message: 'Invalid token' });
    req.admin = admin;
    next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
      }
}