import express from 'express'
import { createGroupCtrl, listGroupCtrl } from '../controllers/groupController.js'


const router = express.Router()


router.post('/create', createGroupCtrl)
router.get('/list', listGroupCtrl)



export default router