
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
        // object is called "json"
        // response is an object inside the return json object
        console.log(json.response.venues[1].name);
        for (let i=0; i<10; i++) {
            var box = document.getElementById("results-box");

            // icon code
            var rank = document.createElement("div");
            rank.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet");
            rank.textContent = i + 1;
            box.appendChild(rank);

            // restaurant name & address
            var results = document.createElement("div");
            results.setAttribute("class", "mdc-layout-grid__cell--span-8-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-4-tablet");
            var restName = document.createElement("h2");
            restName.setAttribute("class", "restaurant-name");
            restName.textContent = json.response.venues[i].name;
            var address = document.createElement("p");
            address.textContent = json.response.venues[i].location.formattedAddress;
            results.appendChild(restName);
            results.appendChild(address);
            box.appendChild(results);
            
            // delivery button code
            var delivery = document.createElement("button");
            delivery.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-button mdc-button--raised mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet");
            delivery.setAttribute("style", "background: #e74c3c");
            delivery.textContent = "order delivery";
            box.appendChild(delivery);
        }
    })
    .catch(function() {
        // Code for handling errors
    });
