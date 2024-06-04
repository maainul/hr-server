import express from 'express'
import { createUserGroupCtrl, listUserGroupCtrl } from '../controllers/userGroupController.js'


const router = express.Router()


router.post('/create', createUserGroupCtrl)
router.get('/list', listUserGroupCtrl)



export default router