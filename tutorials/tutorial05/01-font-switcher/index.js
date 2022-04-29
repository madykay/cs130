const makeBigger = () => {
   txt = document.querySelector(".content");
   style = window.getComputedStyle(txt).getPropertyValue("font-size");
   currentSize = parseFloat(style);
   txt.style.fontSize = (currentSize + 3) + "px";
};

const makeSmaller = () => {
   txt = document.querySelector(".content");
   style = window.getComputedStyle(txt).getPropertyValue("font-size");
   currentSize = parseFloat(style);
   txt.style.fontSize = (currentSize - 3) + "px";
};


document.querySelector("#a1").addEventListener('click', makeBigger);
document.querySelector("#a2").addEventListener('click', makeSmaller);

