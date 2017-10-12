import React, {Component} from 'react';


import Dropzone from 'react-dropzone';

import axios from "axios";
import {connect} from 'react-redux';
import {addPost,getPostDetail} from '../../reducers/generalReducer';

import ReactQuill from 'react-quill';
import   'react-quill/dist/quill.snow.css';

import '../../styles/CreateBlog.css';

const frontenv = require('../../frontenv.js');

//const {Quill, Mixin,Toolbar } = ReactQuill;
/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
//const CustomButton =  (<span className="octicon octicon-star" />)

/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
var myQuill=null;
var speechRecognitionStart='';

function Dummy () {
  if (!myQuill)
     myQuill = this.quill; 
    console.log(this);
}


//demo
function insertStar (ref) {
      const range = myQuill.getSelection();
      myQuill.editor.insertEmbed(range.index, 'image', ref);

}

function onSpeechResult(event){
    
    console.log("DEBUG");
    console.log(event);
    console.log("global speechRecognitionStart")
    console.log(speechRecognitionStart);
    console.log("end  global")
    console.log("END")
    let text='';
    for (let i=0;i<event.results.length;i++){
      text += event.results[i][0].transcript;
    }
         
          myQuill.setContents(speechRecognitionStart);
 
         let len = myQuill.getLength();
       
         myQuill.editor.insertText(len, text);
      
         


}




//end demo

/*
 * Custom toolbar component including insertStar button and dropdowns
 */


class CreateBlog extends Component{
  SpeechOnEnd(event){
    console.log("SpeechOnEnd");
   
    speechRecognitionStart=  myQuill.getContents();
    if (this.state.listening)
     this.state.recognition.start();
    
}
  
 CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>    
    <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
       <button className="ql-link" value="bullet"></button>
    <button style={{position:"relative",width:"50px"}} className="ql-image">
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{}}
          onDrop={(e)=>this.handleFile(e,this.insertImage)}
        >
           <span style={{textAlign:"center",position:"absolute",top:"50%",left:"50%", transform: "translate(-50%, -50%)"}}>Image</span>
    </Dropzone>
    </button>
   {(this.state.listening)?(
   <button onClick={this.toggleListening} className="ql-toggleMicrophone">
     <i style={{fontSize:"2rem",color:"red"}} className="fa fa-microphone"></i></button>
   ):(
     <button onClick={this.toggleListening} className="ql-toggleMicrophone">
     <i style={{fontSize:"2rem",color:"black"}} className="fa fa-microphone"></i></button>
   )}
   <button onClick={this.saveBlog} className="ql-saveBlog">Save</button>
  
  </div>
)


 constructor(props) {
   console.log("CONSTRUCTOR - createBlog")
    super(props)
    this.state = { 
        text: '',
        quillImage:'',
        editorHtml:'',
        uploaded_uri:'',
        recognition:null,
        listening:false,
        loaded:false,
        header:'',
        mainImage:''
    } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  
   
   this.handleFile = this.handleFile.bind(this);
   this.insertImage = this.insertImage.bind(this);
   this.toggleListening = this.toggleListening.bind(this);
   this.saveBlog=this.saveBlog.bind(this);
   this.loadBlogDetails=this.loadBlogDetails.bind(this);
   this.SpeechOnEnd = this.SpeechOnEnd.bind(this);
   this.addMainImage = this.addMainImage.bind(this);
   this.loadBlogDetails = this.loadBlogDetails.bind(this);
   
 
  }
  addMainImage(newImageRef){
    console.log("addign main image " +  newImageRef);
    this.setState({mainImage:newImageRef});
  }



saveBlog(){
  console.log("SAVING? blog")
    
    console.log(this);
   if (! (this.props && this.props.general && this.props.general.user && this.props.general.user.users_id)){
     //access denied - not logged in.
     console.log("security error 1")
     return;
   }
   // CHANGE THIS FOR PRODUCTION (currently allowing anyone to edit.)
   if (false && this.props && this.props.general && this.props.general.postDetail && this.props.user && this.props.user.users_id 
   && this.props.general.postDetail && this.props.general.postDetail.users_id !==  this.props.general.user.users_id)
   {
     // access denied not the same user
     console.log("security error 2")
     return;
   }
   console.log("saving blog - debug 1")
   /*
     let {post_text,post_owner_id,post_title,post_id,imageref} = req.body.post;
     */
    let post_id = "New";
    
    let content = myQuill.root.innerHTML;
    console.log("content is")
    console.log(content);
    console.log(myQuill);
    console.log(myQuill.editor);
    
    if (this.props && this.props.general && this.props.general.postDetail)
      post_id= this.props.general.postDetail.post_id;

      let mypost={
         post_id : post_id,
         post_text: content,
         users_id:this.props.general.user.users_id,
         post_title:this.refs.blogHeader.value,
         imageref:this.state.mainImage
         

      }
      console.log("mypost");
      console.log(mypost);
     
      console.log("just before addPost")
      if (this.props && this.props.addPost){
         console.log("ADDING POST ")
         this.props.addPost(mypost);
      }
}

// START INSERTIMAGE

insertImage(ref){
   //let imageElement=`<img src="${ref}" width="100%" />`;
   insertStar(ref);
  
}

// END insertIMAGE



   handleChange(content, delta, source, editor) {
 
    this.setState({ text:content,editorHtml: editor.getContents() })
  }


