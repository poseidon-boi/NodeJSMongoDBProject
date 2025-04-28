let cardContainer;

// document.addEventListener("readystatechange", (event) => {
// 	if (event.target.readyState === "complete") {
// 		cardContainer = document.querySelector(".card-container");
// 		// console.log(cardContainer);
// 		console.log("readyState: Complete");
// 		// document.getElementById("loading-screen").style.display = "none";
// 	}
// });

// document.addEventListener("readystatechange", (event) => {
// 	event.preventDefault();
// 	const cardContainer = document.querySelector(".card-container");
// 	console.log(cardContainer);
// 	// main();
// });

// cardContainer.innerHTML = "";

window.addEventListener("DOMContentLoaded", () => {
	cardContainer = document.querySelector(".card-container");
	// initApp();
});

const createCard = (key) => {
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

	const genderPara = document.createElement("p");
	genderPara.innerHTML = `GENDER: ${key.gender}`;
	newCard.appendChild(genderPara);

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
	uuidPara.innerHTML = `UUID: `;
	newCard.appendChild(uuidPara);

	const uuidLink = document.createElement("a");
	uuidLink.innerHTML = `${key.uuid}`;
	uuidLink.setAttribute(
		"href",
		`https://cardsproject.vercel.app/?uuid=${key.uuid}`
	);
	uuidPara.appendChild(uuidLink);
};

const initApp = async () => {
	console.log(window);
	const params = new URLSearchParams(window.location.search);
	const uuid = params.get("uuid");
	console.log(uuid);
	const request = await fetch(
		"https://cardprojectbackend.onrender.com/people/",
		{
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body:
				uuid === null
					? null
					: JSON.stringify({
							uuid: uuid,
					  }),
		}
	);
	console.log(request);
	const response = await request.json();
	console.log(response);
	console.log(cardContainer);
	cardContainer.innerHTML = "";
	if (response.length === undefined) {
		createCard(response);
	} else {
		response.forEach((key) => {
			createCard(key);
		});
	}
};

initApp();
