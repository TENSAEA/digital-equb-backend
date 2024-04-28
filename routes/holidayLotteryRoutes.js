const express = require("express");
const router = express.Router();
const holidayLotteryController = require("../controllers/holidayLotteryController");

// Create a HolidayLottery
router.post("/", holidayLotteryController.createHolidayLottery);

// Get all HolidayLotteries
router.get("/", holidayLotteryController.getAllHolidayLotteries);

// Get HolidayLottery by ID
router.get("/:id", holidayLotteryController.getHolidayLotteryById);

// Update a HolidayLottery
router.put("/:id", holidayLotteryController.updateHolidayLottery);

// Delete a HolidayLottery
router.delete("/:id", holidayLotteryController.deleteHolidayLottery);

module.exports = router;
