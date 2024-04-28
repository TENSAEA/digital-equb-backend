const Equb = require("../model/Equb");

exports.createEqub = async (req, res) => {
  try {
    const equb = new Equb(req.body);
    await equb.save();
    res.status(201).json(equb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEqubs = async (req, res) => {
  try {
    const equbs = await Equb.find();
    res.status(200).json(equbs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEqubById = async (req, res) => {
  try {
    const equb = await Equb.findById(req.params.id);
    if (!equb) {
      return res.status(404).json({ message: "Equb not found" });
    }
    res.status(200).json(equb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEqub = async (req, res) => {
  try {
    const equb = await Equb.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!equb) {
      return res.status(404).json({ message: "Equb not found" });
    }
    res.status(200).json(equb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEqub = async (req, res) => {
  try {
    const equb = await Equb.findByIdAndDelete(req.params.id);
    if (!equb) {
      return res.status(404).json({ message: "Equb not found" });
    }
    res.status(200).json({ message: "Equb deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
