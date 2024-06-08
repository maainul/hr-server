import express from 'express'
import {
    createUnitCtrl,
    getUnitCtrl,
    updateUnitStatusCtrl,
    getSingleUnitCtrl,
    updateUnitCtrl
} from '../controllers/unitCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()

// CREATE 
router.post("/create", checkPermission('unit', 'create'), createUnitCtrl)

// UPDATE || Update Unit Status
router.put("/status", checkPermission('unit', 'status'), updateUnitStatusCtrl)

// GET || ALL Unit Lists
router.get("/list", checkPermission('unit', 'list'), getUnitCtrl)

// GET || Get Single Unit Details
router.get("/:id", checkPermission('unit', 'details'), getSingleUnitCtrl)

// PUT || Update Unit Details
router.put("/:id", checkPermission('unit', 'update'), updateUnitCtrl)



export default router
