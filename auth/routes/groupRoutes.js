import express from 'express'
import { createGroupCtrl, listGroupCtrl, getGroupCtrl } from '../controllers/groupController.js'


const router = express.Router()


router.post('/create', createGroupCtrl)
router.get('/list', listGroupCtrl)
router.get('/:id', getGroupCtrl)



export default router