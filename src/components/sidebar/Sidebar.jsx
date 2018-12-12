import React from 'react';
import './sidebar.css';

export default function Sidebar() {
  return (
    <div>
      <ul>
          <li>
              <span className="fa fa-fire icons" ></span>
              Trending
          </li>
          <li>
            <span className="fa fa-heart-o icons" ></span>
              Favourites
          </li>
          <li>
            <span className="fa fa-info-circle icons" ></span>
              About
          </li>
      </ul>
    </div>
  )
}
