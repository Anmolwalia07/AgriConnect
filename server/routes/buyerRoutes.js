import express from "express"
import {
    deleteAllBuyer, deleteBuyer, getAllBuyers,
    getIndividualBuyer, loginBuyer, logout, registerBuyer,
    updatePassword,
    updateProfile
} from "../controller/buyerController.js";

import { authMiddlewareAdmin, authMiddlewareBuyer } from "../middleWares/auth.js";
const router = express.Router();
router.post('/register', registerBuyer);
router.post('/login', loginBuyer);

// buyer protected routes
router.get('/:id', authMiddlewareBuyer, getIndividualBuyer);
router.put("/updateProfile/:id", authMiddlewareBuyer, updateProfile);
router.put("/updatePassword/:id", authMiddlewareBuyer, updatePassword);
router.get('/logout', authMiddlewareBuyer, logout);


// admin protected routes
router.get('/all',authMiddlewareAdmin, getAllBuyers);
router.delete("/delete/:id",authMiddlewareAdmin, deleteBuyer);
router.delete("/deleteAll", authMiddlewareAdmin,deleteAllBuyer);



export default router;