import express from 'express'
import {
    createDivisionCtrl,
    getDivisionCtrl,
    updateDivisionStatusCtrl,
    getSingleDivisionCtrl,
    updateDivisionCtrl
} from '../controllers/divisionCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('division', 'create'), createDivisionCtrl)

// UPDATE || Update Division Status
router.put("/status/:id", checkPermission('division', 'statusUpdate'), updateDivisionStatusCtrl)

// GET || ALL Division Lists
router.get("/list", checkPermission('division', 'list'), getDivisionCtrl)

// GET || Get Single Division Details
router.get("/:id", checkPermission('division', 'details'), getSingleDivisionCtrl)

// PUT || Update Division Details
router.put("/:id", checkPermission('division', 'update'), updateDivisionCtrl)



export default router
