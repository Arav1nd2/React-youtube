import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

export default function Sidebar(props) {
  return (
    <div>
      <span className = "fa fa-times closeButton"></span>
      <ul>
      <Link to = "/" className = "Links">
          <li onClick = {props.handler}>
              <span className="fa fa-fire icons" ></span>
              Trending
          </li>
          </Link>
          <Link to = '/playlist' className = "Links">
          <li onClick = {props.handler}>
            <span className="fa fa-heart-o icons" ></span>
              Favourites
          </li>
          </Link>
          <Link to = "/about" className = "Links">
          <li onClick = {props.handler}>
            <span className="fa fa-info-circle icons" ></span>
              About  
          </li>
          </Link>
      </ul>
    </div>
  )
}
