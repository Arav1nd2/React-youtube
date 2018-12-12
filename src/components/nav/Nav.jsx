import React, {Component} from 'react';
import { Navbar,Row,Col } from 'reactstrap';
import logo from '../../assets/logo.png';
import './nav.css';
import Search from '../search/Search';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search : ''
        };
        this.handleChange = (e) => {
            this.setState({
                search : e.target.value
            });
        }
    }
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
                    <Search handleChange = {this.handleChange} val = {this.state.search} />
                </Col>
                <Col md = {1} className = "logout">
                    <span className="fa fa-power-off "></span>
                </Col>
            </Navbar>
        </div>
    );
    }
}

export default Nav;
