import React, { Component } from "react";


class ReportTableBody extends Component{
	render(){
		let output = this.props.data.map((results) => {
			return(
				<tr>
					<td>{results.Word}</td>
					<td>{results.Frequency}</td>
				</tr>
					);
			});
		
		return(
				<tbody>
					{output}
				</tbody>
		);
	}
}

export default ReportTableBody;