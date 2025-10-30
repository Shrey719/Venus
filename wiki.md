# Overview 
Venus uses honeypot pages to trap scrapers in a 'tarpit'. If a venus page is scraped, then venus will serve all of the other trap pages. 
These pages have data that *will* degenerate a model- see https://arxiv.org/pdf/2510.07192
Please note that this only works with express ( I only tested it with express )