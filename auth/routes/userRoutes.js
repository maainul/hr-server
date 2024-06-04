import express from 'express'
import {
    registerUserCtrl,
    loginUserCtrl,
    logoutCtrl,
    loggedInCtrl,
    userListCtrl
} from '../controllers/userController.js'


const router = express.Router()


router.post('/register', registerUserCtrl)
router.get('/user/list', userListCtrl)
router.post('/login', loginUserCtrl)
router.get('/logout', logoutCtrl)
router.get('/loggedin', loggedInCtrl)


export default router