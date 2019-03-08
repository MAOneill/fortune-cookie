//array of fortunes.  edited from http://yerkee.com/api/fortune
//i inserted <br> so it would fit on my fortune display
const fortunes = [{"fortune":"1 Play Rogue, visit exotic locations, \r\nmeet strange creatures and kill them."},
{"fortune":"2 While having never invented a sin, \r\nI'm trying to perfect several."},
{"fortune":"3 Do not believe in miracles -- rely on them."},
{"fortune":"4 giraffiti:Vandalism spray-painted very, very high."},
{"fortune":"5 Algebraic symbols are used when you do not know \r\nwhat you are talking about.- Philippe Schnoebelen"},
{"fortune":"6 No one gets too old to learn \r\na new way of being stupid.\""},
{"fortune":"7 Yes, but every time I try to see things your way,\r\n I get a headache."},
{"fortune":"8 serendipity, n.:he process by which human knowledge is advanced."},
{"fortune":"9 Life is not for everyone."},
{"fortune":"10 You can make it illegal, \r\nbut you can't make it unpopular."}]

//need variable to hold current fortune
let currentFortune = -1;
//get pointers to the button, and cookie text element

const cookieText = document.querySelector('[data-fortune]');
const buttonFortuneRandom = document.querySelector('[data-button-random]');
const buttonFortuneNext = document.querySelector('[data-button-forward]');
const buttonFortunePrev = document.querySelector('[data-button-reverse]');

//assign event listeners to the buttons
buttonFortuneRandom.addEventListener('click',updateRandom);
buttonFortuneNext.addEventListener('click',updateNext);
buttonFortunePrev.addEventListener('click',updatePrev);


function updateText (fortuneNumber) {
    cookieText.textContent = fortunes[fortuneNumber].fortune;
};
function updateNext() {
    currentFortune = (currentFortune + 1) % fortunes.length;
    console.log(currentFortune);
    updateText(currentFortune);
}
function updatePrev() {
    currentFortune = (currentFortune - 1 + fortunes.length) % fortunes.length;
    console.log(currentFortune);
    updateText(currentFortune);
}
function updateRandom() {
    randomNumber = parseInt(Math.random() * fortunes.length)
    // console.log(randomNumber);
    updateText(randomNumber);
    currentFortune = randomNumber;
}