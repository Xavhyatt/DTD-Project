import React, { Component } from "react";

import { VictoryBar, VictoryChart, VictoryStack } from "victory";
import ReportTableBody from "./reporttablebody.js";

const results = require("../results/result.json");
let name = results.nameOfFile;
let wordcount = results.wordCount;
console.log(results);





class Report extends Component {

	constructor() {
		super();

		this.state = {
			filteredWords: results.exactMatches
		}

		this.filterGroup = () => {
			this.setState({
				filteredWords: results.exactMatches.filter((word) =>
					word.Word.toLowerCase().includes(document.getElementById("wordSearch").value.toLowerCase()))
			});
		}
	}




	render() {
		return (
			<div id="report">
				<input className="form-control mr-sm-2" id="wordSearch" type="search" placeholder="Search" onChange={this.filterGroup}></input>
				<h1> {name} </h1>
				<h2> This file is THREAT LEVEL </h2>
				<h3> Total Word Count: {wordcount}</h3>

				<div>
					<table className="table">
						<thead>
							<tr>
								<th>WORD</th>
								<th>Frequency</th>
							</tr>
						</thead>
						<ReportTableBody data={this.state.filteredWords} />
					</table>
				</div>



				<VictoryChart
					padding={{ top: 30, bottom: 70, left: 90, right: 20 }}>
					<VictoryStack
						horizontal={true}>
						<VictoryBar
							data={this.state.filteredWords}
							x="Word"
							y="Frequency" />
					</VictoryStack>
				</VictoryChart>
			</div>
		);
	}
}

export default Report;
