import express from 'express'
import { createDivisionCtrl, getDivisionCtrl } from '../controllers/divisionController.js'


//router object
const router = express.Router()

// routers

// POST || REGISTER USER
router.post("/create", createDivisionCtrl)

// GET || GET USER
router.get("/list", getDivisionCtrl)

router.get("/", async (req, res) => {
    console.log("kutabasa");
    return res.status(200).json({
        success: true,
        message: "Fetch data from /",
        data: "Hi KutaBasa"
    });
})



export default router
