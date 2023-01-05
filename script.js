//You can edit ALL of the code here
const rootElement = document.getElementById("root");


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(createCard());
}



function createCard() {

  const oneEpisode = getOneEpisode();
  const episodeName = oneEpisode.name;
  let seasonNumber = oneEpisode.season.toString().padStart(2,0);
  let episodeNumber = oneEpisode.number.toString().padStart(2, 0);

  const container = document.createElement("div");
  const secondaryContainer = document.createElement("div");
  const button = document.createElement("button");
  const image = document.createElement("img");
  const p = document.createElement("p");

  button.innerText = `${episodeName} - S${seasonNumber} - E${episodeNumber}`; 
  button.style.width = "250px";
  button.style.fontSize = "17px";

  // let pValue = oneEpisode.summary.replaceAll("<p>", "");
  pValue = oneEpisode.summary.replaceAll("</p>", "");
  gValue = pValue.replaceAll("<p>","");
  p.innerText = gValue;
  p.style.color = "black";  


  image.src = oneEpisode.image.medium;

  secondaryContainer.appendChild(image);
  secondaryContainer.appendChild(p);
  
  container.appendChild(button);
  container.appendChild(secondaryContainer);
  container.style.width = "250px";
  container.style.backgroundColor = "beige";
  return container;

 }

// const rootElement = document.getElementById("root");
// const p = rootElement.appendChild("p");
// p.textContent = "BLAHH";


window.onload = setup;
