import express from 'express'
import { createPermissionCtrl, listPermissionCtrl } from '../controllers/permissionController.js'
import { checkPermission } from '../middleware/checkPermission.js'


const router = express.Router()


router.post('/create',  createPermissionCtrl)
router.get('/list', listPermissionCtrl)



export default router
