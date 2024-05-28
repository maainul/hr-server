import express from 'express'
import { 
    createDivisionCtrl, 
    getDivisionCtrl,
    updateDivisionStatusCtrl,
    getSingleDivisionCtrl,
    updateDivisionCtrl  
} from '../controllers/divisionCtrl.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", createDivisionCtrl)

// UPDATE || Update Division Status
router.get("/status", updateDivisionStatusCtrl)

// GET || ALL Division Lists
router.get("/list", getDivisionCtrl)

// GET || Get Single Division Details
router.get("/:id",getSingleDivisionCtrl)

// PUT || Update Division Details
router.put("/:id",updateDivisionCtrl)



export default router
