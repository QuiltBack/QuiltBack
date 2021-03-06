import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TimelineMax, Power4} from 'greensock';
import {getUser,logout} from '../../reducers/generalReducer';
import {Link} from 'react-router-dom';
import '../../styles/Dashboard.css';
const frontenv = require('../../frontenv.js');


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded:false,
      pagesExpanded:false,
    }
    this.logout=this.logout.bind(this);
    this.login =this.login.bind(this);
  }
  login(){
    let currentpage = this._reactInternalInstance._context.router.route.location.pathname
   if ( currentpage!=="/" && currentpage)
  localStorage.setItem("redirect",JSON.stringify(this._reactInternalInstance._context.router.route.location.pathname));
 
  }
  logout(){
    if (this.props && this.props.logout){
      this.props.logout();
      this._reactInternalInstance._context.router.history.push('/');
      let tl = new TimelineMax();
      tl.to('.dashboard-container', 0, {marginLeft: '-258px'})
    }
  }
  componentWillMount(){
    if (this.props && this.props.getUser && this.props.general && !this.props.general.user) {
      this.props.getUser();
    }
    let redirect = JSON.parse(localStorage.getItem("redirect"));
    localStorage.removeItem("redirect");
    if (redirect && redirect !== "/")
       this._reactInternalInstance._context.router.history.push(redirect);
   
    
 }
 componentDidMount() {
   setTimeout(()=>{
     let props = this.props.general
     if (!(props && props.user && props.user.users_id)) {
       let tl = new TimelineMax();
       tl.to('.dashboard-container', .5, {marginLeft: 0})
         .to('.dashboard-expand', 0, {display:'none', opacity:0}, '-=.5')
         .to('.dashboard-container', .5, {marginLeft: '-258px'}, '+=1')
         .to('.dashboard-expand', .1, {display:'flex', opacity:.5})
         .to('.dashboard-contents', 0, {opacity:1, marginLeft:'60px', color: 'white'})
     }
   },500)
 }
  mouseEnter() {
    let tl = new TimelineMax();
    tl.to('.dashboard-expand', .3, {marginLeft:'150px', opacity: '.8'})
  }
  mouseLeave() {
    let tl = new TimelineMax();
    tl.to('.dashboard-expand', .3, {marginLeft:'120px', opacity:'.5'})
  }
  mouseClick() {
    let tl = new TimelineMax();
    tl.to('.dashboard-container', .5, {marginLeft: 0})
    .to('.dashboard-expand', .1, {display:'none', opacity:0}, '-=.5');
    this.setState({
      expanded:true,
    })
  }
  mouseLeaveSection() {
    let tl = new TimelineMax();
    if (this.state.expanded) {
      tl.to('.dashboard-container', .5, {marginLeft: '-258px'})
        .to('.dashboard-expand', .1, {display:'flex', opacity:.5})
        .to('.dashboard-contents', 0, {opacity:1, marginLeft:'60px', color: 'white'})
      }
    setTimeout(()=>{
      this.setState({
        expanded:false,
      })
    },300)
  }
  expandPages() {
    let tl = new TimelineMax();
    if (this.state.pagesExpanded) {
      tl.to('.dashboard-admin-hidden-pages', .5, {height:'6px'})
        .to('.dashboard-admin-line', .5, {width:'0%', ease:Power4.easeOut});
      setTimeout(()=>{
        this.setState({
          pagesExpanded:false,
        })
      },1200)
    } else {
      tl.to('.dashboard-admin-line', .5, {width:'100%', ease:Power4.easeOut})
        .to('.dashboard-admin-hidden-pages', .5, {height: '100px', ease: Power4.easeOut})
      setTimeout(()=>{
        this.setState({
          pagesExpanded:true,
        })
      },1200)
    }
  }
  render() {
    let dashboard;
  
    
    let props = this.props.general
   
    if (props && props.user && props.user.users_id) {
     
      if (props.user.user_type==='Admin') {
        dashboard = (
          <section className='dashboard-container'>
            <div className='dashboard-title'>Dashboard</div>
            <Link className='dashboard-admin-notifications' to='/notifications'>Notifications</Link>
            <div className='dashboard-admin-pages'>
              <div className='dashboard-admin-pages-text' onClick={()=>{this.expandPages()}}>Pages</div>
              <div className='dashboard-admin-hidden-pages'>
                <div className='dashboard-admin-line'/>
                <Link className='dashboard-hidden-home' to='/'>Home</Link>
                <Link className='dashboard-hidden-blog' to='/blog'>Blog</Link>
                <Link className='dashboard-hidden-events' to='/events'>Events</Link>
                <Link className='dashboard-hidden-account' to='/dashboard/account'>Account</Link>
              </div>
            </div>
            <Link className='dashboard-admin-users' to='/users'>Users</Link>
            <Link className='dashboard-admin-posts' to='/posts'>Posts</Link>
            <div className="dashboard-admin-logout" onClick={this.logout}>Logout</div>
            <div onMouseEnter={(e)=>{this.mouseEnter()}} onMouseLeave={(e)=>{this.mouseLeave()}} onClick={(e)=>{this.mouseClick()}} className='dashboard-expand'>
              <div className='dashboard-contents'> {'<'} </div>
            </div>
        </section>
        )
      } else {
        dashboard = (
          <section className='dashboard-container'>
            <div className='dashboard-title'>Dashboard</div>
            <Link className='dashboard-user-events' to={'/dashboard/events'}>My Events</Link>
            <Link className='dashboard-user-posts' to={'/dashboard/posts'}>My Posts</Link>
            <Link className='dashboard-user-account' to={'/dashboard/account'}>Account Settings</Link>
            <div className="dashboard-user-logout" onClick={this.logout}>Logout</div>
            <div onMouseEnter={(e)=>{this.mouseEnter()}} onMouseLeave={(e)=>{this.mouseLeave()}} onClick={(e)=>{this.mouseClick()}} className='dashboard-expand'>
              <div className='dashboard-contents'> {'<'} </div>
            </div>
        </section>
        )
      }
    } else {
      dashboard = (
        <section className='dashboard-container'>
          <div className='dashboard-title'>Dashboard</div>
          <a className="dashboard-login" onClick={this.login} href={`${frontenv.BACKEND_HOST}/auth`}>Signup/Login</a>
          <div onMouseEnter={(e)=>{this.mouseEnter()}} onMouseLeave={(e)=>{this.mouseLeave()}} onClick={(e)=>{this.mouseClick()}} className='dashboard-expand'>
            <div className='dashboard-contents'> {'<'} </div>
          </div>
        </section>
      )
    }
    return (
      <section onMouseLeave={(e)=>{this.mouseLeaveSection()}} className='dashboard-section'>
      {dashboard}
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {

  if (ownProps && ownProps.history && !(state && state.history)){
  
    return Object.assign({}, state, {
      history: ownProps.history
    });
  }
  return state;
}

export default connect(mapStateToProps, {
  getUser: getUser,
  logout:logout

})(Dashboard);