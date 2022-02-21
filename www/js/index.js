let accountsDb = new PouchDB("accounts");




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
console.log(value);
let c = 0;

for (i=0;i < value.rows.length; i++){


console.log($("#loginEmail").val() + $("#loginPass").val());
if ($("#loginEmail").val() === value.rows[i].doc.email && $("#loginPass").val() === value.rows[i].doc.pass){
console.log(("test"));
let ac = value.rows[i].doc;

console.log("MATCH AT ENTRY: " + i);
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

    console.log("EMAIL ALREADY IN USE!");

    $("#createRes").text("Email already in use - please use another email or log in!");
    uniqueEmail = 1;
    console.log(uniqueEmail);
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

console.log(acc);



accountsDb.put(acc);
$("#createRes").text("Creation Successful - Logging in now!");
setTimeout(loginAccount,  3000, acc);
}
else $("#createRes").text("Please enter a value into all fields!")
}

        });


}


$(document).ready(function(){


/*
$("#createAccountBtn").click(function(){
let uniqueEmail = 0;

let u = $("#username").val();
let e = $("#email").val();
let d = $("#dob").val();
let p = $("#pass").val();



  accountsDb.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
        console.log(result);
        console.log(result.rows.length);

        for (i = 0; i < result.rows.length; i++){
        if (e === result.rows[i].doc.email){

    console.log("EMAIL ALREADY IN USE!");

    $("#createRes").text("Email already in use - please use another email or log in!");
    uniqueEmail = 1;
    console.log(uniqueEmail);
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

console.log(acc);



accountsDb.put(acc);
setTimeout(loginAccount,  3000, acc);
}
else $("#createRes").text("Please enter a value into all fields!")
}

        });



$("#createRes").text("ACCOUNT CREATED SUCCESSFULLY - WELCOME, " + u);





})



$("#losRes").text("result");
*/



$("#loginBtn").on('click touch', function(){
//check login!!!

$("#createRes").text("Mobile is trying");
login();

})





$("#venueBtn").click(function(){

document.getElementById("userCreate").style.display = "none";
   document.getElementById("venueAccount").style.display = "block";
   console.log("hi");

})

$("#userBtn").click(function(){
   document.getElementById("venueAccount").style.display = "none";
document.getElementById("userCreate").style.display = "block";



})

});

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!




let sports = [];


};



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
	console.log(m);
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
function toggle(id){

console.log(id);

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
	"url": "https://sportscore1.p.rapidapi.com/sports",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "sportscore1.p.rapidapi.com",
		"x-rapidapi-key": "3e74b52bfbmshfa3bed0081d07cdp101d2djsn5b7bbb4fdc8a"
	}
};

$.ajax(settings).done(function (response) {


	for (let i = 0; i < response.data.length; i++){
	sports.push(response.data[i].name);
	}


console.log(sports.length);

for (let u = 0; u < sports.length; u++){






let btn = document.createElement("button");
btn.innerHTML = sports[u];
btn.id = sports[u];

$("#sportP").append(sports[u] + "<br>");
}
	


});

const getByDate = {
	"async": true,
	"crossDomain": true,
	"url": "https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=soccer&Date=" + getDate(),
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "livescore6.p.rapidapi.com",
		"x-rapidapi-key": "3e74b52bfbmshfa3bed0081d07cdp101d2djsn5b7bbb4fdc8a"
	}
};

$.ajax(getByDate).done(function (response) {

	let upcomingGames = [];
	console.log(response);
	for (let i = 0; i < response.Stages.length; i++){
		//if (response.data[i].status === "notstarted"){

		//	let game = {sport:response.data[i].sport.name,
			//	home:response.data[i].home_team.name,
			//	away:response.data[i].away_team.name,
			//	date:response.data[i].start_at}

			//	upcomingGames.push(game);
		//}
	}

	console.log(upcomingGames);
});

function getNextEvents(){

	let d = new Date();
	let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	let time = d.getHours() - 7 + ":" + d.getMinutes() + ":" + d.getSeconds();
	return date + " " + time;



}




