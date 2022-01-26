/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

function getDate(){
	let d = new Date();
	let m = d.getMonth() + 1;

	if (m < 10){
		m = "0" + m;
	}
	console.log(m);
	return d.getFullYear() + "-" + (m) + "-" + (d.getDate());

}

document.addEventListener('deviceready', onDeviceReady, false);

let sports = [];
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
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
		if (response.data[i].status === "notstarted"){

			let game = {sport:response.data[i].sport.name,
				home:response.data[i].home_team.name,
				away:response.data[i].away_team.name,
				date:response.data[i].start_at}

				upcomingGames.push(game);
		}
	}

	console.log(upcomingGames);
});

function getNextEvents(){

	let d = new Date();
	let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	let time = d.getHours() - 7 + ":" + d.getMinutes() + ":" + d.getSeconds();
	return date + " " + time;



}


