import React, {Component} from 'react';
import {TimelineMax, Power4, Power0} from 'greensock';
import {connect} from 'react-redux';
import {getPosts} from '../../reducers/generalReducer';
import moment from 'moment';
import '../../styles/BlogPage.css';
import DownArrow from '../../styles/images/events/down_arrow.svg';

class BlogPage extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      numberOfPosts: 13,
      resetButton: true,
    }
  } 
  componentDidMount() {
    let wtl = new TimelineMax();
    wtl.to(window, .5, {scrollTo:0, ease:Power4.easeOut})
    this.loadPosts();
    let tl = new TimelineMax({
      repeat: -1,
      repeatDelay:0,
    })
    tl.from('.blogs-page-down-arrow', 1, {bottom: 30, height: '25px', opacity: 0, ease: Power4.easeOut})
      .from('.blogs-page-down-arrow2', 1, {bottom: 20, ease:Power0.easeOut}, '-=1')
      .from('.blogs-page-down-arrow3', 1, {bottom: 10, height: '50px', opacity:.7, ease:Power4.easeOut}, '-=1')
  }
  componentWillReceiveProps() {
    this.loadPosts();
  }
  loadPosts() {
    if (this.props && this.props.getPosts && (this.props.general.posts.length < 1) ){
      this.props.getPosts();
    }
  }
  
  mouseEnter(e) {
    let tl = new TimelineMax();
    if (e.target.className==='blog-page-blog-details')
    tl.to(e.target, 1, {height: '280px', ease:Power4.easeOut})
  }

  mouseLeave(e) {
    let tl = new TimelineMax();
    if(e.target.className==='blog-page-blog-details')
      tl.to(e.target, 1, {height: '100px', ease:Power4.easeOut})
  }

  render() {
    let button;
    console.log("BLOGS")
    console.log(this.props.general.posts);
    let blogs = 'loading blogs...';
    if (this.props && this.props.general.posts ){
      this.props.general.posts.sort((a, b)=>{
        let date1 = new Date(a.post_date);
        let date2 = new Date(b.post_date);
        return (date2 - date1);
      })
      blogs = this.props.general.posts.map((e, i)=>{
        let d = moment.utc(e.post_date)
        if (i === 0) {
          return (
            <section className='blog-page-blog-container-large' key={i}>
            <div className='blog-page-blog-image'>
              <div className='blog-page-blog-details-large'>
                <div className='blog-page-blog-title'>
                  {e.post_title}
                </div>
                <div className='blog-page-blog-date'>
                  {d.format('MMMM DD, YYYY')}
                </div>
                <div className='blog-page-blog-text'>
                  {300 > e.post_text.length? e.post_text : (e.post_text).substring(0, 300) + '...'}
                </div>
                <div className='blog-page-blog-button'>
                  Read More
                </div>
              </div>
            </div>
          </section>
          )
        }
        return i<(this.state.numberOfPosts)?(
          <section className='blog-page-blog-container' key={i}>
            <div className='blog-page-blog-image'>
              <div onMouseEnter={(e)=>{this.mouseEnter(e)}} onMouseLeave={(e)=>{this.mouseLeave(e)}} className='blog-page-blog-details'>
                <div className='blog-page-blog-title'>
                  {e.post_title}
                </div>
                <div className='blog-page-blog-date'>
                  {d.format('MMMM DD, YYYY')}
                </div>
                <div className='blog-page-blog-text'>
                  {100 > e.post_text.length? e.post_text : (e.post_text).substring(0, 100) + '...'}
                </div>
                <div className='blog-page-blog-button'>
                  Read More
                </div>
              </div>
            </div>
          </section>
        ) : null
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
      console.log(blogs.length)
      button = blogs.length >= this.state.numberOfPosts? 
      (
        <section className='blogs-page-scroll' onClick={(e)=>{this.setState({numberOfPosts: this.state.numberOfPosts + 12, resetButton: true})}}>
          <div className='blogs-page-show-more'>
            Show more
          </div>
          <img className='blogs-page-down-arrow' style={arrowStyle} src={DownArrow} alt="Down Arrow"/>
          <img className='blogs-page-down-arrow2' style={arrowStyle2} src={DownArrow} alt="Down Arrow"/>
          <img className='blogs-page-down-arrow3' style={arrowStyle3} src={DownArrow} alt="Down Arrow"/>
        </section>) :
      (null)
      
      if(this.state.resetButton) {
        let rtl = new TimelineMax()
        rtl.to('.blogs-page-down-arrow', 0, {bottom: 0, height: '50px', opacity: .7})
          .to('.blogs-page-down-arrow2', 0, {bottom: 0})
          .to('.blogs-page-down-arrow3', 0, {bottom:-20, height:'25px', opacity: 0})
          .to('.blogs-page-show-more', 0, {color: 'black', ease: Power0.easeOut})
      }
      let tl = new TimelineMax({
        repeat: -1,
        repeatDelay:0,
      })
      tl.from('.blogs-page-down-arrow', 1, {bottom: 30, height: '25px', opacity: 0, ease: Power4.easeOut})
        .from('.blogs-page-down-arrow2', 1, {bottom: 24, ease:Power0.easeOut}, '-=1')
        .from('.blogs-page-down-arrow3', 1, {bottom: 10, height: '50px', opacity:.7, ease:Power4.easeOut}, '-=1')
      let stl = new TimelineMax({
        repeat: -1,
        yoyo: true
      });
      stl.from('.blogs-page-show-more', 1, {color:'#4E4E4E', ease: Power0.easeOut})  
    }
    
    return (
      <section className='blog-page-section'>
        <div className='blog-page-blog-section'>
          {blogs}
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
  getPosts:getPosts
})(BlogPage);