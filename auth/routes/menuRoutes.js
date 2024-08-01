import express from 'express'
import {
    createMenuCtrl,
    getMenuCtrl,
    getSingleMenuCtrl,
    updateMenuCtrl
} from '../controllers/menuCtrl.js'

//router object
const router = express.Router()


// CREATE 
router.post("/create", createMenuCtrl)

// GET || ALL Menu Lists
router.get("/list", getMenuCtrl)

// GET || Get Single Menu Details
router.get("/:id", getSingleMenuCtrl)

// PUT || Update Menu Details
router.put("/:id", updateMenuCtrl)



export default router
