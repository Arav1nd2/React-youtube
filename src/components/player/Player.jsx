import React, { Component } from 'react';
import Youtube from 'react-youtube';
import {Navbar,Button,Col} from 'reactstrap';
import logo from '../../assets/logo.jpg';
import axios from 'axios';
import Linkify from 'react-linkify';
import './player.css';

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
            width : '100%',
            playerVars : {
                autoplay: 1
            }
        };
        let data = this.state.details ? this.state.details.items.map((data) => {
            let views = data.statistics.viewCount > 1000000 ? (parseInt(data.statistics.viewCount/1000000) + "," + parseInt((data.statistics.viewCount%1000000)/1000) + "," + parseInt(data.statistics.viewCount%1000)) : (parseInt((data.statistics.viewCount)/1000) + "," + parseInt(data.statistics.viewCount%1000));  
            return (
                <div>
                    <h2 className = "title" >{data.snippet.localized.title}</h2>
                    <span className="view">
                        <Col>
                            {views} views
                        </Col>
                        <span className="col">
                            <Button color = "danger">Add to Collections</Button>
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
                <Navbar className = "navBar" >
                  <span>
                 <img src = {logo} alt = "..." width = "40px" className = "brand"/>
               &nbsp;<b>Youtube Redefined!</b>
                 </span>
                </Navbar>
                <Youtube videoId = {this.state.id} opts = {opts} onReady = {this.onReady} />
                {data}
            </div>
        );
    }
}

export default Player;