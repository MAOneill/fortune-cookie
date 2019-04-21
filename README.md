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
