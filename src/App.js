import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import './yellowstone.css';
import Row from 'react-bootstrap/Row';
import Header from './header.js';
import Keywords from "./Keywords.js";
import Report from "./reportsection.js";
import Upload from "./uploadfiles.js";
 
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
