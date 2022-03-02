let accountsDb = new PouchDB("accounts");
let venuesDb = new PouchDB("venues");
//let remoteAccounts = new PouchDB("http://localhost:8000/remoteAccounts");
//let remoteVenues = new PouchDB("http://localhost:8000/remoteVenues");
var map;
var lat;
var lng;
let venLat;
let venLng;




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
center: new google.maps.LatLng(lat, lng)

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


let img = new Image();
img.id = "createImage";
img.src = im;
document.getElementById("venPic").appendChild(img);
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



