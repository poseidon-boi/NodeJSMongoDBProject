const mongoose = require("mongoose");
const Human = require("../model/Human");

// const getAllPeople = (req, res) => {
// 	res.json(data.people);
// };

// const createNewPerson = (req, res) => {
// 	const newPerson = {
// 		id: data.people?.length ? data.people[data.people.length - 1].id + 1 : 1,
// 		firstname: req.body.firstname,
// 		lastname: req.body.lastname,
// 	};

// 	if (!newPerson.firstname || !newPerson.lastname) {
// 		return res
// 			.status(400)
// 			.json({ message: "First and last name are required." });
// 	}

// 	data.setPeople([...data.people, newPerson]);
// 	res.status(201).json(data.people);
// };

// const updatePerson = (req, res) => {
// 	const person = data.people.find((per) => per.id === parseInt(req.body.id));
// 	if (!person) {
// 		return res
// 			.status(400)
// 			.json({ message: `Person ID ${req.body.id} not found` });
// 	}

// 	if (req.body.firstname) person.firstname = req.body.firstname;
// 	if (req.body.lastname) person.lastname = req.body.lastname;

// 	const filteredArray = data.people.filter(
// 		(per) => per.id !== parseInt(req.body.id)
// 	);
// 	const unsortedArray = [...filteredArray, person];
// 	data.setPeople(
// 		unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
// 	);
// 	res.json(data.people);
// };

// const deletePerson = (req, res) => {
// 	const person = data.people.find((per) => per.id === parseInt(req.body.id));
// 	if (!person) {
// 		return res
// 			.status(400)
// 			.json({ message: `Person ID ${req.body.id} not found` });
// 	}

// 	const filteredArray = data.people.filter(
// 		(per) => per.id !== parseInt(req.body.id)
// 	);

// 	data.setPeople(filteredArray);
// 	res.json(data.people);
// };

const getPeople = async (req, res) => {
	// const person = data.people.find((per) => per.uuid === req.body.uuid);
	// await mongoose.connect(process.env.DATABASE_URI, {});
	if (req.body.uuid === undefined) {
		const mongooseHumans = await Human.find({});
		console.log(mongooseHumans.length);
		res.json(mongooseHumans);
	} else {
		const mongooseHuman = await Human.find({ uuid: req.body.uuid }).exec();
		console.log(mongooseHuman);
		res.json(mongooseHuman);
	}

	// console.log(typeof mongooseHuman);
	// console.log(mongooseHuman.length);

	// console.log("Connected to DB:", mongoose.connection);
	// console.log(Human);
};

module.exports = {
	getPeople,
};
