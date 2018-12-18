import React, { Component } from 'react';
import Youtube from 'react-youtube';
import {Button,Col} from 'reactstrap';
import axios from 'axios';
import Linkify from 'react-linkify';
import './player.css';
import data from '../../data/collection';
import DonutChart from "react-svg-donut-chart"


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
                data.push(this.state.id);
                console.log(data);
            }
        }
    }
    componentDidMount() {
        axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id="+ this.props.match.params.id + "&key=AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc")
        .then((res) => {
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
            width : '80%',
            playerVars : {
                autoplay: 1
            }
        };
        console.log(this.state.details);
        let background,chart;
        let data = this.state.details ? this.state.details.items.map((data) => {
            background = data.snippet.thumbnails.maxres.url;
            chart = [{
                value : data.statistics.likeCount,
                stroke : "green"
            },
            {
                value : data.statistics.dislikeCount,
                stroke : "red"
            }    
        ];
            let views = data.statistics.viewCount > 1000000 ? (parseInt(data.statistics.viewCount/1000000) + "," + parseInt((data.statistics.viewCount%1000000)/1000) + "," + parseInt(data.statistics.viewCount%1000)) : (parseInt((data.statistics.viewCount)/1000) + "," + parseInt(data.statistics.viewCount%1000));  
            return (
                <div key = {views}>
                    <h2 className = "title" >{data.snippet.localized.title}</h2>
                    <span className="view">
                        <Col>
                            {views} views
                        </Col>
                        <Col>
                            <DonutChart data = {chart} className = "likeChart"/>
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
        }) : <h3>Loading....</h3>;
        return (
            <div>
                <br/>
                <img src= {background} alt="" width = "100%" height = "450px"  className = "backgroundImage"/>
                <Youtube videoId = {this.state.id} opts = {opts} onReady = {this.onReady} className = "videoPlayer"/>
                {data}
            </div>
        );
    }
}

export default Player;