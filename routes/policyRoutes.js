import express from 'express'
import {
    createPolicyCtrl,
    getPolicyCtrl,
    updatePolicyStatusCtrl,
    getSinglePolicyCtrl,
    updatePolicyCtrl
} from '../controllers/policyCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", checkPermission('policy', 'create'), createPolicyCtrl)

// UPDATE || Update Policy Status
router.get("/status", checkPermission('policy', 'status'), updatePolicyStatusCtrl)

// GET || ALL Policy Lists
router.get("/list", checkPermission('policy', 'list'), getPolicyCtrl)

// GET || Get Single Policy Details
router.get("/:id", checkPermission('policy', 'details'), getSinglePolicyCtrl)

// PUT || Update Policy Details
router.put("/:id", checkPermission('policy', 'update'), updatePolicyCtrl)



export default router
