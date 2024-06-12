import express from 'express'
import {
    createMenuCtrl,
    getMenuCtrl,
    getSingleMenuCtrl,
    updateMenuCtrl
} from '../controllers/menuCtrl.js'

import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", createMenuCtrl)

// GET || ALL Menu Lists
router.get("/list", getMenuCtrl)

// GET || Get Single Menu Details
router.get("/:id", checkPermission('menu', 'details'), getSingleMenuCtrl)

// PUT || Update Menu Details
router.put("/:id", checkPermission('menu', 'update'), updateMenuCtrl)



export default router
