import React, { Component } from "react";


class ReportTableBody extends Component{
	render(){
		let output = this.props.data.map((wordys) => {
			return(
				<tr key = {wordys.Word}>
					<td>{wordys.Word}</td>
					<td>{wordys.Frequency}</td>
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