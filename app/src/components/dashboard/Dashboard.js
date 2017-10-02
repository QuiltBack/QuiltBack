import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TimelineMax, Power4} from 'greensock';
import {getUser} from '../../reducers/generalReducer';
import '../../styles/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded:false,
    }
  }
  componentWillMount(){
    if (this.props && this.props.getUser && 
    !(this.props.general && this.props.general.user && this.props.general.user.id))
    {
        this.props.getUser();
    }
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
    .to('.dashboard-expand', 0, {display:'none', opacity:0}, '-=.5');
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
  }
  render() {
    console.log(this.props.general);
    let dashboard;
    dashboard = (
      <section className='dashboard-container'>
        <div className='dashboard-title'>Dashboard</div>
        <a className="dashboard-login" href="http://localhost:3001/auth">Signup/Login</a>
        <div onMouseEnter={(e)=>{this.mouseEnter()}} onMouseLeave={(e)=>{this.mouseLeave()}} onClick={(e)=>{this.mouseClick()}} className='dashboard-expand'>
          <div className='dashboard-contents'> {'<'} </div>
        </div>
      </section>
    )
    return (
      <section onMouseLeave={(e)=>{this.mouseLeaveSection()}} className='dashboard-section'>
      {dashboard}
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  if (ownProps && ownProps.history && !(state && state.history))
    return Object.assign({}, state, {
      history: ownProps.history
    });
  return state;
}

export default connect(mapStateToProps, {
  getUser: getUser,
})(Dashboard);