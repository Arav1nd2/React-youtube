import React, { Component } from 'react';
import Trending from './components/trending/Trending';
import Playlist from './components/playlist/Playlist';
import './App.css';
import { Col,Row } from 'reactstrap';
import Nav from './components/nav/Nav';
import Sidebar from './components/sidebar/Sidebar';



//const API = "AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc";

class App extends Component {

  render() {
    return (
      <div className = "bg">
      <div className = "box">
        <Nav />
        <Row className = "main">
        <Col md = {2} className = "sidebar">
          <Sidebar />
        </Col>
        <Col md = {9} className = "centerPart">
          <div>
              <Trending />
              <Playlist />
          </div>  
        </Col>
        <Col md = {1} className = "sidebar">
        
        </Col>
        </Row>
              
        </div>
      </div>
    );
  }
}

export default App;
