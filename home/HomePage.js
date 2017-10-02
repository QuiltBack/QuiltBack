import React from 'react';
import Discover from '../../styles/images/home/Discover_Image.svg';
import Promote from '../../styles/images/home/Promote_Image.svg';
import Share from '../../styles/images/home/Share_Image.svg';
import {apiGetAddress} from '../../services/apiServices';
var NodeGeocoder = require('node-geocoder');
var env = require('dotenv').config({ path: './server/config/.env' });
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
            <div>
                <span className="banner-container">
                    <svg  className="quilt-back-full-logo-site" width="193px" height="193px" viewBox="0 0 193 193" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="HOME" transform="translate(-262.000000, -178.000000)">
                                <g id="Banner-Image">
                                    <g id="QuiltBack---Full-Logo-Site" transform="translate(262.000000, 178.000000)">
                                        <rect id="Rectangle-3" fill="#D93044" fill-rule="evenodd" x="64.3333333" y="64.3333333" width="64.3333333" height="64.3333333"></rect>
                                        <text id="QUILT" font-family="BloggerSans-Bold, Blogger Sans" font-size="23.3208333" font-style="condensed" font-weight="bold" fill="#FFFFFF">
                                            <tspan x="67.7192771" y="91.1791667">QUILT</tspan>
                                        </text>
                                        <text id="BACK" font-family="BloggerSans-Bold, Blogger Sans" font-size="23.3208333" font-style="condensed" font-weight="bold" letter-spacing="1.4474999" fill="#FFFFFF">
                                            <tspan x="67.6207668" y="118.520833">BAC</tspan>
                                            <tspan x="111.608683" y="118.520833">K</tspan>
                                        </text>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(64.333333, 0.000000)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(16.083333, 32.166667) rotate(90.000000) translate(-16.083333, -32.166667) " points="16.0833333 16.0833333 48.25 48.25 -16.0833333 48.25"></polygon>
                                            <polygon id="Triangle" transform="translate(48.250000, 32.166667) rotate(-90.000000) translate(-48.250000, -32.166667) " points="48.25 16.0833333 80.4166667 48.25 16.0833333 48.25"></polygon>
                                        </g>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(160.833333, 96.500000) rotate(90.000000) translate(-160.833333, -96.500000) translate(128.666667, 64.333333)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(16.083333, 32.166667) rotate(90.000000) translate(-16.083333, -32.166667) " points="16.0833333 16.0833333 48.25 48.25 -16.0833333 48.25"></polygon>
                                            <polygon id="Triangle" transform="translate(48.250000, 32.166667) rotate(-90.000000) translate(-48.250000, -32.166667) " points="48.25 16.0833333 80.4166667 48.25 16.0833333 48.25"></polygon>
                                        </g>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(32.166667, 96.500000) rotate(90.000000) translate(-32.166667, -96.500000) translate(0.000000, 64.333333)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(16.083333, 32.166667) rotate(90.000000) translate(-16.083333, -32.166667) " points="16.0833333 16.0833333 48.25 48.25 -16.0833333 48.25"></polygon>
                                            <polygon id="Triangle" transform="translate(48.250000, 32.166667) rotate(-90.000000) translate(-48.250000, -32.166667) " points="48.25 16.0833333 80.4166667 48.25 16.0833333 48.25"></polygon>
                                        </g>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(64.333333, 128.666667)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(16.083333, 32.166667) rotate(90.000000) translate(-16.083333, -32.166667) " points="16.0833333 16.0833333 48.25 48.25 -16.0833333 48.25"></polygon>
                                            <polygon id="Triangle" transform="translate(48.250000, 32.166667) rotate(-90.000000) translate(-48.250000, -32.166667) " points="48.25 16.0833333 80.4166667 48.25 16.0833333 48.25"></polygon>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div className="section_b">
                        <h1 className="quilt-back-gives-back">QuiltBack Gives Back</h1>
                        <div className="rectangle-2"></div>
                        <p className="we-are-a-community">We are a community that fosters aid for refugees by hosting charity quilt auctions. Learn how you can get involved. Become a QuiltBacker today.</p>
                    </div>
                </span>
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
            </div>
        )
    }

}
export default HomePage;