loadBlogDetails(props)
{
console.log("loadBlogDetails");
console.log(props);
  if (props && props.getPostDetail && props.general ) {
      if (  props.match.params.blogId && !isNaN(props.match.params.blogId)  && (!props.general.postDetail || props.general.postDetail.post_id !== +props.match.params.blogId)){
          props.getPostDetail(props.match.params.blogId);
      }
    }

    if (props && props.general && props.general.postDetail && !this.state.loaded){
      console.log("LOADING " + props.general.postDetail.post_text);
       this.setState({loaded:true,text:props.general.postDetail.post_text,header:props.general.postDetail.post_title})
  }

   if(props && props.general && props.general.postDetail && props.general.postDetail.imageref && !this.state.mainImage){
    this.setState({mainImage:props.general.postDetail.imageref});
  }
}



componentWillReceiveProps(newProps){
  this.loadBlogDetails(newProps);
  
}
 componentDidMount(){
    
     this.loadBlogDetails(this.props);
     if (!('webkitSpeechRecognition' in window) && ! this.state.recognition) {
 
} else {
     
     const SpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition
      || window.mozSpeechRecognition
      || window.msSpeechRecognition
      || window.oSpeechRecognition;

    

if (SpeechRecognition != null) {

    
      var recognition = this.createRecognition(SpeechRecognition);
      recognition.lang='en-US';  
      
        this.setState({recognition:recognition});
      recognition.onresult = onSpeechResult;
   
  
      recognition.onend = this.SpeechOnEnd;


    } else {
      console.warn('The current browser does not support the SpeechRecognition API.');
    }



  }

     
 }


createRecognition = (SpeechRecognition) => {
  
    const defaults = {
      continuous: false,
      interimResults: false,
      lang: 'en-US'
    }

    const options = Object.assign({}, defaults, this.props)

    let recognition = new SpeechRecognition()

    recognition.continuous = options.continuous
    recognition.interimResults = options.interimResults
    recognition.lang = options.lang
  

    return recognition
 
 }

 
toggleListening(){
 if (this.state.listening){
     this.state.recognition.stop();
     this.setState({listening:false})

 }
 else{
   
     speechRecognitionStart = this.state.editorHtml;
     this.setState({listening:true});
     this.state.recognition.start();
 }

}




handleFile(fileArray,callback) {
    
    let that=this;
    const reader = new FileReader();
    const file = fileArray[0];

   this.setState({
      processing: true
    });
    
    reader.onload = (upload) => {



let fileType=upload.currentTarget.result.replace(/data:([^;]*);.*$/,"$1");
        let pic={
            imageBody:upload.currentTarget.result,
            imageName: file.name,
            imageExtension: fileType
   }


 axios.post(frontenv.BACKEND_HOST + '/api/upload',{pic:pic})
    .then(function(data){
       
         if (callback){
            callback(data.data.Location);
         }
       else {
            
           that.setState({mainImage:data.data.Location})
        }

       
    })
    .catch(err=>{
        console.log("UPLOAD ERROR");
        console.log(err);
    })

    };

    reader.readAsDataURL(file);
  }


  render() {
      let imageStyle={};
      console.log("render");
   console.log(this.state.header);

if (this.state.mainImage) {
  
     imageStyle={
         height:"400px",
         backgroundImage:"url('" + this.state.mainImage + "')",
         backgroundRepeat:"no-repeat",
         backgroundSize:"100% 100%"
       }
    
    }
  

    return (
        <div className="createBlog" >

<div className="CreateBlogMainImageContainer" style={imageStyle} onClick={this.handleFile}>
   
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"800px",height:"100px"}}
          
          onDrop={(e)=>this.handleFile(e,this.addMainImage)}
        >
          
          
       <div  style={imageStyle}>
           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           <div>
               
               <span className="CreateBlogAddMainImageText">Add New Item</span>
            
           </div>
           <div><span className="CreateBlogAddMainImageText"><i className="fa fa-camera" style={{fontSize:"1rem"}}   aria-hidden="true"></i></span></div>
         <br/>
       </div>
       </div>
    </Dropzone>
   
     </div> 
   <div className="creeateBlogHeader" >
     <span className="createBlogHeaderLabel">Heading</span>
     <input type="text" defaultValue={this.state.header} ref="blogHeader" size="80"/>
   </div>
       
        <div 
        style={
            {position:"relative"
            ,zIndex:7
            ,paddingTop:"16px"
            ,width:"800px"
            ,minHeight:"500px"
           
            }} >

          <div className="text-editor">
           
        <this.CustomToolbar />
     
        <ReactQuill 
          onChange={this.handleChange} 
          placeholder={this.props.placeholder}
          modules={CreateBlog.modules}
          formats={CreateBlog.formats}
          theme={"snow"} // pass false to use minimal theme
          value={this.state.text}
         
        >
          <div 
            key="editor"                     
            ref="editor"
            className="quill-contents"                     
          />
        </ReactQuill>
      </div>
 
 
        </div>
        <div style={{visibility:"hidden"}}>
            <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"10px",height:"10px"}}
          onDrop={(e)=>this.handleFile(e,this.insertImage)}
        >
           <span style={{textAlign:"center",color:"red"}}>Image</span>
    </Dropzone>
    </div>
        </div>
    );
  }


}
CreateBlog.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color'
]

CreateBlog.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      "insertImage": Dummy,
      "toggleMicrophone" :Dummy,
      "saveBlog" : Dummy,
    }
  }
}






function mapStateToProps(state,ownProps){
    if (ownProps && ownProps.history && !(state && state.history))
      return Object.assign({},state,{history:ownProps.history});
    return state;
}
export default connect(mapStateToProps,{addPost:addPost,getPostDetail:getPostDetail})(CreateBlog);
