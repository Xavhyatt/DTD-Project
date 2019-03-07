import React, { Component } from 'react';
import './Keys.css';
import {ButtonGroup, Button, Input} from "reactstrap";

let groups = [];
let keywords = [];
//let requestURL = "http://51.137.151.100:9123";

let requestURL = "http://51.137.135.156:9123";

function loadGroups(){
	let request = new XMLHttpRequest();
	
	request.open('GET', requestURL+'/groups/getall', true);
	
	request.setRequestHeader('Content-Type', 'application/json');     
	request.setRequestHeader('Access-Control-Allow-Origin', '*');
	
	request.responseType = 'json';
	
	request.send();

	request.onload = function(){
		groups = request.response;
		groupsTable();
	}
}

function groupsTable(){
	let GTable = document.getElementById('groupsDropdown');
	let ViewingTable = document.getElementById('viewingDropdown');
		GTable.innerHTML = "";
		ViewingTable.innerHTML = "<option value='All'>All</option>"
	for(let j = 0; j < groups.length; j++){
		GTable.innerHTML += "<option value='" + groups[j].group + "'>" + groups[j].group + "</option>";
		ViewingTable.innerHTML += "<option value='" + groups[j].group + "'>" + groups[j].group + "</option>";
	}
}

class Groups extends Component {	
	delGroup() {
		let requestD = new XMLHttpRequest();
		let GroupDelete = document.getElementById("group").value;
		if(GroupDelete !== "Default"){
			requestD.open('DELETE', requestURL+'/groups/delete/'+GroupDelete, true);
			requestD.responseType = 'json';
			requestD.send();
		}
		requestD.onload = function(){
			loadGroups();
		}
		
		let request = new XMLHttpRequest();
	
		request.open('GET', requestURL+'/keywords/getall', true);
	
		request.responseType = 'json';
	
		request.send();

		request.onload = function(){
			keywords = request.response;
			
			let requestDK = new XMLHttpRequest();
			requestDK.open('DELETE', requestURL+'/keywords/deleteByGroup/'+GroupDelete, true);
			requestDK.send();
			window.location.reload();
		}
	}
	
	addGroup(){
		let requestP = new XMLHttpRequest();
		
		requestP.open('POST',requestURL+'/groups/create', true);
		
		requestP.setRequestHeader('Content-Type', 'application/json');     
		requestP.setRequestHeader('Access-Control-Allow-Origin', '*');
		
		let GroupEntry = document.getElementById("group").value;
		
		let jsonString = JSON.stringify(
		{
			'group':GroupEntry
		})
		
		requestP.send(jsonString);
		
		requestP.onload = function(){
			loadGroups();
		}
	}
	
	render() {
	loadGroups();
    return (
		<div className="mainBody">			
			<table id="groupsTable" className="keysTable">
			</table>
			
			<div className="entryButtons">
				<div>Group: <Input className="entryButtons" id="group"></Input></div>
				<ButtonGroup>
				<Button className="entryButtons" type="submit" onClick={() => this.addGroup()}> Add Group </Button>
				<Button className="entryButtons" type="submit" onClick={() => this.delGroup()}> Remove Group </Button>
				</ButtonGroup>
			</div>
			<div id="errormessage" className="errorMessage"></div>
		</div>
    );
  }
}
  
export default Groups;
