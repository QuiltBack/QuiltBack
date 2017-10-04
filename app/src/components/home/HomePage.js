import React from 'react';
import Discover from '../../styles/images/home/Discover_Image.svg';
import Promote from '../../styles/images/home/Promote_Image.svg';
import Share from '../../styles/images/home/Share_Image.svg';
import QBLogo from '../../styles/images/home/QB_Full_Logo.js';

import {apiGetAddress} from '../../services/apiServices';
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null
}
var geocoder = NodeGeocoder(options);

class HomePage extends React.Component {
constructor(props){
    super(props);
    this.state = {
        data: []
        
        
    }
    this.loadAddress = this.loadAddress.bind(this)
}
componentDidMount(){
this.loadAddress()

}
componentWillReceiveProps(){
this.loadAddress()
}

loadAddress(){
            /*geocoder.geocode(config, function(err,res){
            console.log(res);
            });*/   
        
        apiGetAddress()
            .then((res)=>{
                console.log(res)
                this.setState({
                    data: res
                })
            })
            .catch(err=>{
            console.log(err)
            })
}


    render() {
        return (
            <section className='homepage-section'>
                <div className="homepage-banner-container">
                    <div className='homepage-logo-container'>
                        <QBLogo/>
                    </div>
                    <div className="homepage-text-container">
                        <h1 className="homepage-give-back">QuiltBack Gives Back</h1>
                        <div className="homepage-rect2"></div>
                        <p className="homepage-community">We are a community that fosters aid for refugees by hosting charity quilt auctions. Learn how you can get involved. Become a QuiltBacker today.</p>
                    </div>
                </div>
                <span className="host-section-container">
                    <span className="host-an-event" >Host an Event</span>
                    <section className="host-a">
                        <img className="discover-icon" src={Discover}/>
                        <p className="discover">Discover.</p>
                        <p className="learn-how-to-host-yo">Learn how to host your own event using our free online resources.</p>
                    </section>
                    <section className="host-b">
                        <img className="promote-icon" src={Promote} />
                        <p className="promote">Promote</p>
                        <p className="publish-your-event-b">Publish your event page and upload an auction catalogue.</p>
                    </section>
                    <section className="host-c">
                        <img className="share-icon" src={Share} />
                        <p className="share">Share.</p>
                        <p className="create-an-account-to">Create an account to blog your experience with the community.</p>
                    </section>

                </span>
                <span>
                    <div className="learn-more-button">
                    </div>
                </span>
            </section>
        )
    }

}
export default HomePage;
