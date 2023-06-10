const express = require("express"); //importing the express module.
// const nodemon = require("nodemon");
const app = express(); //we are just creating our express application here.
const bodyParser = require("body-parser"); //importing our body-parser module.
const https = require("https"); //importing our http modules.
const { json } = require("body-parser"); //this line will just be telling it to import our json function form body-parser.

app.use(bodyParser.urlencoded({ extended: true })); // this will just be setting up our body-parser middleware to parse url-encoded data, checking if our code is correct.
app.use(express.static("public")); //here we are telling our middleware function to look in our public directory.
//when a request will be made to the server for a static file, express will just check if the file exists in the specified directory.

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});
//this would just send our html html file as the response

app.post("/", function (req, res) {
  // we will be referring to our http method post to handle the request to the root route('/')
  const cityName = req.body.cityName; // retrieving the value of the "cityName" parameter from the request
  const apiKey = "c7a72e8ce618a7d713e929b651fcf904"; // i am just putting my api key into a variable to just use it as a literal to refer to it.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`; // we will use the api key to retrieve the weather data from the server and send it to the server with the weather data returned from the server.
  https.get(url, function (response) {
    // we will be referring to our http method get to handle the request to the Open Weather map API
    response.on("data", function (data) {
      //this will just be listening for the "data" event which will be triggered when we get our data from the API response.
      const jsondata = JSON.parse(data); //we will parse the received data as JSON.
      console.log(jsondata); //here we will just parse the console just so i know what im looking at.
      const temp = jsondata.main.temp; //here we will be extracting the temperature from the api response.
      const des = jsondata.weather[0].description; // here we will just be extracting the weather description from the API response.
      const icon = jsondata.weather[0].icon; // here we will just the weather icon from the API response.
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; // the url for the weather icon image.
      res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`); // send a response with the temperature.
      res.write(`<p>The weather description is ${des} </p>`); //send a response with the temperature.
      res.write("<img src=" + imageurl + ">"); //send our weather icon that corresponds with the weather
      res.send(); //send the response to the client
    });
  });
});
app.listen(9000, function () {
  //this is just to start the server and listen on port 9000.
  console.log("Server is running on port 9000");
});
