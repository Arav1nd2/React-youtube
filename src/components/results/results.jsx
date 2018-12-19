import React, { Component } from 'react';
import axios from 'axios';
import {Card,Container,Media} from 'reactstrap';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import './result.css';

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
                        <Card className = "Rescards">
                            <Media>
                                <Media left>
                                    <Media object src = {video.snippet.thumbnails.medium.url} className = "thumb"/>
                                </Media>
                                <Media body>
                                    <Media heading className = "heading">
                                        {video.snippet.title}
                                    </Media>
                                    <span className="channel">{video.snippet.channelTitle}<b> .</b></span>
                                    <span className="time">{time}</span>
                                    <div className="description">{video.snippet.description.substr(0,100)+"..."}</div>
                                </Media>
                            </Media>
                        </Card>
                        </Link>
                        <br/>
                    </div>
                );
            } );
        return (
            <div className = "resultsPage">
                <Container>
                    <br/>
                    <h6>Matching results : (25)</h6>
                    {displayData}      
                </Container>
            </div>
        );
    }
}

export default Results;