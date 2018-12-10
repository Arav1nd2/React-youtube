import React, { Component } from 'react';
import { Input } from 'reactstrap';
import './search.css';

class Search extends Component {
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
    render() {
        return (
            <div>
                <Input 
                    type = "text" 
                    value = {this.state.search}
                    onChange = {this.handleChange} 
                    className = "search "
                    placeholder = "Search" />
                    <br/>
            </div>
        );
    }
}

export default Search;