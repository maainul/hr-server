import express from 'express'
import { checkPermission } from './../middleware/checkPermission.js';
import {
    registerUserCtrl,
    loginUserCtrl,
    logoutCtrl,
    loggedInCtrl,
    userListCtrl,
    getUserProfileCtrl
} from '../controllers/userController.js'


const router = express.Router()


router.post('/register', registerUserCtrl)
router.get('/user/list', userListCtrl)
router.post('/login', loginUserCtrl)
router.get('/logout', logoutCtrl)
router.get('/loggedin', loggedInCtrl)

// User Profile
router.get('/profile/:id', getUserProfileCtrl)


export default router