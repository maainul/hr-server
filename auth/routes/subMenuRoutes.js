import express from "express";
import {
  createSubMenuCtrl,
  getSubMenuCtrl,
  getSingleSubMenuCtrl,
  updateSubMenuCtrl,
} from "../controllers/subMenuCtr.js";

//router object
const router = express.Router();

// CREATE
router.post("/create", createSubMenuCtrl);

// GET || ALL Menu Lists
router.get("/list", getSubMenuCtrl);

// GET || Get Single Menu Details
router.get("/:id", getSingleSubMenuCtrl);

// PUT || Update Menu Details
router.put("/:id", updateSubMenuCtrl);

export default router;
