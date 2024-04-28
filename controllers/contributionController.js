const Contribution = require("../model/Contribution");

exports.createContribution = async (req, res) => {
  try {
    const contribution = new Contribution({
      ...req.body,
    });
    await contribution.save();
    res.status(201).json(contribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find();
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContributionById = async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);
    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }
    res.status(200).json(contribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContribution = async (req, res) => {
  try {
    const contribution = await Contribution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }
    res.status(200).json(contribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContribution = async (req, res) => {
  try {
    const contribution = await Contribution.findByIdAndRemove(req.params.id);
    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }
    res.status(200).json({ message: "Contribution deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
