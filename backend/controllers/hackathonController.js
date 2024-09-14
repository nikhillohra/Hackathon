const Hackathon = require("../models/hackathon");
const { validationResult } = require("express-validator");

// Create a new hackathon
exports.createHackathon = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract form data
  const { title, startDate, endDate, description, level, status } = req.body;
  const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

  // Create the hackathon
  const hackathon = new Hackathon({
    title,
    startDate,
    endDate,
    description,
    level,
    status,
    image,
  });

  try {
    await hackathon.save();
    return res.status(201).json(hackathon);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

// Get all hackathons with filtering and sorting
exports.getHackathons = async (req, res) => {
  try {
    const { status, level, sort } = req.query;
    let filter = {};

    // Apply status filtering
    if (status) {
      filter.status = { $in: status.split(",") };
    }

    // Apply level filtering
    if (level) {
      filter.level = { $in: level.split(",") };
    }

    // Query the database with filters
    let query = Hackathon.find(filter);

    // Apply sorting if needed
    if (sort === "newest") {
      query = query.sort({ startDate: -1 });
    } else if (sort === "oldest") {
      query = query.sort({ startDate: 1 });
    }

    const result = await query.exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific hackathon
exports.getHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }
    res.status(200).json(hackathon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a hackathon
exports.updateHackathon = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, startDate, endDate, description, level, status } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null; // Handle image path

    const updateData = {
      title,
      startDate,
      endDate,
      description,
      level,
      status,
      image,
    };

    // Remove any properties that are undefined or null
    Object.keys(updateData).forEach((key) =>
      updateData[key] === undefined || updateData[key] === null
        ? delete updateData[key]
        : {}
    );

    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }
    res.status(200).json(hackathon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a hackathon
exports.deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }
    res.status(200).json({ message: "Hackathon deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
