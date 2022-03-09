let accountsDb = new PouchDB("accounts");
let venuesDb = new PouchDB("venues");
let gamesDb = new PouchDB("games");
//let remoteAccounts = new PouchDB("http://localhost:8000/remoteAccounts");
//let remoteVenues = new PouchDB("http://localhost:8000/remoteVenues");
var map;
var lat;
var lng;
let venLat;
let venLng;
let id;



function showFootball(){

getGames().then( value => {

id = value.rows.length + 1;

})

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://flashscore.p.rapidapi.com/v1/events/list?indent_days=0&timezone=-4&locale=en_GB&sport_id=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "flashscore.p.rapidapi.com",
		"x-rapidapi-key": "3e74b52bfbmshfa3bed0081d07cdp101d2djsn5b7bbb4fdc8a"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);


for (i = 0;i < response.DATA.length;i++){

if ( response.DATA[i].NAME === "England: Premier League" || response.DATA[i].NAME === "England: Championship"
|| response.DATA[i].NAME === "Europe: Europa League - Play Offs" || response.DATA[i].NAME === "Europe: Champions League - Play Offs"
// || Prem etc.

){


console.log(response.DATA[i]);

for(l = 0;l < response.DATA[i].EVENTS.length;l++){

console.log(response.DATA[i].EVENTS[l]);


let games = {

_id: id.toString(),
sport:"Football",
time:response.DATA[i].EVENTS[l].START_TIME,
home:response.DATA[i].EVENTS[l].HOME_NAME,
away:response.DATA[i].EVENTS[l].AWAY_NAME,
league:response.DATA[i].NAME,
channel:response.DATA[i].EVENTS[l].TV_LIVE_STREAMING
}
id +1;

getGames().then(value => {

let s = 0;

if (value.rows.length === 0){
gamesDb.put(games);
}

for (i=0;i < value.rows.length;i++){

if (games.time === value.rows[i].doc.time && games.home === value.rows[i].doc.home && games.away === value.rows[i].doc.away){
console.log(games.home + " VS " + games.away + " already exists in the database");
s = 1;
}

}

if (s = 0){

gamesDb.put(games);
}

})

id++;

}
}




}
getGames().then(value => {
console.log(value);
//here you can add the games to the html!

})

});
}


async function getGames(){

let promise = new Promise((resolve,reject) => {

gamesDb.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
resolve(result);

}).catch(function (err){
reject (err);})

})

let result = await promise;
return result;
};



function getLocation(){

if (navigator.geolocation){
navigator.geolocation.getCurrentPosition(showPosition);
} else {
console.log("Geolocation is not supported by this browser.");
}

}

function showPosition(position){

lat = position.coords.latitude,
lng = position.coords.longitude
initMap();

}








function initMap(){



map = new google.maps.Map(document.getElementById("map"), {
zoom: 10,
center: new google.maps.LatLng(lat, lng),
mapTypeControl: false,
streetViewControl: false,



});

google.maps.event.addListener(map, 'click', function(event) {
  placeMarker(event.latLng);

});


}

var marker;

function placeMarker(loc) {
  if ( marker ) {
    marker.setPosition(loc);
  } else {
    marker = new google.maps.Marker({
      position: loc,
      map: map
    });

  }


      venLat = loc.lat();
      venLng = loc.lng();
}




async function getVenues(){
let promise = new Promise((resolve,reject) => {

venuesDb.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
resolve(result);

}).catch(function (err){
reject (err);})

})

let result = await promise;
return result;
};

async function createVenueBtn(){

let uniqueVenue = 0;


let n = $("#venueName").val();
let p = $("#venuePostcode").val();
let im = $("#venuePicture").val();

if ($("#createImage").length < 1) {
let img = new Image();
img.id = "createImage";
img.src = im;
document.getElementById("venPic").appendChild(img);
}
else {

img.src = im;
document.getElementById("venPic").appendChild(img);

}

document.getElementById("venPic").style.display = "block";



let location = {
lat: venLat,
lng: venLng,
}
let rating = "UNDER_CONSTRUCTION_NUM_OF_STARS"

getVenues().then(value => {


for (i=0;i < value.rows.length; i++){





if (n === value.rows[i].doc.name && p === value.rows[i].doc.postcode){
$("#venueCreateRes").text("Venue already exists!");
uniqueVenue = 1;
}
}

if (uniqueVenue === 0 ){

//if not null
if (n != "" && p != "" && im != "" && venLat != "" && venLng != "" ){


let id = value.rows.length +1
//we all good
let venue = {

_id:id.toString(),
name:n,
postcode:p,
image:im,
rating:rating,
latLng:location

}

venuesDb.put(venue);

$("#venueCreateRes").text("Venue created successfully!");

}
else {

$("#venueCreateRes").text("please enter information into every field");
}
}



});



}





async function getDocs(){
let promise = new Promise((resolve,reject) => {

accountsDb.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
resolve(result);

}).catch(function (err){
reject (err);})

})

