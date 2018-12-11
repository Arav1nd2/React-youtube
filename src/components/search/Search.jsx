import React, { Component } from 'react';
import { Input } from 'reactstrap';
import './search.css';

class Search extends Component {
    
    render() {
        return (
            <div>
                <Input 
                    type = "text" 
                    value = {this.props.val}
                    onChange = {this.props.handleChange} 
                    className = "search "
                    placeholder = "Search" />
                    <br/>
            </div>
        );
    }
}

export default Search;