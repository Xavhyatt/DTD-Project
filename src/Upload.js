import React, { Component } from "react";


class Upload extends Component {


	render(){
		return(
			<div id="uploadfiles">
				<h3>Upload a PDF File here:
				</h3>
			<button>Select File</button>
			<input type="text"/>
			<button id="getwords">Upload</button>
			
			</div>

			);
		
	}
}

export default Upload;
