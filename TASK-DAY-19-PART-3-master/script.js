//API
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// VARIABLES
let input = document.getElementById("searchin");
let word = document.getElementById("word");
let pos = document.getElementById("pos");
let uk = document.getElementById("uk");
let us = document.getElementById("us");
let syn = document.getElementById("synonyms");
let ant = document.getElementById("antonyms");
let sourceURL = document.querySelector("#sourceURL");
let def = document.getElementById("definition");
let eg = document.getElementById("example");
let audioDiv = document.getElementById("audio-container");
let ring = document.getElementById("ring");
let clear = document.getElementsByClassName("clear");
let errorBox = document.getElementById("errorBox");
let btnUK = document.getElementById("btnUK");
let surl = document.getElementById("surl");
let hr = document.getElementsByTagName("hr");
let box = document.getElementById("content-container");
box.hidden = true;

// SEARCH FUNCTION
function searchFunc() {
	let x = input.value;
	fetchData(x);
	box.hidden = false;
	errorBox.hidden = true;
}

// FUNCTION TO GET DATA FROM SERVER
async function fetchData(id) {
	try {
		let res = await fetch(url + id);
		let data = await res.json();
		if (res.status == 404) {
			nothing(data);
		} else {
			update(data);
		}
	} catch (error) {
		console.error(error);
		box.hidden = true;
		alert("Sorry data not found. Search another word");
	}
}

function update(data) {
	// console.log(data)

	if (document.querySelectorAll("#music")) {
		let clean = document.querySelectorAll("#music");
		clean.forEach((element) => {
			element.remove();
		});
	}

	if (document.querySelectorAll(".clear")) {
		let cleaner = document.querySelectorAll(".clear");
		cleaner.forEach((element) => {
			element.innerHTML = "";
		});
	}

	word.innerHTML = `${data[0].word}`;
	pos.innerHTML = `Part of Speech : ${data[0].meanings[0].partOfSpeech}`;
	uk.innerHTML = data[0].phonetics[1].text || "NA";
	// console.log(uk.innerHTML)
	us.innerHTML = data[0].phonetics[2].text;
	def.innerHTML = `Definition : ${data[0].meanings[0].definitions[0].definition}`;
	eg.innerHTML = `Example : ${data[0].meanings[0].definitions[0].example}`;
	syn.innerHTML = `Synonyms : ${data[0].meanings[0].synonyms}`;
	ant.innerHTML = `Antonyms : ${data[0].meanings[0].antonyms}`;
	sourceURL.innerHTML = data[0].sourceUrls[0];
	sourceURL.setAttribute("href", data[0].sourceUrls[0]);

	let music = document.createElement("audio");
	music.setAttribute("id", "music");
	audioDiv.appendChild(music);
	let ring = document.createElement("source");
	ring.setAttribute("src", `${data[0].phonetics[0].audio}`);
	ring.setAttribute("id", "ring");
	ring.setAttribute("type", "audio/mpeg");
	music.appendChild(ring);
}

function ringUK() {
	let track = document.getElementById("music");
	track.play();
}

function nothing(data) {
	btnUK.hidden = true;
	errorBox.hidden = false;
	surl.hidden = true;

	console.log(data);

	if (document.querySelectorAll(".clear")) {
		let cleaner = document.querySelectorAll(".clear");
		cleaner.forEach((element) => {
			element.innerHTML = "";
		});
	}

	errorBox.innerHTML = `${data.title}${data.message}${data.resolution}`;
}

document.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		searchFunc();
	}
});
