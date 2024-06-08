import express from 'express'
import {
    createPromotionsAndIncrementCtrl,
    getPromotionsAndIncrementCtrl,
    getSinglePromotionsAndIncrementCtrl,
    updatePromotionsAndIncrementCtrl
} from '../controllers/promotionAndIncrementCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('promotionAndIncrement', 'create'), createPromotionsAndIncrementCtrl)

// GET || ALL PromotionsAndIncrement Lists
router.get("/list", checkPermission('promotionAndIncrement', 'list'), getPromotionsAndIncrementCtrl)

// GET || Get Single PromotionsAndIncrement Details
router.get("/:id", checkPermission('promotionAndIncrement', 'details'), getSinglePromotionsAndIncrementCtrl)

// PUT || Update PromotionsAndIncrement Details
router.put("/:id", checkPermission('promotionAndIncrement', 'update'), updatePromotionsAndIncrementCtrl)


export default router
