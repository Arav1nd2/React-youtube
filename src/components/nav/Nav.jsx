import React, {Component} from 'react';
import { Navbar,Col } from 'reactstrap';
import logo from '../../assets/logo.png';
import './nav.css';
import Search from '../search/Search';

class Nav extends Component {

    render()
    {  
        return (
        <div>
            <Navbar className = "navBar" >
                <Col md = {2} className = "logoArea">
                    <span>
                        <img src = {logo} alt = "..." width = "80px" className = "brand"/>
                    </span>
                </Col>
                <Col md = {9} className = "searchArea">
                    <Search handleChange = {this.props.data.handleChange} val = {this.props.data.search} />
                </Col>
                <Col md = {1} className = "logout">
                </Col>
            </Navbar>
        </div>
    );
    }
}

export default Nav;
