import React, { Component } from 'react';
import axios from 'axios';
import { Container,Card,Row,Col,Badge } from 'reactstrap';
import './trending.css';
import * as moment from 'moment';
import {Link} from 'react-router-dom';


class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trending : []
        };
    }
    convert_time(duration) {
        var a = duration.match(/\d+/g);
    
        if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
            a = [0, a[0], 0];
        }
    
        if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
            a = [a[0], 0, a[1]];
        }
        if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
            a = [a[0], 0, 0];
        }
        return a;

    }

    componentDidMount() {
        axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc"
            ).then(res => {
                this.setState({
                    trending : res.data.items
                });
            })
    }
    render() {
            let trending = this.state.trending.map((video) => {
            let title = video.snippet.title.substr(0,40) + "...";
            let views = video.statistics.viewCount;
            views = views > 1000000 ? parseInt(views/1000000) + "M views" : (views > 1000 ? parseInt(views/1000) + "K views" : views);
            let time = moment(video.snippet.publishedAt).startOf('day').fromNow();
            let duration = "";
            this.convert_time(video.contentDetails.duration).forEach(time => {
                duration = duration !== "" ? duration + ':' + time : (duration + time); 
            });
            let link = "/" + video.id;
            return (
                <Col md = {4} key = {video.id}>
                    <Link to = {link} className = "links" >
                    <Card className = "cards">
                        <img src = {video.snippet.thumbnails.medium.url} alt = ""  />
                        <span className="duration"><Badge color = "secondary">{duration}</Badge></span>
                        <h6 className = "title"><b>{title}</b></h6>
                        <div className="channel">
                            {video.snippet.channelTitle}
                        </div>
                        <div>
                            <span className="views">{views}</span>
                            <span className="time">{time}</span>
                        </div>
                    </Card>
                    <br/>
                    </Link>
                </Col>
            );
        })

        return (
            <div>
                <Container>
                    <h4>Today's Trending Videos</h4>  
                    <Row>
                        {trending}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Trending;