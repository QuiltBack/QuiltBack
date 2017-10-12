import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsersPosts} from '../../reducers/generalReducer';
import {Link} from 'react-router-dom';
import moment from 'moment';
import ShareIcon from '../../styles/images/home/Share_Image.svg';
import '../../styles/UserPosts.css';

class UserPosts extends Component {
  constructor() {
    super();
    this.state = {
      loadedPosts:false,
      numberOfPosts:6,
    }
  }
  componentDidMount() {
    this.fillPage();
  }
  componentWillReceiveProps() {
    this.fillPage();
  }
  fillPage() {
    if (this.props.general && this.props.general.user && !this.state.loadedPosts) {
      this.setState({
        loadedPosts:true
      })
      this.props.getUsersPosts(this.props.general.user.users_id);
    }
  }
  render() {
    let userPostsList = (<section className='user-posts-empty'>
    <div className='user-posts-container'>
      <img className='user-posts-promote-icon' src={ShareIcon} alt="Promote"/> 
      <div className='user-posts-text'>No Posts Found</div> 
      <Link to={'/createblog/new'} className='user-posts-button'>Add New Post</Link> 
    </div>
  </section>)
    if (this.props.general && this.props.general.userPosts && this.props.general.userPosts.length > 0) {
      let props = this.props;
      userPostsList = props.general.userPosts.map((e, i)=>{
        console.log(e)
        let d1 = moment.utc(e.date);
        return i<(this.state.numberOfPosts)? ( 
          <section className='user-posts-filled'>
            <div className="user-posts-posts"   key={i}>
              <div className="user-posts-banner"/>
              <div className="user-posts-info">
                <div className='user-posts-date'>{d1.format("MMMM DD, YYYY ")}</div>
                <div className='user-posts-title-filled'>{ 40 > e.post_title.length? 
                  e.post_title : (e.post_title).substring(0, 40) + '...'}
                </div>
                <div className='user-posts-owner'>hosted by {props.general.user.first_name + ' '} {props.general.user.last_name}</div>
              </div>
            </div>
            <div className='user-posts-view-container'>
              <Link to={'/blog/' + e.post_id} className='user-posts-view-view'>View</Link>
              <div className='user-posts-view-delete'>Delete</div>
            </div>
          </section>
        ) : null
      })
    }
    return (
      <section className='user-posts-section'>
        <div className='user-posts-title'>MY POSTS</div>
        <div className='user-posts-filled-container'>{userPostsList}</div>
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
  getUsersPosts: getUsersPosts,
})(UserPosts);
