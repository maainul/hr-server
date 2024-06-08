import express from 'express'
import { createGroupCtrl, listGroupCtrl, getGroupCtrl } from '../controllers/groupController.js'
import { checkPermission } from '../middleware/checkPermission.js'


const router = express.Router()


router.post('/create', checkPermission('group', 'create'), createGroupCtrl)
router.get('/list', checkPermission('group', 'list'), listGroupCtrl)
router.get('/:id', checkPermission('group', 'details'), getGroupCtrl)



export default router