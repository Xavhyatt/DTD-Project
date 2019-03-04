import React, { Component } from 'react';
import './yellowstone.css';
import Header from './header/Header.js';
import Keywords from "./keywords/Keywords.js";
import Report from "./report/Report.js";
import Upload from "./upload/Upload.jsx";
 
class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Keywords/>
        <Report/>
        <Upload/>
      </div>
     )
  }
}

export default App;
