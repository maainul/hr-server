import express from 'express'
import {
    createPolicyCtrl,
    getPolicyCtrl,
    updatePolicyStatusCtrl,
    getSinglePolicyCtrl,
    updatePolicyCtrl
} from '../controllers/policyCtrl.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", createPolicyCtrl)

// UPDATE || Update Policy Status
router.get("/status", updatePolicyStatusCtrl)

// GET || ALL Policy Lists
router.get("/list", getPolicyCtrl)

// GET || Get Single Policy Details
router.get("/:id", getSinglePolicyCtrl)

// PUT || Update Policy Details
router.put("/:id", updatePolicyCtrl)



export default router
