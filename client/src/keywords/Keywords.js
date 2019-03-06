import React, { Component } from 'react';
import './Keys.css';

let toTest = [];
let requestURL = "http://51.137.151.100:3000";

//let requestURL = "http://51.137.135.156:9123";

function loadJSON(){
	let request = new XMLHttpRequest();
	
	request.open('GET', requestURL+'/keywords/getall', true);
	
	request.responseType = 'json';
	
	request.send();

	request.onload = function(){
		toTest = request.response;
		KeysTable();
	}
}

function deleteAll(){
	for(let i = 0; i < toTest.length; i++){
		let requestD = new XMLHttpRequest();
		
		requestD.open('DELETE', requestURL+'/keywords/delete/'+toTest[i].keyword, true);
		
		requestD.responseType = 'json';
		
		requestD.send();
		loadJSON();
	}
	loadJSON();
}

function KeysTable() {
	let KTable = document.getElementById('keysTable');
	let ViewingOption = document.getElementById('viewingDropdown');
		KTable.innerHTML = "";
		KTable.innerHTML += "<tr><th class='keyEntry'>Keyword:</th> <th class='keyEntry'>Group:</th> <th class='keyEntry'>Score:</th></tr>";
	for(let i = 0; i < toTest.length; i++){
		if(ViewingOption.value === "All"){
			KTable.innerHTML += "<tr>";
			KTable.innerHTML += "<td class='keyEntry'> " + toTest[i].keyword + " </td> <td class='keyEntry'> " + toTest[i].group + " </td> <td class='keyEntry'> " + toTest[i].score + " </td>"
			KTable.innerHTML += "</tr>";
		} else if(toTest[i].group === ViewingOption.value){
			KTable.innerHTML += "<tr>";
			KTable.innerHTML += "<td class='keyEntry'> " + toTest[i].keyword + " </td> <td class='keyEntry'> " + toTest[i].group + " </td> <td class='keyEntry'> " + toTest[i].score + " </td>"
			KTable.innerHTML += "</tr>";
		}
	}
}

class Keyword extends Component {	
	delKey() {
		let requestD = new XMLHttpRequest();
		
		let KeyToDelete = document.getElementById("keyInput").value;
		
		requestD.open('DELETE', requestURL+'/keywords/delete/'+KeyToDelete, true);
		
		requestD.setRequestHeader('Content-Type', 'application/json');     
		
		requestD.responseType = 'json';
		
		requestD.send();
		
		requestD.onload = function(){
			loadJSON();
		}
	}
	
	addKey(){
		let requestP = new XMLHttpRequest();
		
		requestP.open('POST',requestURL+'/keywords/create', true);
		
		requestP.setRequestHeader('Content-Type', 'application/json');    
		
		let KeyToAdd = document.getElementById("keyInput").value;
		let KeyGroup = document.getElementById("groupsDropdown").value;
		let KeyScore = document.getElementById("keyScore").value;
		
		let jsonString = JSON.stringify(
		{
			'keyword':KeyToAdd,
			'group':KeyGroup,
			'score':KeyScore
		})
		
		requestP.send(jsonString);
		
		requestP.onload = function(){
			loadJSON();
		}
	}
	
	render() {
	loadJSON();
    return (
		<div className="mainBody">
			<h1 className="header"> Blacklist: </h1>
			<div><select className="entryButtons" id="viewingDropdown"><option value="All">All</option></select><button className="entryButtons" type="submit" onClick={() => KeysTable()}> Load </button></div>
			<table id="keysTable" className="keysTable">
			</table>
			
			<div className="entryButtons">
				Keyword: <input className="entryButtons" id="keyInput"></input>
				
				<button className="entryButtons" type="submit" onClick={() => this.addKey()}> Add Keyword </button>
				<button className="entryButtons" type="submit" onClick={() => this.delKey()}> Remove Keyword </button>
				<button className="entryButtons" type="submit" onClick={() => deleteAll()}> Delete All </button>
				
				<div>Group: <select className="entryButtons" id="groupsDropdown"><option value="All">All</option></select></div>
				<div>Score: <input className="entryButtons" id="keyScore"></input></div>
			</div>
			<div id="errormessage" className="errorMessage"></div>
		</div>
    );
  }
}
 
export default Keyword;
