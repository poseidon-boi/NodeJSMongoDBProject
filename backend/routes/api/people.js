const express = require("express");
const router = express.Router();
const path = require("path");
const peopleController = require("../../controllers/peopleController");

router
	.route("/")
	.get(peopleController.getAllPeople)
	.post(peopleController.createNewPerson)
	.put(peopleController.updatePerson)
	.delete(peopleController.deletePerson);

router.route("/:uuid").get(peopleController.getPerson);

module.exports = router;
