import React, { Component } from 'react';
import axios from 'axios';
import {Card,Container,Media} from 'reactstrap';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import './result.css';
import MediaQuery from "react-responsive";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results : [],
        }
    }
    
    componentDidMount() {
        axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+this.props.val+"&key=AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc")
        .then(res => {
            this.setState({
                results : res.data.items
            });
        })
    }
    
    componentWillReceiveProps() {
        axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+this.props.val+"&key=AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc")
        .then(res => {
            this.setState({
                results : res.data.items
            });
        })
    }
    
    render() {
        console.log(this.props);
        let i =0;
        let displayData = this.state.results.length === 0 ? "" : 
            this.state.results.map( video => {
                i++;
                var path = "/play/"+ video.id.videoId;
                let time = moment(video.snippet.publishedAt).startOf('day').fromNow();
                return (
                    <div key = {i}>
                        <Link to = {path} className = "links">
                        <MediaQuery minDeviceWidth = {600}>
                        <Card className = "Rescards">
                            <Media>
                                <Media left>
                                    <Media object src = {video.snippet.thumbnails.medium.url} className = "thumb"/>
                                </Media>
                                <Media body className = "medBody">
                                    <Media heading className = "heading">
                                        {video.snippet.title}
                                    </Media>
                                    <span className="channel">{video.snippet.channelTitle}<b> .</b></span>
                                    <span className = "Stime">{time}</span>
                                    <MediaQuery minDeviceWidth = {600}>
                                    <div className="description">{video.snippet.description.substr(0,100)+"..."}</div>
                                    </MediaQuery>
                                </Media>
                            </Media>
                        </Card>
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth = {599} >
                            <Card className = "cards">
                            <img src = {video.snippet.thumbnails.medium.url} alt = ""  />
                            <h6 className = "title"><b>{video.snippet.title}</b></h6>
                            <div className="channel">
                                {video.snippet.channelTitle}
                            </div>
                            <div>
                                <span className="time">{time}</span>
                            </div>
                            <br/>
                            </Card>
                        </MediaQuery>
                        </Link>
                    </div>
                );
            } );
        return (
            <div >
                <Container className = "resultsPage">
                    <br/>
                    <h6>Matching results : (25)</h6>
                    {displayData}      
                </Container>
            </div>
        );
    }
}

export default Results;