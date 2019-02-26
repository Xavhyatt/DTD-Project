import React, { Component } from "react";


class Keywords extends Component {


	render(){
		return(
			<div id="editwords">
				<h3>Enter Keywords Here:
				(Seperate words using a comma)
				</h3>
			<textarea name="Text1" cols="40" rows="5"></textarea>
			<button id="getwords">Update List</button>
			
			</div>

			);
		
	}
}

export default Keywords;
