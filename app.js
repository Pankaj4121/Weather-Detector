const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "d0030434d17979f583ca267f34b326ec";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" +units;

    https.get(url, function(response){
         console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)   // get all data in the form of Object type
            const temp = weatherData.main.temp     // get specific data 
            const weatherDescription = weatherData.weather[0].description // get specific data
            const icon = weatherData.weather[0].icon
            const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p> The Weather of " + query + " is " + weatherDescription + "</p>");
            res.write("<h1> The Temperature of " + query +" is " + temp + " degree Celcius </h1>");
            res.write("<img src=" + imageURL + "> ");
            res.send();
    })
})
})
















app.listen(3000, function(){
    console.log("Server is running on the port 3000");
})