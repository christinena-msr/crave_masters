<<<<<<< HEAD
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer b-pGPNxMyoDcwwOM5GnbddhGPt5ke00ZQMkhRBJgLb5NCKllnb6ZV-hSeLEwECBvAg7REo7eUJoLfo61lqA_oQ6_qxSXI7ERhzM9wukQ5KDSO_6we4tjfq7dyFMjXnYx");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   mode: 'no-cors',
//   redirect: 'follow'
// };

// fetch("https://api.yelp.com/v3/businesses/search?location=seattle", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

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
        console.log(response.json());
        return response.json();
        
    })
    .then(function(json) {
        // var results = document.createElement("div");
        // results.textContent = response.venues[0].name;
        // var box = document.getElementsByClassName("button-box");
        // console.log
        // box.appendChild(results);
    })
    .catch(function() {
        // Code for handling errors
    });
=======
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer b-pGPNxMyoDcwwOM5GnbddhGPt5ke00ZQMkhRBJgLb5NCKllnb6ZV-hSeLEwECBvAg7REo7eUJoLfo61lqA_oQ6_qxSXI7ERhzM9wukQ5KDSO_6we4tjfq7dyFMjXnYx");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  mode: 'no-cors',
  redirect: 'follow'
};

fetch("https://api.yelp.com/v3/businesses/search?location=seattle", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
>>>>>>> 8edeb551d007e26e83dcb1e97781902faffc9a13
