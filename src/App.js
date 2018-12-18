import React, { Component } from 'react';
import Trending from './components/trending/Trending';
import Playlist from './components/playlist/Playlist';
import './App.css';
import { Col,Row } from 'reactstrap';
import Nav from './components/nav/Nav';
import Sidebar from './components/sidebar/Sidebar';
import {BrowserRouter,Route} from 'react-router-dom';
import Player from './components/player/Player';
import About from './components/about/About';
import Results from './components/results/results';

//const API = "AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search : ""
    }
    this.handleChange = (e) => {
      this.setState({
        search : e.target.value
      });
    }
  }
  
  render() {
    let data =  {
      search : this.state.search,
      handleChange : this.handleChange
    };
    return (
      <BrowserRouter>  
      <div className = "bg">
      <div className = "box">
        <Nav data = {data}/>
        <Row className = "main">
        <Col md = {2} className = "sidebar">
          <Sidebar />
        </Col>
        <Col md = {9} className = "centerPart">
              {this.state.search === "" ?             
                  <div>
                      <Route exact path = '/' component = {Trending} />
                      <Route exact path = '/playlist' component = {Playlist} />
                      <Route exacts path = '/play/:id' component = {Player} />
                      <Route exact path = "/about" component = {About} />
                  </div> : 
                  <Results val = {this.state.search}/>
              }
        </Col>
        <Col md = {1} className = "sidebar">
        
        </Col>
        </Row>
              
        </div>
      </div>
      </BrowserRouter>  
    );
  }
}

export default App;
