import express from 'express'
import {
    createDocumentCtrl,
    getDocumentCtrl,
    updateDocumentStatusCtrl,
    getSingleDocumentCtrl,
    updateDocumentCtrl
} from '../controllers/documentCtrl.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", createDocumentCtrl)

// UPDATE || Update Document Status
router.get("/status", updateDocumentStatusCtrl)

// GET || ALL Document Lists
router.get("/list", getDocumentCtrl)

// GET || Get Single Document Details
router.get("/:id", getSingleDocumentCtrl)

// PUT || Update Document Details
router.put("/:id", updateDocumentCtrl)



export default router
