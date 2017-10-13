import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAdminPosts} from '../../reducers/generalReducer';
import moment from 'moment';
import '../../styles/AdminPosts.css';

class AdminPosts extends Component {
    constructor() {
        super();
        this.state = {
          loadedPosts:false,
        }
      }
    componentDidMount() {
        this.getPosts();
      }
      componentWillReceiveProps() {
        this.getPosts();
      }
      getPosts() {
        let interval = setInterval(()=>{
          if (this.props.general && this.props.general.user.user_type==='Admin' && !this.state.loadedPosts) {
            this.setState({
              loadedPosts: true,
            })
            console.log('getting posts')
            this.props.getAdminPosts()
            clearInterval(interval);
          } else {
            clearInterval(interval);
          }
        },100)
      }
      render() {
        let posts;
        if (this.props.general && this.props.general.adminPosts) {
          posts = this.props.general.adminPosts.map((e, i)=>{
            console.log(e)
            let d1 = moment.utc(e.post_date);
            return (
              <div className='users-border' key={i}>
                <div className='users-author'>{d1.format("MMMM DD, YYYY, h A")}</div>
                <div className='users-email'>{e.post_title}</div>
                <div className='users-role'>{e.flagged? 'yes' : 'no'}</div>
                <div className='users-post'>{e.views}</div>
              </div>
            )
          })
        }
    return (
      <section className='users-section'>
        <div className='users-tab'>
          <div className='users-tab-pending'>All</div>
          <div className='users-tab-approved'>MOST VIEWS</div>
          <div className='users-tab-declined'>ALPHABETICAL</div>
        </div>
        <div className='users-title-container'>
          <div className='users-title-username'>DATE</div>
          <div className='users-title-email'>POST</div>
          <div className='users-title-role'>FLAGGED</div>
          <div className='users-title-post'>VIEWS</div>
        </div>
        {posts}
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
   getAdminPosts: getAdminPosts,
  })(AdminPosts);