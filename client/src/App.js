import React, { Component } from 'react';
import './yellowstone.css';
import Header from './header.js';
import Keywords from "./Keywords.js";
import Report from "./Report.js";
import Upload from "./Upload.jsx";
 
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
