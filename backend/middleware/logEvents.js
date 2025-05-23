const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, fileName) => {
	const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
	try {
		// await fsPromises.appendFile(
		// 	path.join(__dirname, "..", "logs", fileName),
		// 	logItem
		// );
		console.log(logItem);
	} catch (err) {
		console.error(err);
	}
};

const logger = (req, res, next) => {
	// logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, "reqLog.txt");
	console.log(`${req.method} ${req.path}`);
	next();
};

module.exports = { logEvents, logger };
