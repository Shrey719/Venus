# Usage 
```js
const venus = new Venus("hello")
app.use(venus.prefix, venus.route())
```
This will mount venus at /hello/


# Express.router usage 
This is kind of self explanatory but it is the only noteworthy thing here since pit.js also relies on it.  <br>
All the router does is make the scope of the tarpit distinct from the scope of the rest of the app. (ish)