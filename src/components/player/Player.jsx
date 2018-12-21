import React, { Component } from 'react';
import Youtube from 'react-youtube';
import {Button,Col} from 'reactstrap';
import axios from 'axios';
import Linkify from 'react-linkify';
import './player.css';
import data from '../../data/collection';
import Loader from 'react-loader-spinner'



class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            details : null
        }
        this.onReady = (e) => {
            e.target.pauseVideo();
        }
        this.handleClick = () => {
            if(this.state.id) {
                let newData = JSON.parse(localStorage.getItem('collections'));
                newData.push(this.state.id);
                localStorage.setItem('collections', JSON.stringify(newData));
                console.log(data);
            }
        }
    }
    sleeper(ms) {
        return function(x) {
          return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
      }
    componentDidMount() {
        axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id="+ this.props.match.params.id + "&key=AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc")
        .then(this.sleeper(1000)).then((res) => {
            this.setState({
                details : res.data
            });
        })
        this.setState({
            id : this.props.match.params.id
        });
    }
    render() {
        const opts = {
            height : '400',
            width : '100%',
            playerVars : {
                autoplay: 1
            }
        };
        console.log(this.props);
        let data = this.state.details ?  this.state.details.items.map((data) => {

            let views = data.statistics.viewCount > 1000000 ? (parseInt(data.statistics.viewCount/1000000) + "," + parseInt((data.statistics.viewCount%1000000)/1000) + "," + parseInt(data.statistics.viewCount%1000)) : (parseInt((data.statistics.viewCount)/1000) + "," + parseInt(data.statistics.viewCount%1000));  
            return (
                <div key = {views}>
                    <h2 className = "title" >{data.snippet.localized.title}</h2>
                    <span className="view">
                        <Col>
                            {views} views
                        </Col>
                        <span className="col">
                            <Button color = "danger" onClick = {this.handleClick}>Add to Collections</Button>
                        </span>
                    </span>
                    <hr/>
                    <h4 className = "description">Description : </h4>
                    <h6 className="description">
                        <Linkify>
                        {data.snippet.localized.description}
                        </Linkify>
                    </h6>
                </div>
            );
        }) : "";
        return (
            <div className = "playerPage">
                {
                    this.state.details ? 
                        <div>
                            <br/>
                            <Youtube videoId = {this.state.id} opts = {opts} onReady = {this.onReady} />
                            {data}
                        </div> :
                        <div className = "spinners">
                            <Loader type = "Bars" color = "black" width = "150" height = "80" /> 
                        </div>
                }
            </div>
        );
    }
}

export default Player;