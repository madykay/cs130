const laststop = [
    'images/LastStop/laststop00.jpeg',
    'images/LastStop/Laststop01.jpeg',
    'images/LastStop/laststop02.jpeg',
    'images/LastStop/laststop03.jpeg',
    'images/LastStop/laststop04.jpeg'
];

let currentIndex = 1;

const showNext = (ev) => {
    currentIndex +=1;
    const elem = laststop[currentIndex];
    document.querySelector('.currentImage').src = `${elem}`;
    if (currentIndex == 4) {
        currentIndex=-1
    };
};

const showPrev = (ev) => {
    if (currentIndex == 0) {
        currentIndex = 4
    };
    currentIndex -= 1;
    const elem = laststop[currentIndex];
    document.querySelector('.currentImage').src = `${elem}`;
};

document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrev;