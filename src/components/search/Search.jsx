import React, { Component } from 'react';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Search extends Component {
    
    render() {
        return (
            <div>
                <span class="fa fa-search icon"></span>
                <input 
                    type = "text" 
                    value = {this.props.val}
                    onChange = {this.props.handleChange} 
                    className = "search "
                    placeholder = "Search....." />
            </div>
        );
    }
}

export default Search;