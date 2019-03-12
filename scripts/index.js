//array of fortunes.  edited from http://yerkee.com/api/fortune
//i inserted <br> so it would fit on my fortune display
const staticFortunes = [{"fortune":"Play Rogue, visit exotic locations, \r\nmeet strange creatures and kill them."},
{"fortune":"While having never invented a sin, \r\nI'm trying to perfect several."},
{"fortune":"Do not believe in miracles -- rely on them."},
{"fortune":"giraffiti:Vandalism spray-painted very, very high."},
{"fortune":"Algebraic symbols are used when you do not know \r\nwhat you are talking about.- Philippe Schnoebelen"},
{"fortune":"No one gets too old to learn \r\na new way of being stupid.\""},
{"fortune":"Yes, but every time I try to see things your way,\r\n I get a headache."},
{"fortune":"serendipity, n.:he process by which human knowledge is advanced."},
{"fortune":"Life is not for everyone."},
{"fortune":"You can make it illegal, \r\nbut you can't make it unpopular."}]

//need variable to hold current fortune
let currentFortune = 0;
//get pointers to the button, and cookie text element
const fortunes = [];
fortunes.push("You will have a charmed life.");
console.log(fortunes);

const cookieText = document.querySelector('[data-fortune]');
const buttonFortuneRandom = document.querySelector('[data-button-random]');
const buttonFortuneNext = document.querySelector('[data-button-forward]');
const buttonFortunePrev = document.querySelector('[data-button-reverse]');

//assign event listeners to the buttons
buttonFortuneRandom.addEventListener('click',updateRandom);
buttonFortuneNext.addEventListener('click',updateNext);
buttonFortunePrev.addEventListener('click',updatePrev);



function updateText (fortuneNumber) {
    cookieText.textContent = fortunes[fortuneNumber];
};
function updateNext() {
    if (currentFortune === (fortunes.length -1)) {
      //if we are add the array end, grab a new fortune using fetch
      fetch('https://my-little-cors-proxy.herokuapp.com/http://yerkee.com/api/fortune')
        .then(function (r) { return r.json()})
        .then(function (fortune) { 
          console.log(fortune.fortune);
          // let temp = fortune.fortune.split(RegExp("\n"));
          // console.log(temp);
          fortunes.push(fortune.fortune);  //add new fortune to array
          currentFortune += 1;  //add one to currentFortune - should be at end of array
          // currentFortune = ((currentFortune + 1) % fortunes.length);
          console.log("Update text is ", currentFortune);
          updateText(currentFortune);
      
       });
    }
    else {
      //we aren't at the end of our array, so we can just cyle through
      currentFortune = ((currentFortune + 1) % fortunes.length);
      console.log("Update text is ", currentFortune);
      updateText(currentFortune);
    }
}

function updatePrev() {
    if (currentFortune === 0) {
      //if we are at the array beginning, grab a new fortune using fetch
      fetch('https://my-little-cors-proxy.herokuapp.com/http://yerkee.com/api/fortune')
        .then(function (r) { return r.json()})
        .then(function (fortune) { 
          console.log("I got a new fortune from previous");
          console.log(fortune.fortune);
          // let temp = fortune.fortune.split(RegExp("\n"));
          // console.log(temp);
          fortunes.unshift(fortune.fortune);  //add new fortune to array
          //i don't need to figure out the position.  i am getting a brand new 0th element and i want to see that
          console.log("Update text is ", currentFortune);
          currentFortune = 0;  //i am at the beginning of array
          updateText(currentFortune);
      
       });
    }
    else {
      //we aren't at the beginning of our array, so we can just cyle through
      currentFortune = ((currentFortune - 1 + fortunes.length) % fortunes.length) ;
      console.log("Update text is ", currentFortune);
      updateText(currentFortune);
    }
}


function updateRandom() {
  // Careful with the accidental global variables!
  // http://tobyho.com/2011/10/25/js-accidental-global-variables/
    let randomNumber = (parseInt(Math.random() * fortunes.length));
    console.log(randomNumber);
    updateText(randomNumber);
    currentFortune = randomNumber;
}
//grab live data (using herokuapp as a proxy server - workaround from C.Aquino)
//only assign event listeners to the data elements AFTER array of fortunes is collected 
for (let i=1; i<=0; i++){
  fetch('https://my-little-cors-proxy.herokuapp.com/http://yerkee.com/api/fortune')
    .then(function (r) { return r.json()})
      .then(function (fortune) { 
        console.log(fortune.fortune);
        // let temp = fortune.fortune.split(RegExp("\n"));
        // console.log(temp);
        fortunes.push(fortune.fortune);
       });
       if (i === maxFortunes) {
         console.log("printing fortunes");
         console.log(fortunes);

       }

}

