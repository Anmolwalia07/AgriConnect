import express from "express"

import { authMiddlewareAdmin, authMiddlewareFarmer } from "../middleWares/auth.js";
import { deleteAllFarmer, deleteFarmer, getAllFarmers, getIndividualFarmer, loginFarmer, logout, registerFarmer, updatePassword, updateProfile } from "../controller/farmerController.js";
const router = express.Router();
router.post('/register', registerFarmer);
router.post('/login', loginFarmer);

// farmer protected routes
router.get('/:id', authMiddlewareFarmer, getIndividualFarmer);
router.put("/updateProfile/:id", authMiddlewareFarmer, updateProfile);
router.put("/updatePassword/:id", authMiddlewareFarmer, updatePassword);
router.get('/logout', authMiddlewareFarmer, logout);


// admin protected routes
router.get('/all',authMiddlewareAdmin, getAllFarmers);
router.delete("/delete/:id",authMiddlewareAdmin, deleteFarmer);
router.delete("/deleteAll", authMiddlewareAdmin,deleteAllFarmer);



export default router;