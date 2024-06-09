import express from 'express'
import {
    createDocumentCtrl,
    getDocumentCtrl,
    updateDocumentStatusCtrl,
    getSingleDocumentCtrl,
    updateDocumentCtrl
} from '../controllers/documentCtrl.js'
import { checkPermission } from '../auth/middleware/checkPermission.js'


//router object
const router = express.Router()


// CREATE 
router.post("/create", checkPermission('document', 'create'), createDocumentCtrl)

// UPDATE || Update Document Status
router.get("/status", checkPermission('document', 'statusUpdate'), updateDocumentStatusCtrl)

// GET || ALL Document Lists
router.get("/list", checkPermission('document', 'list'), getDocumentCtrl)

// GET || Get Single Document Details
router.get("/:id", checkPermission('document', 'details'), getSingleDocumentCtrl)

// PUT || Update Document Details
router.put("/:id", checkPermission('document', 'update'), updateDocumentCtrl)



export default router