let result = await promise;
return result;
};

async function login(){

getDocs().then(value => {

let c = 0;

for (i=0;i < value.rows.length; i++){



if ($("#loginEmail").val() === value.rows[i].doc.email && $("#loginPass").val() === value.rows[i].doc.pass){

let ac = value.rows[i].doc;


$("#logRes").text("Logging in now!");
setTimeout(loginAccount, 3000, ac);
c = 1;


}
if (c === 0){
$("#logRes").text("Incorrect Username or Password!");
}}


});

};

function createUser(){

document.getElementById("userLogin").style.display = "none";
document.getElementById("userCreate").style.display = "block";

}

async function register(){

let uniqueEmail = 0;

let u = $("#username").val();
let e = $("#email").val();
let d = $("#dob").val();
let p = $("#pass").val();



 getDocs().then(result => {

        for (i = 0; i < result.rows.length; i++){
        if (e === result.rows[i].doc.email){

    $("#createRes").text("Email already in use - please use another email or log in!");
    uniqueEmail = 1;

        }
        }

if (uniqueEmail === 0){

if (u !== "" && e !== "" && d !== "" && p !== ""){

let id = result.rows.length +1;
let acc = {

_id:id.toString(),
username:u,
email:e,
dob:d,
pass:p

}





accountsDb.put(acc);
$("#createRes").text("Creation Successful - Logging in now!");
setTimeout(loginAccount,  3000, acc);
}
else $("#createRes").text("Please enter a value into all fields!")
}

        });
}


$(document).ready(function(){




$("#venueBtn").click(function(){

document.getElementById("userCreate").style.display = "none";
   document.getElementById("venueAccount").style.display = "block";

})

$("#userBtn").click(function(){
   document.getElementById("venueAccount").style.display = "none";
document.getElementById("userCreate").style.display = "block";



})

});

function createVenue(){


document.getElementById("createVenue").style.display = "block";

}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

getLocation();



if ($("body").is(".onVenues")){
renderVenues();
}





};

async function renderVenues(){

getVenues().then(value => {

for (i = 0; i < value.rows.length;i++){

let $div = $("<div>" , {id: "div" + value.rows[i].id, class:"ven"});
let $p = $("<p></p>", {id: "p" + value.rows[i].id}).text(value.rows[i].doc.name + " , " + value.rows[i].doc.postcode);
let $i = $("<img></img>", {id:"i" + value.rows[i].id, src:value.rows[i].doc.image, class:"venImg"});



$div.append($p);
$div.append($i);

$("#venues").append($div);

}



});


}



$("#createBtn").click(function(){

document.getElementById("userLogin").style.display = "none";
document.getElementById("userCreate").style.display = "block";



})





function getDate(){
	let d = new Date();
	let m = d.getMonth() + 1;

	if (m < 10){
		m = "0" + m;
	}
	return d.getFullYear() + "-" + (m) + "-" + (d.getDate());

}

function loginAccount(user) {

uLogin = document.getElementById("userLogin");
uCreate = document.getElementById("userCreate");

if (uLogin.style.display !== "none"){
uLogin.style.display = "none";
}

if(uCreate.style.display !== "none"){
uCreate.style.display ="none";}


document.getElementById("loggedIn").style.display = "block";

$("#loggedInRes").text("Welcome Back, " + user.username);

}

$("#footballBtn").click(function(){

//hide sports
// add back button in the top corner
//display football nav or something - showing games
// do this for every sport

})

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://flashscore.p.rapidapi.com/v1/events/list?indent_days=0&timezone=-4&locale=en_GB&sport_id=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "flashscore.p.rapidapi.com",
		"x-rapidapi-key": "3e74b52bfbmshfa3bed0081d07cdp101d2djsn5b7bbb4fdc8a"
	}
};

$.ajax(settings).done(function (response) {
console.log(response);
	console.log(response.DATA[0].EVENTS[0].HOME_NAME);
		$("#exGame0").text("TIME "  + "HOME TEAM " +  "AWAY TEAM");
	$("#exGameOne").text(response.DATA[0].EVENTS[0].START_TIME + "  " + response.DATA[0].EVENTS[0].HOME_NAME + " VS " + response.DATA[0].EVENTS[0].AWAY_NAME);
	$("#exGameTwo").text(response.DATA[1].EVENTS[0].START_TIME + "  " + response.DATA[1].EVENTS[0].HOME_NAME + " VS " + response.DATA[1].EVENTS[0].AWAY_NAME);
	$("#exGameThree").text(response.DATA[2].EVENTS[0].START_TIME + "  " + response.DATA[2].EVENTS[0].HOME_NAME + " VS " + response.DATA[2].EVENTS[0].AWAY_NAME);
	$("#exGameFour").text(response.DATA[3].EVENTS[0].START_TIME + "  " + response.DATA[3].EVENTS[0].HOME_NAME + " VS " + response.DATA[3].EVENTS[0].AWAY_NAME);




});



