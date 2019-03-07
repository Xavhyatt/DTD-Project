import React, { Component } from "react";

import {VictoryBar, VictoryChart, VictoryStack} from "victory";
import ReportTableBody from "./reporttablebody.js";

const wordys = require("../results/result.json");
 let name = wordys.nameOfFile;
 let wordcount = wordys.wordCount;
 let threatLevel = wordys.threatLevel;
 let numberOfThreatWordsFound = wordys.numberOfThreatWordsFound;
 console.log(wordys);





class Report extends Component {

	render(){
		return(
			<div id="report">
				<h1> {name} </h1>
				<h2> Threat Level: {threatLevel} </h2>
				<h3> Threat Word Count: {numberOfThreatWordsFound}</h3>
				<h3> Total Word Count: {wordcount}</h3>

		
				 <div>
			 		<table className ="table">
			 			<thead>
							<tr>
			 					<th>WORD</th>
			 					<th>Frequency</th>
			 				</tr>
			 			</thead>
			 			<ReportTableBody data ={wordys.exactMatches}/>
			 		</table>
				 </div>


	
			 	<VictoryChart
			 	  padding={{ top: 30, bottom: 70, left: 90, right: 20 }}>
					<VictoryStack
			 		horizontal ={true}>
			 		<VictoryBar
			 			data={wordys.exactMatches}
			 			x="Word"
			 			y="Frequency"/> 
			 		</VictoryStack>
			 	</VictoryChart> 
			</div>
			);
	}
}

export default Report;
