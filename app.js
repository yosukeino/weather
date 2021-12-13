//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const appid = "ca1f46290fdccfed062d74237774b142";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+appid;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon_code = weatherData.weather[0].icon;
      const icon = "http://openweathermap.org/img/wn/" + icon_code +"@2x.png";
      res.write("<h1>The temperature in Utsunomiya is "+ temp + " celcius</h1>");
      res.write("<h2>It's "+ weatherDescription + " yo.");
      res.write("<img src="+icon+">");
      res.send();
    });
  });
});







app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
