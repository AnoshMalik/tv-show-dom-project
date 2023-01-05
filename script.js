//You can edit ALL of the code here
const rootElement = document.getElementById("root");
rootElement.style.display = "flex";
rootElement.style.flexDirection = "row";
rootElement.style.flexWrap = "wrap";
rootElement.style.justifyContent = "center";

const body = document.body;
body.style.backgroundColor = "#e8e8e8";






function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  

function makePageForEpisodes(episodes) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  for (let x = 0; x < episodes.length; x++) {
    rootElement.appendChild(createCard(episodes[x]));
    // console.log(episodes);
  }
}

}



function createCard(episode) {

  // const oneEpisode = getOneEpisode();
  console.log(episode);
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

  // let pValue = oneEpisode.summary.replaceAll("<p>", "");
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
  
  // container.style.maxHeight = "400px";


  container.style.backgroundColor = "white";
  container.style.margin = "10px";
  container.style.padding = "10px";
  container.style.borderRadius = "20px";
  container.style.borderColor = "black";

  return container;

 }

// const rootElement = document.getElementById("root");
// const p = rootElement.appendChild("p");
// p.textContent = "BLAHH";


window.onload = setup;
