// import _ from "underscore";
// import * as _ from "underscore";

// NEW CODE
//You can edit ALL of the code here

// GLOBAL VARS
const body = document.body;
body.style.backgroundColor = "#e8e8e8";

const rootElement = document.getElementById("root");
rootElement.style.display = "flex";
rootElement.style.flexDirection = "row";
rootElement.style.flexWrap = "wrap";
rootElement.style.justifyContent = "center";
// GLOBAL VARS

// Level 400
let fetchEpisodes;
let fetchShows;
  fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((jsonData) => jsonData.json())
  .then((data) => fetchEm(data));

function fetchEm(data) {
  fetchEpisodes = data;
}
// Level 400

// Level 300 --> Episodes SELECT Tag
const episodesSelectTag = document.getElementById("episodesSelectTag");
// Level 400 - Shows SELECT Tag
const showsSelectTag = document.getElementById("showsSelectTag");


// LEVEL 200 --> SEARCH
const searchDiv = document.getElementById("searchDiv");
searchDiv.style.display = "flex";
searchDiv.style.flexDirection = "row";
searchDiv.style.justifyContent = "center";

const searchBar = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");
// Level 200

// STARTING POINT
function setup() {
  // Level 200
  // const allEpisodes = getAllEpisodes();

  // Level 400 --> REPLACE JSON FILE W/ FETCH
  const allEpisodes = fetchEpisodes;
  makePageForEpisodes(allEpisodes);
}
// STARTING POINT


// (RE)LOAD FEATURES
function makePageForEpisodes(episodes) {
  rootElement.innerHTML = "";
  for (let x = 0; x < episodes.length; x++) {
    rootElement.appendChild(createCard(episodes[x]));
  }
}

// CREATE CARDS
function createCard(episode) {
  const episodeName = episode.name;
  let seasonNumber = episode["season"].toString().padStart(2, 0);
  let episodeNumber = episode.number.toString().padStart(2, 0);
  const episodeKey = `${episodeName} \n\ S${seasonNumber} - E${episodeNumber}`;

  const container = document.createElement("div");
  const secondaryContainer = document.createElement("div");
  const button = document.createElement("button");
  const image = document.createElement("img");
  const p = document.createElement("p");

  button.innerText = episodeKey;
  button.onclick = () => {
    window.location = `${episode.url}`;
  };
  button.style.width = "250px";
  button.style.height = "75px";
  button.style.borderRadius = "20px 20px 0 0 ";

  button.style.fontSize = "17px";
  button.style.fontWeight = "900";

  pValue = episode.summary.replaceAll("</p>", "");
  gValue = pValue.replaceAll("<p>", "");
  p.innerText = gValue;
  p.style.color = "grey";
  p.style.fontFamily = "Impact,Charcoal,sans-serif";

  image.src = episode.image.medium;

  secondaryContainer.appendChild(image);
  secondaryContainer.appendChild(p);

  container.appendChild(button);
  container.appendChild(secondaryContainer);
  container.style.width = "250px";
  container.style.minHeight = "500px";

  container.style.backgroundColor = "white";
  container.style.margin = "10px";
  container.style.padding = "10px";
  container.style.borderRadius = "20px";
  container.style.borderColor = "black";

  return container;
}
// CREATE CARDS

searchBar.oninput = searchMatches();

// SEARCH FUNCTION
function searchMatches() {
  let target = searchBar.value;

  const filteredEpisodes = getAllEpisodes().filter((episode) => {
    if (
      episode["name"].toLowerCase().includes(target.toLowerCase()) ||
      episode["summary"].toLowerCase().includes(target.toLowerCase())
    ) {
      return episode;
    }
  });

  if (filteredEpisodes.length === 0) {
    return (rootElement.innerHTML = "<h1>Sorry there is no episodes</h1>");
  } else {
    searchResults.innerText =
      "Displaying " + filteredEpisodes.length + " of 73";
    return makePageForEpisodes(filteredEpisodes);
  }
}
// Level 200 Complete

// Level 300
const episodesList = getAllEpisodes();
// Level 300


// Level 400
const showsList = getAllShows();
const sortedShowsList = _.sortBy(showsList, "name");
// Level 400

// Q1. WHY IS THIS LOADING WHEN WNDOW LOADS i.e BEFORE ITS CLICKED
// Level 200
// selectTag.onclick = populateSelect(episodesList);

// Level 300
episodesSelectTag.onclick = populateSelect(episodesList);
showsSelectTag.onclick = populateSelectShows(sortedShowsList);

// Q2. WHYS IS THIS NOT?
// NOT USED #1
// selectTag.onchange = redirectToEpisode();

// Q3. WHY IS THIS WORKING AS INTENDED?
episodesSelectTag.addEventListener("change", () => {
  console.log("onChange method() : " + episodesSelectTag.value);
  window.open(episodesList[episodesSelectTag.value].url);
});

showsSelectTag.addEventListener("change", () => {
  
  console.log(showsSelectTag.value);

  fetch(`https://api.tvmaze.com/shows/${showsSelectTag.value}/episodes`)
    .then((jsonData) => jsonData.json())
    .then((data) => fetchEm(data));
  makePageForEpisodes(fetchEpisodes);
  populateSelect(fetchEpisodes);  
});


// SELECT TAG FOR EPISODES
function populateSelect(episodes) {
  const allEpisodes = episodes;

  allEpisodes.map((episode, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.innerHTML = episode.name;
    episodesSelectTag.appendChild(option);

  });
}

// SELECT TAG FOR SHOWS
function populateSelectShows(shows) {
  const allShows = shows;

  allShows.map((show, index) => {
    let option = document.createElement("option");
    option.value = show.id;
    option.innerHTML = show.name;
    showsSelectTag.appendChild(option);
  });
}




window.onload = setup;
