import React, { Component } from "react";

import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis } from "victory";
import ReportTableBody from "./reporttablebody.js";

const wordys = require("../results/result.json");
let name = wordys.nameOfFile;
let wordcount = wordys.wordCount;
let threatLevel = wordys.threatLevel;
let numberOfThreatWordsFound = wordys.numberOfThreatWordsFound;
console.log(wordys);





class Report extends Component {

	constructor() {
		super();

		this.state = {
			filteredWords: wordys.exactMatches
		}

		this.filterGroup = () => {
			this.setState({
				filteredWords: wordys.exactMatches.filter((word) =>
					word.Word.toLowerCase().includes(document.getElementById("wordSearch").value.toLowerCase()))
			});
		}
	}

	render() {
		return (
			<div id="report">
				<input className="form-control mr-sm-2" id="wordSearch" type="search" placeholder="Search" onChange={this.filterGroup}></input>
				<h1> {name} </h1>
				<h2> Threat Level: {threatLevel} </h2>
				<h3> Threat Word Count: {numberOfThreatWordsFound}</h3>
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
							style={{ data: { fill: "#fd6b52" } }}
							data={this.state.filteredWords}
							x="Word"
							y="Frequency" />
					</VictoryStack>
					<VictoryAxis
						style={{
							axis: { stroke: "#fd6b52" },
							ticks: { stroke: "#fd6b52", size: 5 },
							tickLabels: { fontSize: 15, padding: 5, fill: "#fd6b52" }
						}} />
					<VictoryAxis dependentAxis
						style={{
							axis: { stroke: "#fd6b52" },
							ticks: { stroke: "#fd6b52", size: 5 },
							tickLabels: { fontSize: 10, padding: 2, fill: "#fd6b52" }
						}}

					/>
				</VictoryChart>
			</div>
		);
	}
}

export default Report;
