let cardContainer;

document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		cardContainer = document.querySelector(".card-container");
		// console.log(cardContainer);
		console.log("readyState: Complete");
		// document.getElementById("loading-screen").style.display = "none";
	}
});

// document.addEventListener("readystatechange", (event) => {
// 	event.preventDefault();
// 	const cardContainer = document.querySelector(".card-container");
// 	console.log(cardContainer);
// 	// main();
// });

// cardContainer.innerHTML = "";
async function initApp() {
	console.log(window);
	const params = new URLSearchParams(window.location.search);
	const name = params.get("uuid");
	console.log(name);
	const request = await fetch("http://localhost:3500/people/", {
		mode: "cors",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log(request);
	const response = await request.json();
	console.log(response);
	console.log(cardContainer);
	cardContainer.innerHTML = "";
	response.forEach((key) => {
		const newCard = document.createElement("div");
		newCard.className = "card";
		cardContainer.appendChild(newCard);

		const imageNameContainer = document.createElement("div");
		imageNameContainer.className = "img_n_name";
		newCard.appendChild(imageNameContainer);

		const image = document.createElement("img");
		image.setAttribute("src", `${key.picture}`);
		image.setAttribute(
			"alt",
			`${key.name.title} ${key.name.first} ${key.name.last}`
		);
		imageNameContainer.appendChild(image);

		const namePara = document.createElement("p");
		namePara.innerHTML = `${key.name.first}<br />${key.name.last}`;
		imageNameContainer.appendChild(namePara);

		const emailPara = document.createElement("p");
		emailPara.innerHTML = `EMAIL ID: ${key.email}`;
		newCard.appendChild(emailPara);

		const phonePara = document.createElement("p");
		phonePara.innerHTML = `PHONE NO.: ${key.phone}`;
		newCard.appendChild(phonePara);

		const dobPara = document.createElement("p");
		dobPara.innerHTML = `DOB: ${key.dob.split("T")[0]}`;
		newCard.appendChild(dobPara);

		const locationPara = document.createElement("p");
		locationPara.innerHTML = `LOCATION: ${key.location.city}, ${key.location.state}, ${key.location.country}`;
		newCard.appendChild(locationPara);

		const uuidPara = document.createElement("p");
		uuidPara.innerHTML = `UUID: ${key.uuid}`;
		newCard.appendChild(uuidPara);
	});
}

initApp();
