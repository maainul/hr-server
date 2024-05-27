import express from 'express'
import { createDepartmentCtrl, getDepartmentCtrl } from '../controllers/departmentCtrl.js'


//router object
const router = express.Router()

// routers

// POST || REGISTER USER
router.post("/create", createDepartmentCtrl)

// GET || GET USER
router.get("/list", getDepartmentCtrl)

router.get("/", async (req, res) => {
    console.log("kutabasa");
    return res.status(200).json({
        success: true,
        message: "Fetch data from /",
        data: "Hi KutaBasa"
    });
})



export default router
