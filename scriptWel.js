var myHeaders = new Headers();
const apikey = "b-pGPNxMyoDcwwOM5GnbddhGPt5ke00ZQMkhRBJgLb5NCKllnb6ZV-hSeLEwECBvAg7REo7eUJoLfo61lqA_oQ6_qxSXI7ERhzM9wukQ5KDSO_6we4tjfq7dyFMjXnYx"
myHeaders.append("Authorization", `Bearer ${apikey}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  mode: 'no-cors',
  redirect: 'follow'
};

const userLocation = "seattle";

fetch(`https://api.yelp.com/v3/businesses/search?location=${location}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));