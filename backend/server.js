require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.port || 3500;

// Connect to MongoDB
connectDB();

// Custom middleware logger
app.use(logger);

// cors = Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded data aka form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json files
app.use(express.json());

// Built-in middleware to serve static files
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));

app.use("/", require("./routes/root"));
app.use("/people", require("./routes/api/people"));

// Route handlers
// app.get(
// 	"/hello(.html)?",
// 	(req, res, next) => {
// 		console.log("attempted to load hello.html");
// 		next();
// 	},
// 	(req, res) => {
// 		res.send("Hello World!");
// 	}
// );

// const one = (req, res, next) => {
// 	console.log("one");
// 	next();
// };

// const two = (req, res, next) => {
// 	console.log("two");
// 	next();
// };

// const three = (req, res) => {
// 	console.log("three");
// 	res.send("Finished!");
// };

// app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
	res.status(404);
	// if (req.accepts("html")) {
	// 	res.sendFile(path.join(__dirname, "pages", "404.html"));
	// } else
	if (req.accepts("json")) {
		res.json({ err: "404 Not Found" });
	} else {
		res.type("text").send("404 Not Found");
	}
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

/** This code was used to extract the 100 results from the random user api and
 *  get only the parts of the json data useful in the project
 */

// const peopleData = require("../data.json");
// console.log(typeof peopleData);
// const usefulPeopleData = peopleData.results.map((personData) => {
// 	return {
// 		gender: personData.gender,
// 		name: personData.name,
// 		location: {
// 			city: personData.location.city,
// 			state: personData.location.state,
// 			country: personData.location.country,
// 		},
// 		email: personData.email,
// 		uuid: personData.login.uuid,
// 		dob: personData.dob.date,
// 		phone: personData.phone,
// 		picture: personData.picture.large,
// 	};
// });
// console.log(usefulPeopleData.length);

// const fs = require("fs");

// const usefulPeopleDataString = JSON.stringify(usefulPeopleData, null, "\t");
// // fs.writeFile("./data.json", usefulPeopleDataString, (err) => {
// // 	if (err) {
// // 		console.error(err);
// // 	} else {
// // 		console.log("Written successfully!");
// // 	}
// // });
