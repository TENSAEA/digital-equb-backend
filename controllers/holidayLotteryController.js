const HolidayLottery = require("../model/HolidayLottery");

exports.createHolidayLottery = async (req, res) => {
  try {
    const holidayLottery = new HolidayLottery(req.body);
    await holidayLottery.save();
    res.status(201).json(holidayLottery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllHolidayLotteries = async (req, res) => {
  try {
    const holidayLotteries = await HolidayLottery.find();
    res.status(200).json(holidayLotteries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHolidayLotteryById = async (req, res) => {
  try {
    const holidayLottery = await HolidayLottery.findById(req.params.id);
    if (!holidayLottery) {
      return res.status(404).json({ message: "HolidayLottery not found" });
    }
    res.status(200).json(holidayLottery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHolidayLottery = async (req, res) => {
  try {
    const holidayLottery = await HolidayLottery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!holidayLottery) {
      return res.status(404).json({ message: "HolidayLottery not found" });
    }
    res.status(200).json(holidayLottery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteHolidayLottery = async (req, res) => {
  try {
    const holidayLottery = await HolidayLottery.findByIdAndRemove(
      req.params.id
    );
    if (!holidayLottery) {
      return res.status(404).json({ message: "HolidayLottery not found" });
    }
    res.status(200).json({ message: "HolidayLottery deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
