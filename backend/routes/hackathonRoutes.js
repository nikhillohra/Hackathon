const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");
const {
  validationRules,
  validate,
} = require("../middlewares/validationMiddleware");
const upload = require("../multerConfig");

// Route to handle hackathon creation
router.post(
  "/",
  upload.single("image"),
  validationRules,
  validate,
  hackathonController.createHackathon
);

// Route to handle hackathon update
router.put("/:id", upload.single("image"), hackathonController.updateHackathon);

// Get all hackathons
router.get("/", hackathonController.getHackathons);

// Get a specific hackathon by ID
router.get("/:id", hackathonController.getHackathon);

// Delete a hackathon by ID
router.delete("/:id", hackathonController.deleteHackathon);

module.exports = router;
