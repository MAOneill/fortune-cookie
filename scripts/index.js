//array of fortunes.  edited from http://yerkee.com/api/fortune
//i inserted <br> so it would fit on my fortune display
const fortunes = [{"fortune":"Play Rogue, visit exotic locations, \r\nmeet strange creatures and kill them."},
{"fortune":"While having never invented a sin, \r\nI'm trying to perfect several."},
{"fortune":"Do not believe in miracles -- rely on them."},
{"fortune":"giraffiti:Vandalism spray-painted very, very high."},
{"fortune":"Algebraic symbols are used when you do not know \r\nwhat you are talking about.- Philippe Schnoebelen"},
{"fortune":"No one gets too old to learn \r\na new way of being stupid.\""},
{"fortune":"Yes, but every time I try to see things your way,\r\n I get a headache."},
{"fortune":"serendipity, n.:he process by which human knowledge is advanced."},
{"fortune":"Life is not for everyone."},
{"fortune":"You can make it illegal, \r\nbut you can't make it unpopular."}]

//get pointers to the button, and cookie text element

const cookieText = document.querySelector('[data-fortune]');
const buttonFortune = document.querySelector('[data-button]');

randomNumber = parseInt(Math.random() * fortunes.length)
console.log(randomNumber);

cookieText.textContent = fortunes[randomNumber].fortune;
