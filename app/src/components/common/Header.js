import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import QBSmallLogo from '../../styles/images/header/QB_Small_Logo';

class Header extends Component {
    render() {
        return (
            <div>
               <nav className="main-header-container">
                    <Link to='/' className="qb-small-logo">
                        <QBSmallLogo/>
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
