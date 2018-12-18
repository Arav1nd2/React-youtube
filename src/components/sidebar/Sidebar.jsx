import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div>
      <ul>
      <Link to = "/" className = "Links">
          <li>
              <span className="fa fa-fire icons" ></span>
              Trending
          </li>
          </Link>
          <Link to = '/playlist' className = "Links">
          <li>
            <span className="fa fa-heart-o icons" ></span>
              Favourites
          </li>
          </Link>
          <Link to = "/about" className = "Links">
          <li>
            <span className="fa fa-info-circle icons" ></span>
              About  
          </li>
          </Link>
      </ul>
    </div>
  )
}
