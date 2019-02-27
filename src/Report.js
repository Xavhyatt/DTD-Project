import React, { Component } from "react";

import {VictoryBar, VictoryChart, VictoryStack} from "victory";
import ReportTableBody from "./reporttablebody.js";

const wordys = require("./scanreportmockdata.json");
 let name = wordys.Name;
 let wordcount = wordys.WordCount;
 let date = wordys.ScanDateTime;





class Report extends Component {

	render(){
		return(
			<div id="report">

			<h1> {name} </h1>
			<h2> This file is THREAT LEVEL </h2>
			<h3> Total Word Count: {wordcount}</h3>
			<h3> Date Scanned: {date} </h3>
			<div>
				<table class ="table">
					<thead>
					<tr>
						<th>WORD</th>
						<th>Frequency</th>
					</tr>
					</thead>
					<ReportTableBody data ={wordys.KeywordFrequency}/>
				</table>
			</div>


	
				<VictoryChart
				  padding={{ top: 30, bottom: 70, left: 90, right: 20 }}>
				<VictoryStack
				horizontal ={true}>
				<VictoryBar
					data={wordys.KeywordFrequency}
					x="Word"
					y="Frequency"/> 
				</VictoryStack>
				</VictoryChart>
			</div>


			);
		
	}
}

export default Report;
