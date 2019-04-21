# fortune-cookie
This initally was a simple class project to work with APIs.

I found the cute fortune cookie image and I wanted to have the fortune appear to be on the 'paper.'  
After converting the image to SVG and playing around with text on a path, I finally achieved what I was going for.

This also utilizes the user's local storage to store an array of fortunes.
Only fortunes that have 1 or 2 lines are kept, AND the length of each line must be less than 70 characters so that it 
would fit on the paper.

It was a simple project, but I am very interested in the powerful appearances that you can achieve when using SVGs.

"next" and "previous' will only fetch a new fortune from the API if the pointer is at the end of the array.  "Random" only 
selects a random fortune from the established array.  There is a seed, starter array, but that will grow for each user
in their local storage.

There are some strange happenings in the world of mobile!
I had to remove the 'alignment-baseline:baseline" attribute on the text path.  For some reason, safari/iphone interpreted that as 'hanging;'  removing it completely seemed to fix the problem.  And, I added 2 separate paths instead of using baseline and hanging on one path.  Mobile doesn't seem to be rendering the path exactly right - which does not make any sense given that it is an SVG...
I also had to remove the pre-line code for mobile.  "white-space: pre-line; " causes the text to be jumbled up on top of itself.  I chnaged this to white-space:nowrap; 
