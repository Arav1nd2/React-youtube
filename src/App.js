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
import {db} from './components/firebase';
import firebase from 'firebase';

//const API = "AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc";

class App extends Component {
  constructor(props) {
    super(props);
    let Id = 27;
    db.ref("users/" + Id).set({
      collections : JSON.stringify([])
    });
    if(localStorage.getItem('collections') === undefined)
      {localStorage.setItem('collections',JSON.stringify([]));}
    this.state = {
      search : "",
      sidebar : false,
      id : Id
    }
    this.handleChange = (e) => {
      this.setState({
        search : e.target.value,
      });
    }
    this.handleClick = () => {
      this.setState({
        search : "",
        sidebar : !this.state.sidebar 
      });
    }
    this.handleHamberburger = () => { 
      this.setState({
        sidebar : !this.state.sidebar
      });
    }
  }
  componentDidMount() {
    
  }
  render() {
    let data =  {
      search : this.state.search,
      handleChange : this.handleChange
    };
    return (
      <BrowserRouter>  
      <div className = "box">
        <Nav data = {data} handleClick = {this.handleHamberburger}/>
        <Row className = "main">
        <Col md = {2} className = "sidebar">
          <Sidebar handler = {this.handleClick} status = {this.state.sidebar} handleClose = {this.handleHamberburger}/>
        </Col>
        <Col md = {9} className = "centerPart">            
                  <div>
                      <Route exact path = '/' render = {(props) => this.state.search === "" ? <Trending/> : <Results {...props} val = {this.state.search} />} />
                      <Route exact path = '/playlist' render = {(props) => this.state.search === "" ? <Playlist id = {this.state.id}/> : <Results {...props} val = {this.state.search} />}/>
                      <Route exact path = '/play/:id' render = {(props) =>  <Player {...props} id = {this.state.id}/>  }/>
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
