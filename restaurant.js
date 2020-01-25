
var client_id = "Z4OJRQC5DTCQDWM2PRZMWSRAMHIUSOGPMQHA2TUZE2Q4G5CF";
var client_secret = "0OS1RK2RK4HY1AFEAVJUKEQC35WCYALLBRZELKM2LDJMINHX";
var query = "";
var lat = "";
var lon = "";

getUserLocation();

function getUserLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = (position.coords.latitude).toFixed(2);
            lon = (position.coords.longitude).toFixed(2);
            console.log(lat);
            console.log(lon);

            getCategory();

        });
    }
    else {
        //display message that their location cannot be found

    }
}

function getCategory() {

    const category = JSON.parse(window.localStorage.getItem('restaurantCategory'));

    if (category === "" || null) {
        //display message that no category was selected

    }
    else {
        getRestaurants(category);
    }
}

function getRestaurants(category) {

    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=10&ll=${lat},${lon}&categoryId=${category}&radius=40000`)
        .then(function (response) {
            // Code for handling API response
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            // object is called "json"
            // response is an object inside the return json object
            var restaurantArray = json.response.venues;
            console.log(restaurantArray);
            console.log(restaurantArray.length);

            for (let i = 0; i < restaurantArray.length; i++) {
                var box = document.getElementById("results-box");
                // icon code
                var rank = document.createElement("div");
                rank.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet icon-box");
                rank.textContent = i + 1;
                box.appendChild(rank);
                // restaurant name & address
                var results = document.createElement("div");
                results.setAttribute("class", "mdc-layout-grid__cell--span-8-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-4-tablet");
                var restName = document.createElement("h2");
                restName.setAttribute("class", "restaurant-name");
                restName.textContent = restaurantArray[i].name;
                var address = document.createElement("p");
                address.textContent = restaurantArray[i].location.formattedAddress;
                results.appendChild(restName);
                results.appendChild(address);
                box.appendChild(results);
                // delivery button code
                if ("delivery" in restaurantArray[i]) {
                    var deliveryURL = restaurantArray[i].delivery.url;
                    var delivery = document.createElement("button");
                    var deliveryURL = restaurantArray[i].delivery.url;
                    delivery.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-button mdc-button--raised mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet");
                    delivery.setAttribute("style", "background: #c0392b");
                    delivery.textContent = "order delivery";
                    delivery.setAttribute("onclick", `window.location.href = '${deliveryURL}';`);
                    box.appendChild(delivery);
                }
                else {
                    var delivery =  document.createElement("div");
                    delivery.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet");
                    box.appendChild(delivery);
                }
            }
        })
        .catch(function () {
            // Code for handling errors

        });
}


