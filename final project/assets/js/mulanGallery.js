const mulan = [
    'images/MuLan/mulan00.jpg',
    'images/MuLan/mulan01.jpg',
    'images/MuLan/mulan02.jpeg',
    'images/MuLan/mulan03.jpeg',
    'images/MuLan/mulan04.jpeg',
    'images/MuLan/mulan05.jpeg'
];

let currentIndex = 1;

const showNext = (ev) => {
    currentIndex +=1;
    const elem = mulan[currentIndex];
    document.querySelector('.currentImage').src = `${elem}`;
    if (currentIndex == 5) {
        currentIndex=-1
    };
};

const showPrev = (ev) => {
    if (currentIndex == 0) {
        currentIndex = 5
    };
    currentIndex -= 1;
    const elem = mulan[currentIndex];
    document.querySelector('.currentImage').src = `${elem}`;
};

document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrev;