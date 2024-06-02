import express from 'express'
import {
    registerUserCtrl,
    loginUserCtrl,
    logoutCtrl,
    loggedInCtrl
} from '../controllers/userController.js'


const router = express.Router()


router.post('/register', registerUserCtrl)
router.post('/login', loginUserCtrl)
router.post('/logout', logoutCtrl)
router.post('/loggedin', loggedInCtrl)


export default router