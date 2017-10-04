import React, {Component} from 'react';
import {TimelineMax, Power4, Power0} from 'greensock';
import {connect} from 'react-redux';
import {getEvents} from '../../reducers/generalReducer';
import moment from 'moment';
import '../../styles/EventsPage.css';
import DownArrow from '../../styles/images/events/down_arrow.svg';


import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';



const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const EmailIcon = generateShareIcon('email');
 const frontenv = require('../../frontenv.js');

class EventsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortBy: {
        expanded:false,
        value:'',
        clickable:true,
      },
      distance: {
        expanded:false,
        value:'',
        clickable:true,
      },
      date: {
        expanded:false,
        value:'',
        clickable:true,
      },
      query:'',
      location:'',
      numberOfEvents:6,
      resetButton:true
    }
    this.gotoDetail = this.gotoDetail.bind(this);
  }
  gotoDetail(eventid){
   if (this.props && this.props.history)
     this.props.history.push("/event/" + eventid);

  }

  componentDidMount() {
    let wtl = new TimelineMax();
    wtl.to(window, .5, {scrollTo:0, ease:Power4.easeOut})
    this.loadEvents();
    let tl = new TimelineMax({
      repeat: -1,
      repeatDelay:0,
    })
    tl.from('.events-page-down-arrow', 1, {bottom: 30, height: '25px', opacity: 0, ease: Power4.easeOut})
      .from('.events-page-down-arrow2', 1, {bottom: 20, ease:Power0.easeOut}, '-=1')
      .from('.events-page-down-arrow3', 1, {bottom: 10, height: '50px', opacity:.7, ease:Power4.easeOut}, '-=1')
  }

  componentWillReceiveProps() {
    this.loadEvents();
  }

  loadEvents() {
    if (this.props && this.props.getEvents && (this.props.general.events.length < 1) ){
      this.props.getEvents();
    }
  }

  updateForm(form, type) {
    let newType = this.state[type]
    type==='sortBy'?
    this.setState({
      sortBy : {
        expanded:newType.expanded,
        value:form,
        clickable:newType.clickable,
      }
    }): type==='distance'? 
    this.setState({
      distance : {
        expanded:newType.expanded,
        value:form,
        clickable:newType.clickable,
      }
    }):
    this.setState({
      date : {
        expanded:newType.expanded,
        value:form,
        clickable:newType.clickable,
      }
    });

    setTimeout(()=>{
      this.expandForm(type)
    },100)
  }
  expandForm(type) {
    let newType = this.state[type]
    let tl = new TimelineMax();
    let className = type==='sortBy'? 
    '.events-page-filter-two-options' : type==='distance'? 
    '.events-page-filter-three-options':'.events-page-filter-four-options';
    let height = type==='sortBy'? 
    '100px' : type==='distance'? 
    '197px':'227px';

    type==='sortBy'?
    this.setState({
      sortBy : {
        expanded:newType.expanded,
        value:newType.value,
        clickable: false,
      }
    }): type==='distance'? 
    this.setState({
      distance : {
        expanded:newType.expanded,
        value:newType.value,
        clickable: false,
      }
    }):
    this.setState({
      date : {
        expanded:newType.expanded,
        value:newType.value,
        clickable: false,
      }
    });
      newType.expanded?
      tl.to(className, .5, {height: '0px'}).to(className, 0, {borderWidth:'0px'}):
      tl.to(className, 0, {border: '1px solid #C2C2C2'}).to(className, .5 ,{height: height});

    setTimeout(()=>{
      type==='sortBy'?
      this.setState({
        sortBy : {
          expanded:newType.expanded? false:true,
          value:newType.value,
          clickable: true,
        }
      }): type==='distance'? 
      this.setState({
        distance : {
          expanded:newType.expanded? false:true,
          value:newType.value,
          clickable: true,
        }
      }) :
      this.setState({
        date : {
          expanded:newType.expanded? false:true,
          value:newType.value,
          clickable: true,
        }
      });
    },500) 
  }

  handleChange(val, type) {
    type==='query'?
    this.setState({
      query: val
    }) : this.setState({
      location: val
    });
    console.log(val)
  }

  render(){
    let button;
    let events='Loading events...';
    let weekDays={
        1:"Sun",
        2:"Mon",
        3:"Tues",
        4:"Wed",
        5:"Thurs",
        6:"Fri",
        7:"Sat"
    };
  console.log(this.props.general);
    if (this.props && this.props.general.events ){
      console.log("map events object");
      if (this.state.sortBy.value) {
        switch(this.state.sortBy.value) {
          case 'Relevance':
            this.props.general.events.sort((a, b)=>{
              let split = this.state.query.split(' ');
              let aCount = split.reduce((acc, current)=>{
                if (!current) {
                  return acc;
                }
                let reg = new RegExp(current, "gi");
                acc += ((a.title.match(reg) || []).length) * 2;
                return acc + (a.description.match(reg) || []).length;
              },0)
              let bCount = split.reduce((acc, current)=>{
                if (!current) {
                  return acc;
                }
                let reg = new RegExp(current, "gi");
                acc += ((b.title.match(reg) || []).length) * 2;
                return acc + (b.description.match(reg) || []).length;
              },0)
              return (bCount - aCount);
            })
            break;
          case 'Newest':
            this.props.general.events.sort((a, b)=>{
              let date1 = new Date(a.date);
              let date2 = new Date(b.date);
              return (date2 - date1);
            })
            break;
        }
      }
      let eventsFiltered = this.props.general.events.filter((e)=>{
        let splitQuery = this.state.query.split(' ');
        return splitQuery.reduce((acc, current)=>{
            if (!e.description.toLowerCase().includes(current.toLowerCase()) && !e.title.toLowerCase().includes(current.toLowerCase())) return false
            else return acc;
        },true)
      });
      let locationFiltered = eventsFiltered.filter((e)=>{
        let splitLocation = this.state.location.split(' ');
        return splitLocation.reduce((acc, current)=>{
          if (!e.city.toLowerCase().includes(current.toLowerCase()) && !e.state.toLowerCase().includes(current.toLowerCase()) && !e.address.includes(current)) return false
          else return acc;
      },true)
      })
      let arrowStyle = {
        height: '50px',
        display: 'grid',
        gridArea: '2 / 2',
        position: 'relative',
        margin: '0 auto',
      }
      let arrowStyle2 = {
        height: '50px',
        display: 'grid',
        gridArea: '4 / 2',
        position: 'relative',
        margin: '0 auto',
        opacity: .7,
      }
      let arrowStyle3 = {
        height: '25px',
        display: 'grid',
        gridArea: '5 / 2',
        position: 'relative',
        margin: '0 auto',
        opacity: 0,
        bottom: -20,
      }
      button = locationFiltered.length >= this.state.numberOfEvents? 
      (
        <section className='events-page-scroll' onClick={(e)=>{this.setState({numberOfEvents: this.state.numberOfEvents + 6, resetButton: true})}}>
          <div className='events-page-show-more'>
            Show more
          </div>
          <img className='events-page-down-arrow' style={arrowStyle} src={DownArrow}/>
          <img className='events-page-down-arrow2' style={arrowStyle2} src={DownArrow}/>
          <img className='events-page-down-arrow3' style={arrowStyle3} src={DownArrow}/>
        </section>) :
      (null)
      
      if(this.state.resetButton) {
        let rtl = new TimelineMax()
        rtl.to('.events-page-down-arrow', 0, {bottom: 0, height: '50px', opacity: .7})
          .to('.events-page-down-arrow2', 0, {bottom: 0})
          .to('.events-page-down-arrow3', 0, {bottom:-20, height:'25px', opacity: 0})
          .to('.events-page-show-more', 0, {color: 'black', ease: Power0.easeOut})
      }
      let tl = new TimelineMax({
        repeat: -1,
        repeatDelay:0,
      })
      tl.from('.events-page-down-arrow', 1, {bottom: 30, height: '25px', opacity: 0, ease: Power4.easeOut})
        .from('.events-page-down-arrow2', 1, {bottom: 24, ease:Power0.easeOut}, '-=1')
        .from('.events-page-down-arrow3', 1, {bottom: 10, height: '50px', opacity:.7, ease:Power4.easeOut}, '-=1')
      
      events = locationFiltered.map((event,index)=>{
        console.log("EVENT");
        console.log(event);
        var d1 = moment.utc(event.date);
        let shareUrl=`${frontenv.REACT_APP_HOST}/event/` + event.eventid;
        let title=event.title;
        
        return index<(this.state.numberOfEvents)?
           (
             
            <div className="events-page-events"   key={index}>
            <div className="events-page-banner">
            <div onClick={e=>{this.gotoDetail(event.eventid)}} className='events-page-banner-image'/>
            </div>
            <div className='events-page-social-media'>


              <div className='events-page-facebook'>
           
         <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <FacebookIcon
              size={49}
              round />
          </FacebookShareButton>
              </div>
              <div className='events-page-twitter'>
               <TwitterShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <TwitterIcon
              size={49}
              round />

          </TwitterShareButton>

              </div>
              <div className='events-page-google'>
                <GooglePlusShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <GooglePlusIcon
              size={49}
              round />

          </GooglePlusShareButton>
                </div>
              <div className='events-page-email'>
              <EmailShareButton
             url={shareUrl}
            subject={title}
            body="body"
            className="share-button">
            <EmailIcon
              size={49}
              round />

          </EmailShareButton>
              </div>
            </div>
            <div onClick={e=>{this.gotoDetail(event.eventid)}}  className="events-page-event-info">
              <div className='events-page-event-title'>{ 27 > event.title.length? 
                event.title : (event.title).substring(0, 27) + '...'}</div>
              <div className='events-page-event-place'>{d1.format("MMMM DD, YYYY ") + d1.format('h A ') + event.city + ', ' + event.state + ' ' + event.zipcode + ', ' + event.address}</div>
              <div className="events-page-event-description">{590 > event.description.length? 
                event.description : (event.description).substring(0, 590) + '...'}</div>
            </div>
          </div>
        ) : null
      }) 
    }
    let stl = new TimelineMax({
      repeat: -1,
      yoyo: true
    });
    stl.from('.events-page-show-more', 1, {color:'#4E4E4E', ease: Power0.easeOut})

    return (
      <section className='events-page-section'>
      <div className='events-page-background'>
        <div className='events-page-title'>Events</div>
      </div>
      <div className='events-page-filter'>
        <div className='events-page-filter-one'>
          <div className='events-page-filter-one-find'> Find </div>
          <input onChange={(e)=>{this.handleChange(e.target.value, 'query')}} className='events-page-filter-one-input-find' placeholder='Ruby Jubilee, Salt Lake City, Silent auction'/>
          <div className='events-page-filter-one-line'/>
          <div className='events-page-filter-one-near'> Near </div>
          <input onChange={(e)=>{this.handleChange(e.target.value, 'location')}} className='events-page-filter-one-input-near' placeholder='Salt Lake City, UT'/>
          <div className='events-page-filter-one-button'/>
        </div>
        <div className='events-page-filter-two'>
          <div className='events-page-filter-two-select'>
            <div className='events-page-filter-two-select-name'>{this.state.sortBy.value? this.state.sortBy.value:'Sort By'}</div>
          </div>
          <div className='events-page-filter-two-options'>
            <li onClick={()=>{this.updateForm('Relevance', 'sortBy')}} className='events-page-filter-two-option-one'>Relevance</li>
            <li onClick={()=>{this.updateForm('Newest', 'sortBy')}} className='events-page-filter-two-option-two'>Newest</li>
          </div>
          <div onClick={(e)=>{this.state.sortBy.clickable?this.expandForm('sortBy'):null}} className='events-page-filter-two-arrow'>V</div>
        </div>
        <div className='events-page-filter-three'>
          <div className='events-page-filter-three-select'>
            <div className='events-page-filter-three-select-name'>{this.state.distance.value? this.state.distance.value:'Distance'}</div>
          </div>
          <div className='events-page-filter-three-options'>
            <li onClick={()=>{this.updateForm('within 10 miles', 'distance')}} className='events-page-filter-three-option-one'>within 10 Miles</li>
            <li onClick={()=>{this.updateForm('within 25 miles', 'distance')}} className='events-page-filter-three-option-two'>within 25 Miles</li>
            <li onClick={()=>{this.updateForm('within 50 miles', 'distance')}} className='events-page-filter-three-option-three'>within 50 Miles</li>
            <li onClick={()=>{this.updateForm('within 100 miles', 'distance')}} className='events-page-filter-three-option-four'>within 100 Miles</li>
            <li onClick={()=>{this.updateForm('within 100+ miles', 'distance')}} className='events-page-filter-three-option-five'>within 100+ Miles</li>
          </div>
          <div onClick={(e)=>{this.state.distance.clickable?this.expandForm('distance'):null}} className='events-page-filter-three-arrow'>V</div>
        </div>
        <div className='events-page-filter-four'>
          <div className='events-page-filter-four-select'>
            <div className='events-page-filter-four-select-name'>{this.state.date.value? this.state.date.value:'Date'}</div>
          </div>
          <div className='events-page-filter-four-options'>
            <li onClick={()=>{this.updateForm('Today', 'date')}} className='events-page-filter-four-option-one'>Today</li>
            <li onClick={()=>{this.updateForm('This Week', 'date')}} className='events-page-filter-four-option-two'>This Week</li>
            <li onClick={()=>{this.updateForm('Last Week', 'date')}} className='events-page-filter-four-option-three'>Last Week</li>
            <li onClick={()=>{this.updateForm('This Month', 'date')}} className='events-page-filter-four-option-four'>This Month</li>
            <li onClick={()=>{this.updateForm('Last Month', 'date')}} className='events-page-filter-four-option-five'>Last Month</li>
            <li onClick={()=>{this.updateForm('This Year', 'date')}} className='events-page-filter-four-option-six'>This Year</li>
          </div>
          <div onClick={(e)=>{this.state.date.clickable?this.expandForm('date'):null}} className='events-page-filter-three-arrow'>V</div>
        </div>
      </div>
      <div>
        {events}
        {button}
      </div>
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
   getEvents:getEvents
})(EventsPage);