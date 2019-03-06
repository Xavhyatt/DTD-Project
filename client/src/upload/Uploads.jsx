import React, { Component } from "react";
import { Button } from "reactstrap";
import "./upload.css";

class App extends Component {
  render() {
    return (
      <div className="Upload">
        <form action="/" encType="multipart/form-data" method="post">
          <input
            id="fileform"
            required="required"
            type="file"
            name="upload"
            accept=".pdf"
            multiple
          />
          <Button type="submit" value="Upload">
            Upload
          </Button>
        </form>
      </div>
    );
  }
}

export default App;
