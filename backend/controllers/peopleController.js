const data = {
	people: require("../model/data.json"),
	setPeople: function (data) {
		this.people = data;
	},
};

const getAllPeople = (req, res) => {
	res.json(data.people);
};

const createNewPerson = (req, res) => {
	const newPerson = {
		id: data.people?.length ? data.people[data.people.length - 1].id + 1 : 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	};

	if (!newPerson.firstname || !newPerson.lastname) {
		return res
			.status(400)
			.json({ message: "First and last name are required." });
	}

	data.setPeople([...data.people, newPerson]);
	res.status(201).json(data.people);
};

const updatePerson = (req, res) => {
	const person = data.people.find((per) => per.id === parseInt(req.body.id));
	if (!person) {
		return res
			.status(400)
			.json({ message: `Person ID ${req.body.id} not found` });
	}

	if (req.body.firstname) person.firstname = req.body.firstname;
	if (req.body.lastname) person.lastname = req.body.lastname;

	const filteredArray = data.people.filter(
		(per) => per.id !== parseInt(req.body.id)
	);
	const unsortedArray = [...filteredArray, person];
	data.setPeople(
		unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
	);
	res.json(data.people);
};

const deletePerson = (req, res) => {
	const person = data.people.find((per) => per.id === parseInt(req.body.id));
	if (!person) {
		return res
			.status(400)
			.json({ message: `Person ID ${req.body.id} not found` });
	}

	const filteredArray = data.people.filter(
		(per) => per.id !== parseInt(req.body.id)
	);

	data.setPeople(filteredArray);
	res.json(data.people);
};

const getPerson = (req, res) => {
	const person = data.people.find(
		(per) => per.uuid === parseInt(req.params.uuid)
	);
	if (!person) {
		return res
			.status(400)
			.json({ message: `Person ID ${req.params.id} not found` });
	}
	res.json(person);
};

module.exports = {
	getAllPeople,
	createNewPerson,
	updatePerson,
	deletePerson,
	getPerson,
};
