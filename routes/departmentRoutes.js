import express from 'express'
import { 
    createDepartmentCtrl, 
    getDepartmentCtrl,
    updateDepartmentStatusCtrl,
    getSingleDepartmentCtrl 
} from '../controllers/departmentCtrl.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", createDepartmentCtrl)

// UPDATE || Update Department Status
router.get("/status", updateDepartmentStatusCtrl)

// GET || ALL Department Lists
router.get("/list", getDepartmentCtrl)

// GET || Get Single Department Details
router.get("/:id",getSingleDepartmentCtrl)



export default router
