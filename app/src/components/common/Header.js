import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    };
  
   

    handleChange(text) {
        this.setState({searchInputValue: text})
    };
    render() {
        return (
            <div>
               <nav className="main-header-container">
                    <Link className="qb-small-logo" to='/'>
                    <svg width="238px" height="57px" viewBox="0 0 238 57" version="1.1" xmlns="http://www.w3.org/2000/svg">    
                        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="HEADER-FOR-REAL" transform="translate(-102.000000, -9.000000)">
                                <g id="Group">
                                    <g id="QuiltBack---Small-Logo-Site-Banner" transform="translate(102.000000, 9.000000)">
                                        <rect id="Rectangle-3" fill="#D93044" fill-rule="evenodd" x="19" y="19" width="19" height="19"></rect>
                                        <text id="Q" font-family="BloggerSans-Bold, Blogger Sans" font-size="14.0790859" font-style="condensed" font-weight="bold" fill="#FFFFFF">
                                            <tspan x="20.2058788" y="31">Q</tspan>
                                        </text>
                                        <text id="B" font-family="BloggerSans-Bold, Blogger Sans" font-size="14.0790859" font-style="condensed" font-weight="bold" letter-spacing="0.873874051" fill="#FFFFFF">
                                            <tspan x="28.966049" y="36">B</tspan>
                                        </text>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(19.000000, 0.000000)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(4.750000, 9.500000) rotate(90.000000) translate(-4.750000, -9.500000) " points="4.75 4.75 14.25 14.25 -4.75 14.25"></polygon>
                                            <polygon id="Triangle" transform="translate(14.250000, 9.500000) rotate(-90.000000) translate(-14.250000, -9.500000) " points="14.25 4.75 23.75 14.25 4.75 14.25"></polygon>
                                        </g>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(47.500000, 28.500000) rotate(90.000000) translate(-47.500000, -28.500000) translate(38.000000, 19.000000)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(4.750000, 9.500000) rotate(90.000000) translate(-4.750000, -9.500000) " points="4.75 4.75 14.25 14.25 -4.75 14.25"></polygon>
                                            <polygon id="Triangle" transform="translate(14.250000, 9.500000) rotate(-90.000000) translate(-14.250000, -9.500000) " points="14.25 4.75 23.75 14.25 4.75 14.25"></polygon>
                                        </g>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(9.500000, 28.500000) rotate(90.000000) translate(-9.500000, -28.500000) translate(0.000000, 19.000000)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(4.750000, 9.500000) rotate(90.000000) translate(-4.750000, -9.500000) " points="4.75 4.75 14.25 14.25 -4.75 14.25"></polygon>
                                            <polygon id="Triangle" transform="translate(14.250000, 9.500000) rotate(-90.000000) translate(-14.250000, -9.500000) " points="14.25 4.75 23.75 14.25 4.75 14.25"></polygon>
                                        </g>
                                        <g id="Group" stroke-width="1" fill-rule="evenodd" transform="translate(19.000000, 38.000000)" fill="#D93044">
                                            <polygon id="Triangle" transform="translate(4.750000, 9.500000) rotate(90.000000) translate(-4.750000, -9.500000) " points="4.75 4.75 14.25 14.25 -4.75 14.25"></polygon>
                                            <polygon id="Triangle" transform="translate(14.250000, 9.500000) rotate(-90.000000) translate(-14.250000, -9.500000) " points="14.25 4.75 23.75 14.25 4.75 14.25"></polygon>
                                        </g>
                                        <text id="QuiltBack" font-family="Blogger_Sans-Bold, Blogger_Sans" font-size="36" font-style="condensed" font-weight="bold" letter-spacing="2.23448205" fill="#D93044">
                                            <tspan x="73.0008308" y="39">QuiltBack</tspan>
                                        </text>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    </Link>
                    <Link to='/createEvent' className='host-an-event-text'>
                        Host an Event
                    </Link>
                    <Link to='/events' className='find-an-event'>
                        Find an Event
                    </Link>
                    <Link to='/blog' className="blog">
                        Blog
                    </Link>
                    <form className="bar" ><input onChange={(e) => {this.handleChange(e.target.value)}} placeholder="Search"></input></form>
                </nav>
            </div>
        );
    };

};
function mapStateToProps(state,ownProps){
    if (ownProps && ownProps.history && !(state && state.history))
      return Object.assign({},state,{history:ownProps.history});
    return state;
}
export default connect(mapStateToProps)(Header);
