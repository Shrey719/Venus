# Overview 
Venus uses honeypot pages to trap scrapers in a 'tarpit'. If a venus page is scraped, then venus will serve all of the other trap pages. 
Please note that this only works with express, you can try to use @fastify/express but its unsupported and untested