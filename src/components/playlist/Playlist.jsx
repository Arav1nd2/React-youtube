import React, { Component } from 'react';
import {Container,Card,Badge} from 'reactstrap';
import data from '../../data/collection';
import axios from 'axios';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import Slider from 'react-slick';
import Loader from 'react-loader-spinner'
import MediaQuery from 'react-responsive';




class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection : []
        }
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
    sleeper(ms) {
        return function(x) {
          return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
      }
    
    componentDidMount() {
        let col = [];
        data.forEach(id => {
            axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id="+id+"&key=AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc")
            .then(this.sleeper(1000)).then(res => {
                 col.push(res.data.items[0]);
            }).then(() => {
                this.setState({
                    collection : col
                });
            })
        });
    }
    render() {            
        const setting = {
        className : "center",
        centerMode : true,
        infinite : true,
        centrePadding : "70px",
        slidesToShow : 2,
        speed : 500,
        autoplay : true,
        autoplaySpeed : 4000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

        let collection = this.state.collection.map((video) => {
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
                <div key = {video.id}>
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
                </div>
            );
        });
        return (
            <div className = "trends">
                <Container>
                    <br/>
                    <h4>Your Collections</h4>  
                    {collection.length === 0 ?
                        <div className="spinners">
                            <Loader type = "Bars" color = "black" width = "150" height = "80" /> 
                        </div> :
                        <div>
                            <MediaQuery minDeviceWidth = {768}>
                            <Slider {...setting}>
                                {collection}
                            </Slider>
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth = {767}>
                                {collection}
                            </MediaQuery>
                        </div>
                    }
                </Container>
            </div>
        );
    }
}

export default Playlist;