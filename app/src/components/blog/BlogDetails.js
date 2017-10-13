import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment,getComments,getPostDetail,getPosts} from '../../reducers/generalReducer';
import moment from 'moment';
import 'font-awesome/css/font-awesome.min.css';
import '../../styles/BlogDetails.css';
import {ShareButtons,generateShareIcon} from 'react-share';
const {FacebookShareButton,GooglePlusShareButton,TwitterShareButton,EmailShareButton} = ShareButtons;
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
const frontenv = require('../../frontenv.js');

class BlogDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded:false,
            comment:''
        };
        this.blogdetails = this.blogdetails.bind(this);
        this.addcomment = this.addcomment.bind(this);
    }

    addcomment() {
      
        console.log("CALLING addcomments");
        if (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id && this.refs.addcomment_text.value){
            let commentText = this.refs.addcomment_text.value;
            this.refs.addcomment_text.value='';
            let comment={
                text: commentText,
                users_id: this.props.general.user.users_id,
                post_id: this.props.match.params.blogId
            }
            console.log(this.props);
            console.log("adding comment ")
            console.log(comment);
            this.props.addComment(comment);
              this.setState({comment:''});
        }
    }

    blogdetails() {
        console.log(this.props);
        if (this.props && this.props.getPostDetail && this.props.general ) {
            if (  this.props.match.params.blogId && (!this.props.general.postDetail || this.props.general.postDetail.post_id !== +this.props.match.params.blogId)) {
                this.props.getPostDetail(this.props.match.params.blogId);
            }
            if (this.props.getPosts && this.props.general && !this.props.general.posts ){
                console.log("Calling getPosts")
                this.props.getPosts();
            }
        }
        console.log("debug1 - getcomments")
        console.log(this);
        if (this.props && this.props.general && !this.state.loaded && this.props.match && this.props.match.params && this.props.match.params.blogId){
            console.log("debug2")
            if (!this.state.loaded){
                console.log("debug3")
                if (this.props.match.params.blogId){
                    console.log("GET COMMENTS FOR " + this.props.match.params.blogId)
                    this.setState({
                        loaded:true
                    });
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






    componentDidMount() {
        this.blogdetails();
    }

    componentWillReceiveProps(ownProps) { 
        this.blogdetails();
    }
    handleChange(val) {
        this.setState({
            comment:val
        })
    }
    selectBox() {

    }
    render(){
        let shareUrl='';
        if (this.props && this.props.match && this.props.match.params && this.props.match.params.blogId) {
            shareUrl=`${frontenv.REACT_APP_HOST}/event/` + this.props.match.params.blogId;
        }
        let comments='';
        if (this.props && this.props.general && this.props.general.comments) {
            comments = this.props.general.comments.map((comment,index)=>{
                console.log(comments)
                let date = moment.utc(comment.date).format("MMMM d, YYYY h:mm A");
                return (
                    <section className="blog-details-comment-section" key={index}>
                        <div className="blog-details-comment-top">
                            <div className='blog-details-comment-photo' style={{
                                backgroundImage: 'url("' + this.props.general.comments.imageref+ '")',
                                backgroundRepeat:"no-repeat",
                                backgroundSize:"cover",
                                backgroundPosition: 'center center',
                            }}/>
                            <div className="blog-details-comment-username">
                                {comment.username}
                            </div>
                            <div className="blog-details-comment-date">
                                {date}
                            </div>
                        </div>
                        <div className="blog-details-comment-bottom">
                            <div className='blog-details-comment-triangle'/>
                            <div className='blog-details-comment-text'>
                                {comment.text}
                            </div>
                        </div>
                    </section>
                )
            })
        }
    let leavecomment='';
    if (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id) {
        leavecomment = (
            <div className="addComment">
                <div className="addCommentHeader">Leave a Comment</div>
                <textarea placeholder="leave a comment" rows="5" columns="50" ref="addcomment_text"/>        
                <button className="redButton" onClick={this.addcomment}>Post</button>
            </div>

       )
    }
    let leaveCommentButton=(<button className="blog-details-leave-comment-button-login">Please Log in to Post Comments!</button>);
    let leaveCommentPlaceHolder="Login to leave a comment";
    if (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id) {
        leaveCommentPlaceHolder="leave a comment";
        leaveCommentButton=(<button className="blog-details-leave-comment-button-post" onClick={this.addcomment}>Post</button>)
    };
    let leaveComment = '';
    leaveComment = (
        <section className="blog-details-leave-comment-section">     
            <div className='blog-details-leave-comment-input-show'>
                <textarea onChange={(e)=>this.handleChange(e.target.value)} className='blog-details-leave-comment-input' placeholder={leaveCommentPlaceHolder} ref="addcomment_text"/>
                {this.state.comment}
            </div>     
            {leaveCommentButton} 
        </section>
    );
    console.log("API BLOG DETAIL PAGE")
    let recentposts='';
    if (this.props && this.props.general && this.props.general.posts) {
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
                      backgroundImage: "url(" + post.imageref + ")",
                      backgroundSize: "cover",
                      backgroundRepeat:"no-repeat"
                    }}/>
                    <div className="blogRecentPostInfo">
                        <div className="blogRecentPostDate">
                            {date}
                        </div>
                        <div className="">
                            {title}
                        </div>
                    </div>               
                </div>
            )
        })
    }
    let title=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_title)?this.props.general.postDetail.post_title:'';
    let text=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_text)?this.props.general.postDetail.post_text:'';
    let date=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_date)?moment.utc(this.props.general.postDetail.post_date).format("MMMM D, YYYY"):'';
    let author=(this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.post_author)?this.props.general.postDetail.post_author:'';
    let mainImageStyle={
        backgroundColor:"lightblue"
    };
    if (this.props && this.props.general && this.props.general.postDetail && this.props.general.postDetail.imageref) {
        mainImageStyle = {
            backgroundImage: 'url("' + this.props.general.postDetail.imageref+ '")',
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            backgroundPosition: 'center center',
        }
    }
        return (
            <section className="blog-details-main-section">
                <div className="blog-details-left-side">   
                    <div className='blog-details-left-title-container'>
                        <div className="blog-details-left-image" style={mainImageStyle}>
                            <div className="blog-details-left-title">{title}</div>
                        </div>
                        <div className="blog-details-left-footer">
                            <div className='blog-details-left-footer-author-container'>
                                <div className="blog-details-left-footer-author">{author}</div>
                                <div className="blog-details-left-footer-date">{date}</div>
                            </div>
                            <div className="blog-details-left-footer-social-media">
                                <FacebookShareButton url={shareUrl} quote={title} className="share-button"> 
                                    <FacebookIcon size={40} round />
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl} quote={title} className="share-button"> 
                                    <TwitterIcon size={40} round />
                                </TwitterShareButton>
                                <GooglePlusShareButton url={shareUrl} quote={title} className="share-button">  
                                    <GooglePlusIcon size={40} round />
                                </GooglePlusShareButton>
                                <EmailShareButton url={shareUrl} subject={title} body={`Come read this blog ${shareUrl}`} className="share-button"> 
                                    <EmailIcon size={40} round />
                                </EmailShareButton>
                            </div>
                        </div>
                    </div>
                    <div className="blog-details-blog-text">{text}</div>
                    <div className="blog-details-comment-title">COMMENTS</div>
                    <div className="blog-details-comment-container">
                        {comments}
                    </div>
                    <div className="blog-details-leave-comment-title">LEAVE A COMMENT</div>
                    <div className='blog-details-leave-comment-container'>
                        {leaveComment}
                    </div>
                </div>
                <div className="blog-details-right-side">
                    <h1>Recent Posts</h1>
                    {recentposts}
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
    getPostDetail:getPostDetail,
    getComments:getComments,
    addComment:addComment,
    getPosts:getPosts
})(BlogDetails);
