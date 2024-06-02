import express from 'express'
import {
    createUnitCtrl,
    getUnitCtrl,
    updateUnitStatusCtrl,
    getSingleUnitCtrl,
    updateUnitCtrl
} from '../controllers/unitCtrl.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", createUnitCtrl)

// UPDATE || Update Unit Status
router.get("/status", updateUnitStatusCtrl)

// GET || ALL Unit Lists
router.get("/list", getUnitCtrl)

// GET || Get Single Unit Details
router.get("/:id", getSingleUnitCtrl)

// PUT || Update Unit Details
router.put("/:id", updateUnitCtrl)



export default router
