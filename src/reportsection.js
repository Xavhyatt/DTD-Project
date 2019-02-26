import React, { Component } from "react";

import {VictoryBar} from "victory";

const data = [
		{word:"dalmation", frequency: 34},
		{word:"poodle", frequency: 22},
		{word:"Spaniel", frequency: 4},
	]


class Report extends Component {





	render(){
		return(
			<div id="report">

			<h1> FILE NAME </h1>
			<h2> This file is THREAT LEVEL </h2>
			<h3> List and Frequency of words: </h3>
			<table id="reporttable">
			<tr>
					<th>Threat Words </th>
					<th>Frequency </th>
			</tr>
				<tr>
					<td>Dalmation</td>
					<td>34</td>
			</tr>
			<tr>
					<td>Poodle</td>
					<td>22</td>
			</tr>
			<tr>
					<td>Spaniel</td>
					<td>4</td>
			</tr>
			</table>

				<VictoryBar
					data={data}
					x="word"
					y="frequency"/>
			</div>


			);
		
	}
}

export default Report;
