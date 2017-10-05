import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment,getComments,getPostDetail,getPosts} from '../../reducers/generalReducer';

import 'font-awesome/css/font-awesome.min.css';
import '../../styles/BlogDetails.css';
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
/* not yet used
const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;
*/

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const EmailIcon = generateShareIcon('email');


const moment = require('moment');
const frontenv = require('../../frontenv.js');

class BlogDetails extends Component{

constructor(props){
    super(props);
    this.state={loaded:false};
    this.blogdetails=this.blogdetails.bind(this);
    this.addcomment=this.addcomment.bind(this);
}


 addcomment(){
     console.log("CALLING addcomments");
     if (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id && this.refs.addcomment_text.value){
        let commentText = this.refs.addcomment_text.value;
        this.refs.addcomment_text.value='';
        let comment={
            text:commentText,
            users_id: this.props.general.user.users_id,
            post_id:this.props.match.params.blogId
        }
        console.log(this.props);
        console.log("adding comment ")
        console.log(comment);
        this.props.addComment(comment);
     }
 }


blogdetails()
{

console.log(this.props);
  if (this.props && this.props.getPostDetail && this.props.general ) {
    

      if (  this.props.match.params.blogId && (!this.props.general.postDetail || this.props.general.postDetail.post_id !== this.props.match.params.blogId)){

          this.props.getPostDetail(this.props.match.params.blogId);
      }
      if (this.props.getPosts && (!this.props.general || !this.props.general.posts || this.props.general.posts.length <1)){
          console.log("Calling getPosts")
          this.props.getPosts();

      }
    }

    console.log("debug1 - getcomments")
    console.log(this);
if (this.props && this.props.general && this.props.general.comments.length <1  && this.props.match && this.props.match.params && this.props.match.params.blogId){
       console.log("debug2")
       if (!this.state.loaded){
         console.log("debug3")
          if (this.props.match.params.blogId){
              console.log("GET COMMENTS FOR " + this.props.match.params.blogId)
            this.setState({loaded:true});
              this.props.getComments(this.props.match.params.blogId);
          }
  
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
    let shareUrl='';
    if (this.props && this.props.match && this.props.match.params && this.props.match.params.blogId)
       shareUrl=`${frontenv.REACT_APP_HOST}/event/` + this.props.match.params.blogId;

let comments='';
if (this.props && this.props.general && this.props.general.comments){
    comments = this.props.general.comments.map((comment,index)=>
    {
        let date = moment.utc(comment.date).format("MMMM d, YYYY h:mm A");
    
       return (
        <div className="comment" key={index}>
            <div className="commentHeader">
                <div className="commentUser">
                    {comment.username}
                </div>
                <div className="commentDate">
                    {date}
                </div>
            </div>
            <div className="commentText">
                {comment.text}
            </div>
        </div>



       )
    })
}


let leavecomment='';
if (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id){
    leavecomment=(
           <div className="addComment">
           <div className="addCommentHeader">
                 Leave a Comment
             </div>
         <textarea placeholder="leave a comment" rows="5" columns="50" ref="addcomment_text" >
             </textarea>     
       
         <button className="redButton" onClick={this.addcomment}>Post</button>
         </div>
    );
}

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
let mainImageStyle={
    backgroundColor:"lightblue"
};
if (this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.main_image_ref){
    let mainImageStyle={
                   backgroundImage: 'url("' + this.props.general.postDetail.main_image_ref+ '")',
                  backgroundRepeat:"no-repeat",
                  backgroundSize:"cover"
    }
}



return(
<div className="blogDetails">
 <div className="blogLeftSide">
     
   <div className="blogTitle" style={mainImageStyle}>
       <div className="blogTitleText">{title}</div>
       </div>
   <div className="blogAuthorFooter">
      <div className="blogAuthor">{author}</div>
      <div className="blogDate">{date}</div>
      <div className="blogSharing">
               <div className="blogFacebook">
           
         <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <FacebookIcon
              size={16}
              round />
          </FacebookShareButton>
              </div>
              <div className='blogTwitter'>
               <TwitterShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <TwitterIcon
              size={16}
              round />

          </TwitterShareButton>

              </div>
              <div className='blogGooglePlus'>
                <GooglePlusShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <GooglePlusIcon
              size={16}
              round />

          </GooglePlusShareButton>
                </div>
              <div className='blogEmail'>
              <EmailShareButton
             url={shareUrl}
            subject={title}
            body="body"
            className="share-button">
            <EmailIcon
              size={16}
              round />

          </EmailShareButton>
              </div>
          </div>
          
   </div>
      <div className="blogText">{text}</div>
      <div classname="blogComments">
       
       {comments}
       {leavecomment}
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
    getComments:getComments,
    addComment:addComment,
    getPosts:getPosts
})(BlogDetails);
