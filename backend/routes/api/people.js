const express = require("express");
const router = express.Router();
const path = require("path");
const peopleController = require("../../controllers/peopleController");

router.route("/").post(peopleController.getPeople);

// router.route("/:uuid").post(peopleController.getPerson);

module.exports = router;
