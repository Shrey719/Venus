# Why the router bullshit? 
Honestly, because it just feels right to me, and I do know there are better ways to do it, but this makes the most sense for me.  <br>

# Random wait times
For both serving and garbage collection, there are random times, (rand * 0.5 and rand * rand), which are used to hurt the scraper attempting to hit your site. The small delay on serving is to waste time, and the delay on garbage collection is some magic that works somehow into tricking a scraper into staying. 

# How the fuck is there no stack overflow 
*somehow* the promise.resolve makes it not. I have no clue how it works, I found it somewhere, but it does work.
