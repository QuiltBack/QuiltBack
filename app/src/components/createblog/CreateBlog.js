import React, {Component} from 'react';


import Dropzone from 'react-dropzone';

import axios from "axios";


import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import '../../styles/CreateBlog.css';

const frontenv = require('../../frontenv.js');

const {Quill, Mixin,Toolbar } = ReactQuill;
/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
const CustomButton =  (<span className="octicon octicon-star" />)

/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
var myQuill=null;
var myEditor;

function Dummy () {
  if (!myQuill)
     myQuill = this.quill; 
}


//demo
function insertStar (ref) {
      const cursorPosition = myQuill.getSelection().index
      const range = myQuill.getSelection();
      myQuill.editor.insertEmbed(range.index, 'image', ref);

}

function onSpeechResult(event){
 let text = event.results[event.results.length -1][0].transcript;
          
           const cursorPosition = myQuill.getSelection().index
           myQuill.insertText(cursorPosition, text)
           myQuill.setSelection(cursorPosition + text.length)
           
}



//end demo

/*
 * Custom toolbar component including insertStar button and dropdowns
 */


export default class CreateBlog extends Component{
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
    super(props)
    this.state = { 
        text: '',
        quillImage:'',
        uploaded_uri:'',
        recognition:null,
        listening:false
    } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  
   
   this.handleFile = this.handleFile.bind(this);
   this.insertImage = this.insertImage.bind(this);
   this.toggleListening = this.toggleListening.bind(this);
   this.saveBlog=this.saveBlog.bind(this);
   
  }


saveBlog(){
  console.log("SAVING? blog")
}

// START INSERTIMAGE

insertImage(ref){
   let  str = this.state.text;
   let imageElement=`<img src="${ref}" />`;
   insertStar(ref);
  
}

// END insertIMAGE



   handleChange(value) {
 
    this.setState({ text: value })
  }

 componentDidMount(){
    
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
      recognition.continuous = true;
      recognition.interimResults = true;
      
        this.setState({recognition:recognition});

      recognition.onresult = onSpeechResult;

    } else {
      console.warn('The current browser does not support the SpeechRecognition API.');
    }



  }

     
 }


createRecognition = (SpeechRecognition) => {
  
    const defaults = {
      continuous: true,
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
            
           that.setState({uploaded_uri:data.data.Location})
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
   

if (this.state.uploaded_uri) {
  
     imageStyle={
         height:"400px",
         backgroundImage:"url('" + this.state.uploaded_uri + "')",
         backgroundRepeat:"no-repeat",
         backgroundSize:"100% 100%"
       }
    
    }

    return (
        <div className="createBlog" >

<div className="CreateBlogMainImageContainer" onClick={this.handleFile}>
   
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"800px",height:"100px"}}
          onDrop={this.handleFile}>
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
     <input type="text" ref="blogHeader" size="80"/>
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







