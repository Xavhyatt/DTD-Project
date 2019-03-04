import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="Upload">
          <form action="51.137.151.100:9123/" encType="multipart/form-data" method="post">
            <input id="fileform" required="required" type="file" name="upload" accept=".pdf" multiple/>
            <input type="submit" value="Upload"/>
          </form>
      </div>
    );
  }
}

export default App;
