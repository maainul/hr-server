import express from "express";
import {
  createStockTransactionTypeCtrl,
  getStockTransactionTypeCtrl,
  updateStockTransactionTypeStatusCtrl,
  getSingleStockTransactionTypeCtrl,
  updateStockTransactionTypeCtrl,
} from "../controllers/stockTransactionTypeCtrl.js";
import { checkPermission } from "../auth/middleware/checkPermission.js";

//router object
const router = express.Router();

// CREATE
router.post(
  "/create",
  checkPermission("stocktransaction-type", "create"),
  createStockTransactionTypeCtrl
);

// UPDATE || Update StockTransactionType Status
router.get(
  "/status",
  checkPermission("stocktransaction-type", "statusUpdate"),
  updateStockTransactionTypeStatusCtrl
);

// GET || ALL StockTransactionType Lists
router.get(
  "/list",
  checkPermission("stocktransaction-type", "list"),
  getStockTransactionTypeCtrl
);

// GET || Get Single StockTransactionType Details
router.get(
  "/:id",
  checkPermission("stocktransaction-type", "details"),
  getSingleStockTransactionTypeCtrl
);

// PUT || Update StockTransactionType Details
router.put(
  "/:id",
  checkPermission("stocktransaction-type", "update"),
  updateStockTransactionTypeCtrl
);

export default router;
