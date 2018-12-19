import React, { Component } from 'react';
import axios from 'axios';
import { Card,Badge } from 'reactstrap';
import './trending.css';
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import Loader from 'react-loader-spinner'



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
    sleeper(ms) {
        return function(x) {
          return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
      }
    componentDidMount() {
        axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyC08_3UH9FAAQAxREzc4-bKQVQ_IXHuNLc"
            ).then(this.sleeper(1000)).then(res => {
                this.setState({
                    trending : res.data.items
                });
            })
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

            let trending =  this.state.trending.map((video) => {
            let title = video.snippet.title.substr(0,40) + "...";
            let views = video.statistics.viewCount;
            views = views > 1000000 ? parseInt(views/1000000) + "M views" : (views > 1000 ? parseInt(views/1000) + "K views" : views);
            let time = moment(video.snippet.publishedAt).startOf('day').fromNow();
            let duration = "";
            this.convert_time(video.contentDetails.duration).forEach(time => {
                duration = duration !== "" ? duration + ':' + time : (duration + time); 
            });
            let link = "/play/" + video.id;
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
                        <br/>
                    </Card>
                    </Link>
                    </div>
            );
        });

        return (
            <div className = "trends">
                    <br/>
                    <h4>Today's Trending Videos</h4>  
                    
                        {trending.length === 0 ?         
                            <div className="spinners">
                                 <Loader type = "Bars" color = "black" width = "150" height = "80" /> 
                            </div> :
                            <Slider {...setting}>
                                {trending}
                            </Slider>
                        }
                    
                    <br/><br/>
            </div>
        );
    }
}

export default Trending;