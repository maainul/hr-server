import express from 'express'
import { createPermissionCtrl, listPermissionCtrl } from '../controllers/permissionController.js'


const router = express.Router()


router.post('/create', createPermissionCtrl)
router.get('/list', listPermissionCtrl)
// router.get('/logout', logoutCtrl)
// router.get('/loggedin', loggedInCtrl)


export default router