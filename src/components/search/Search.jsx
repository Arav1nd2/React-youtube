import React, { Component } from 'react';
import './search.css';


class Search extends Component {
    
    render() {
        return (
            <div>
                <span className="fa fa-search icon"></span>
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