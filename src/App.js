import React, { Component } from 'react';
import Trending from './components/trending/Trending';
import Playlist from './components/playlist/Playlist';
import './App.css';
import { Navbar } from 'reactstrap';
import logo from './assets/logo.jpg';
import Search from './components/search/Search';


const API = "AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc";

class App extends Component {
  render() {
    return (
      <div className = "bg"> 
        <Navbar className = "navBar" >
          <span>
            <img src = {logo} alt = "..." width = "40px" className = "brand"/>
            &nbsp;<b>Youtube Redefined!</b>
          </span>
        </Navbar>
        <br/>
        <Search />
        <Trending />
        <Playlist />
      </div>
    );
  }
}

export default App;
