const mongoose = require("mongoose");

const holidayLotterySchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    rules: {
      type: String,
      required: true,
    },
    prizes: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    winners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HolidayLottery = mongoose.model("HolidayLottery", holidayLotterySchema);

module.exports = HolidayLottery;
