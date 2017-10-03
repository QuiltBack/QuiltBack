import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPostDetail,getPosts} from '../../reducers/generalReducer';
import Comments from './Comments';
import 'font-awesome/css/font-awesome.min.css';
import './ApiBlogDetail.css';
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


const moment = require('moment');

class BlogDetail extends Component{



blogdetails()
{

console.log(this.props);
  if (this.props && this.props.getPostDetail && this.props.general ) {
    

      if (  this.props.match.params.postId && (!this.props.general.postDetail || this.props.general.postDetail.post_id != this.props.match.params.postId)){

          this.props.getPostDetail(this.props.match.params.postId);
      }
      if (this.props.getPosts && (!this.props.general || !this.props.general.posts || this.props.general.posts.length <1)){
          console.log("Calling getPosts")
          this.props.getPosts();

      }
    }
}

componentDidMount() {
   
    this.blogdetails();
}
componentWillReceiveProps(ownProps) {
 
 
    this.blogdetails();
}







render(){
    console.log("API BLOG DETAIL PAGE")
    let recentposts='';
    if (this.props && this.props.general && this.props.general.posts){
        recentposts = this.props.general.posts.sort((a,b)=>{
            return (new Date(b.post_date) - new Date(a.post_date));
        }).map((post,index)=>{
          let date=moment.utc(post.post_date).format("MMMM D, YYYY");
          let title=(post.post_title.length<20)?post.post_title : post.post_title.substring(0, 20) + '...';
         if (index >10)
          return '';
          return (
              <div className="blogRecentPost" key={index}>
                  <div className="blogRecentPostImage" style={{
                      backgroundImage: "url(" + post.image_url + ")",
                      backgroundSize: "cover",
                      backgroundRepeat:"no-repeat"
                  }}>
                  </div>
                  <div className="blogRecentPostInfo">
                      <div className="blogRecentPostDate">
                     {date}
                     </div>
                     <div className="">
                         {title}
                         </div>
                   

                </div>               
                  </div>)

        })

    }


let title=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_title)?this.props.general.postDetail.post_title:'';
let text=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_text)?this.props.general.postDetail.post_text:'';

let date=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_date)?moment.utc(this.props.general.postDetail.post_date).format("MMMM D, YYYY"):'';
let author=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_author)?this.props.general.postDetail.post_author:'';
let postid=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_id)?this.props.general.postDetail.post_id:'';

return(
<div className="blogDetails">
 <div className="blogLeftSide">
   <div className="blogTitle">{title}</div>
   <div className="blogAuthorFooter">
      <div className="blogAuthor">{author}</div>
      <div className="blogDate">{date}</div>
   </div>
      <div className="blogText">{text}</div>
      <div classname="blogComments">
       
       <Comments postid={postid} />
      </div>
   </div>
<div className="blogRightSide">
    <h1>Recent Posts</h1>
    {recentposts}
</div>
    
    
</div>
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
   
    getPostDetail:getPostDetail,
    getPosts:getPosts
})(BlogDetail);
