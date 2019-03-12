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

//check for local storage
//if it exists - use this as the fortunes array.
localStorageFortunesArray = JSON.parse(localStorage.getItem('fortunes'));
console.log(localStorageFortunesArray);
console.log(typeof(localStorageFortunesArray));

if (localStorageFortunesArray) {     //zero is falsy
  //get array from local storage
  //convert the object into an array
  localStorageFortunesArray.forEach(function(saying) {
    fortunes.push(saying);
  });
    console.log("this is what is currently in local storage:");
    console.log(fortunes);
  }

else {      //there is no local storage with key of 'fortunes' - start a new one.
  console.log("there is no local storage. create initial array");
  fortunes.push("You will have a charmed life.");
  localStorage.setItem('fortunes',JSON.stringify(fortunes));
}



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
          // console.log(fortune.fortune);
          let stringTest = true;
          stringTest = testFortuneString(fortune.fortune); //how is this undefined??

          if (stringTest) {
            fortunes.push(fortune.fortune);  //add new fortune to array
            // update local storage
            localStorage.setItem('fortunes',JSON.stringify(fortunes));

            currentFortune += 1;  //add one to currentFortune - should be at end of array
            console.log("Update text is ", currentFortune);
            updateText(currentFortune);
          }
          else {
            //the format of the fortune doesn't work in our screen, get another
            updateNext();
          }
      
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
          // console.log("HH I got a new fortune from previous");
          // console.log(fortune.fortune);
          let stringTest = true;
          stringTest = testFortuneString(fortune.fortune); //how is this undefined??
          // console.log("GG mystringtest boolean is ",stringTest);

          if (stringTest) {
            console.log("FF fortune is ok length - use it");
            //if the string is 2 lines or less, use it
            fortunes.unshift(fortune.fortune);  //add new fortune to array
            //update local storage
            localStorage.setItem('fortunes',JSON.stringify(fortunes));

            //i don't need to figure out the position.  i am getting a brand new 0th element and i want to see that
            console.log("EE Update text is ", currentFortune);
            currentFortune = 0;  //i am at the beginning of array
            updateText(currentFortune);
          }
          else {  

            console.log("DD fortune too long - try again");
            //if the fortune is too long - get another one
            updatePrev();
          }
      
       });
    }
    else {
      //we aren't at the beginning of our array, so we can just cyle through
      currentFortune = ((currentFortune - 1 + fortunes.length) % fortunes.length) ;
      console.log("JJ Update text is ", currentFortune);
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

// let testString = "Kludge, n.:\n\tAn ill-assorted collection of poorly-matching parts, forming a\n\tdistressing whole.\n\t\t-- Jackson Granholm,";
//  testString = "If fifty million people say a foolish thing, it's still a foolish thing.\n\t\t-- Bertrand Russell";

//i still want to throw out anything with 3 or more lines, so, i want to test for the \n special characters.
function testFortuneString(testString){
    // console.log(testString);
    //this splits the text line into a array based on the line breaks.
    //my display can only handle two lines
    let temp = testString.split(RegExp("\n"));
    console.log(temp);
    //my function will return false if the line is too long to use
    if (temp.length > 2) {
      console.log("AA too many lines");
      return false;  //change this to false
    }
    else {    //2 or fewer lines of text
      //i also need to make sure the text lines aren't too long horizontally.
      let testEach = true;
      temp.forEach(function(line){
        if (line.length <= 70){
          console.log("BB the line lenght is",line.length);
          testEach = testEach && true;
        }
        else{
          console.log('CC the line length is too long', line.length);
          testEach = testEach && false;   //one false will set this to false
        }
      });
      return testEach;  //after testing each line, then return true or false
}
}
