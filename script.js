//You can edit ALL of the code here

const body = document.body;
body.style.backgroundColor = "#e8e8e8";


const rootElement = document.getElementById("root");
rootElement.style.display = "flex";
rootElement.style.flexDirection = "row";
rootElement.style.flexWrap = "wrap";
rootElement.style.justifyContent = "center";

// LEVEL 200 --> SEARCH 
const searchDiv = document.getElementById("searchDiv");
searchDiv.style.display = "flex";
searchDiv.style.flexDirection = "row";
searchDiv.style.justifyContent = "center";

const searchBar = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");





function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

}

function makePageForEpisodes(episodes) {

  for (let x = 0; x < episodes.length; x++) {
    rootElement.appendChild(createCard(episodes[x]));
  }
}





function createCard(episode) {

  // console.log(episode);
  const episodeName = episode.name;
  let seasonNumber = episode["season"].toString().padStart(2,0);
  let episodeNumber = episode.number.toString().padStart(2, 0);
  const episodeKey = `${episodeName} \n\ S${seasonNumber} - E${episodeNumber}`;

  const container = document.createElement("div");
  const secondaryContainer = document.createElement("div");
  const button = document.createElement("button");
  const image = document.createElement("img");
  const p = document.createElement("p");

  button.innerText = episodeKey; 
  button.onclick = () => {
    window.location = `${episode.url}`
  };
  button.style.width = "250px";
  button.style.height = "75px";
  button.style.borderRadius = "20px 20px 0 0 ";


  button.style.fontSize = "17px";
  button.style.fontWeight = "900";

  pValue = episode.summary.replaceAll("</p>", "");
  gValue = pValue.replaceAll("<p>","");
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



searchBar.oninput = searchMatches();

function searchMatches() {
  const allRecords = getAllEpisodes();
  
  
  // for (let x of allRecords) {
  //   if (x.summary.includes(searchBar.value) || x.name.includes(searchBar.value)) { 
  //             console.log("Found record : " + x.number + " : " + x.name);

  //   }
  // }

  console.log(allRecords.map(record => record.name).filter(name => name.includes(searchBar.value)));


  searchResults.innerText = searchBar.value;
  console.log(searchBar.value);
  // }else { 
    

  // }

 }


window.onload = setup;
