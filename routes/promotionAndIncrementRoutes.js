import express from 'express'
import {
    createPromotionsAndIncrementCtrl,
    getPromotionsAndIncrementCtrl,
    getSinglePromotionsAndIncrementCtrl,
    updatePromotionsAndIncrementCtrl
} from '../controllers/promotionAndIncrementCtrl.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", createPromotionsAndIncrementCtrl)

// GET || ALL PromotionsAndIncrement Lists
router.get("/list", getPromotionsAndIncrementCtrl)

// GET || Get Single PromotionsAndIncrement Details
router.get("/:id", getSinglePromotionsAndIncrementCtrl)

// PUT || Update PromotionsAndIncrement Details
router.put("/:id", updatePromotionsAndIncrementCtrl)



export default router
