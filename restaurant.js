
var client_id = "Z4OJRQC5DTCQDWM2PRZMWSRAMHIUSOGPMQHA2TUZE2Q4G5CF";
var client_secret = "0OS1RK2RK4HY1AFEAVJUKEQC35WCYALLBRZELKM2LDJMINHX";
var query = "";
var lat = "47.61";
var lon = "-122.33";
var food = "4d4b7105d754a06374d81259";
var category = "4bf58dd8d48988d17a941735";

fetch(`https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=10&ll=${lat},${lon}&categoryId=${category}&radius=40000`)
    .then(function(response) {
        // Code for handling API response
        // console.log(response);
        // console.log(response.json());
        return response.json();
        
    })
    .then(function(json) {
        console.log(json);
        var results = document.createElement("div");
        results.textContent = response.venues[1].name;
        var box = document.getElementsByClassName("button-box");
        box.appendChild(results);
    })
    .catch(function() {
        // Code for handling errors
    });
