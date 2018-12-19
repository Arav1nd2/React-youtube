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
    this.handleClick = () => {
      this.setState({
        search : ""
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
      <div className = "box">
        <Nav data = {data}/>
        <Row className = "main">
        <Col md = {2} className = "sidebar">
          <Sidebar handler = {this.handleClick}/>
        </Col>
        <Col md = {9} className = "centerPart">            
                  <div>
                      <Route exact path = '/' render = {(props) => this.state.search === "" ? <Trending/> : <Results {...props} val = {this.state.search} />} />
                      <Route exact path = '/playlist' render = {(props) => this.state.search === "" ? <Playlist/> : <Results {...props} val = {this.state.search} />}/>
                      <Route exact path = '/play/:id' render = {(props) => this.state.search === "" ? <Player {...props}/> : <Results {...props} val = {this.state.search}/>} />
                      <Route exact path = "/about" render = {(props) => this.state.search === "" ? <About/> : <Results {...props} val = {this.state.search}/>}/>
                  </div>
        </Col>
        <Col md = {1} className = "sidebar">
        
        </Col>
        </Row> 
        </div>
      </BrowserRouter>  
    );
  }
}

export default App;
