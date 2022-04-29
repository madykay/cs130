const makeDefault = () => {
   document.querySelector("body").className = "none";
}

const makeDesert = () => {
   document.querySelector("body").className = "desert";
}

const makeOcean = () => {
   document.querySelector("body").className = "ocean";
}

const makeHighContrast = () => {
   document.querySelector("body").className = "high-contrast";
}

document.querySelector("#default").addEventListener('click' , makeDefault);
document.querySelector("#desert").addEventListener('click' , makeDesert);
document.querySelector("#ocean").addEventListener('click' , makeOcean);
document.querySelector("#high-contrast").addEventListener('click' , makeHighContrast);