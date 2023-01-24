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

// LEVEL 200 --> SEARCH
const searchDiv = document.getElementById("searchDiv");
searchDiv.style.display = "flex";
searchDiv.style.flexDirection = "row";
searchDiv.style.justifyContent = "center";

const searchBar = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");

// STARTING POINT
function setup() {
  const allEpisodes = getAllEpisodes();
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
    if ((episode["name"].toLowerCase().includes(target.toLowerCase())) || (episode["summary"].toLowerCase().includes(target.toLowerCase()))){ 
      return episode;
    }

  });
  
  if (filteredEpisodes.length === 0) {
    return (rootElement.innerHTML = "<h1>Sorry there is no episodes</h1>");
  } else {
    searchResults.innerText = "Displaying " + filteredEpisodes.length + " of 73";
    return makePageForEpisodes(filteredEpisodes);
  }
}

window.onload = setup;
