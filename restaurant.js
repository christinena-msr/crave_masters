
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
                rank.setAttribute("class", "restaurant-icon mdc-layout-grid__cell--span-1-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-1-tablet");
                rank.textContent = i + 1;
                box.appendChild(rank);
                // restaurant name & address
                var resultsEl = document.createElement("div");
                resultsEl.setAttribute("class", "restaurant-result address-link mdc-layout-grid__cell--span-9-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-5-tablet");
                var restNameEl = document.createElement("h2");
                restNameEl.setAttribute("class", "restaurant-name");
                restNameEl.textContent = restaurantArray[i].name.split(',')[0];
                resultsEl.appendChild(restNameEl);                
                //restaurant address linkable to google maps
                var addressEl = document.createElement("a");
                addressEl.setAttribute("class", "address");
                addressEl.textContent = restaurantArray[i].location.formattedAddress;
                var nameForURL = restaurantArray[i].name.replace(/ /gi, '+');
                var address = restaurantArray[i].location.address.replace(/ /gi, '+');              
                var addressURL = `https://www.google.com/maps/search/${nameForURL},+${address}`;
                addressEl.setAttribute("href", addressURL);
                //nav icon
                var navIcon = document.createElement("button");
                navIcon.setAttribute("class", "material-icons mdc-top-app-bar__action-item mdc-icon-button tooltip");
                navIcon.setAttribute("onclick", `window.location.href=${addressURL}`);
                navIcon.style.padding = "0px 0px";
                navIcon.style.height = "25px";
                navIcon.innerHTML = "directions";
                addressEl.target = "_blank";
                addressEl.prepend(navIcon);
                resultsEl.appendChild(addressEl);
                box.appendChild(resultsEl);
 


                // delivery button code
                if ("delivery" in restaurantArray[i]) {
                    var deliveryURL = restaurantArray[i].delivery.url;
                    var delivery = document.createElement("button");
                    var deliveryURL = restaurantArray[i].delivery.url;
                    delivery.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-button mdc-button--raised mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet");
                    delivery.style.background = "#e74c3c";
                    delivery.textContent = "order delivery";
                    delivery.setAttribute("onclick", `window.location.href = '${deliveryURL}';`);
                    box.appendChild(delivery);
                }
                else {
                    var delivery = document.createElement("button");
                    delivery.setAttribute("class", "disabled-btn mdc-layout-grid__cell--span-2-desktop mdc-button mdc-button--unelevated mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet");
                    delivery.style.background = "#95a5a6";
                    delivery.style.cursor = "default";
                    delivery.textContent = "no online delivery";
                    box.appendChild(delivery);
                }
            }
        })
        .catch(function () {
            // Code for handling errors

        });
}


