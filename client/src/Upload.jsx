import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="Upload">
          <form action="/" enctype="multipart/form-data" method="post">
            <input id="fileform" type="file" name="upload" accept=".pdf" multiple/>
            <input type="submit" value="Upload"/>
          </form>
      </div>
    );
  }
}

export default App;