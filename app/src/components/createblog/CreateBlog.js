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
function insertImageDummy () {
    console.log("InsertImageDummy");
    console.log(this.quill);
 myQuill = this.quill;
 if (!myEditor)
   myEditor=this.quill.editor;

 console.log("EDITOR")
 console.log(myEditor);
 console.log("AFTER");
  
}
//demo
function insertStar (ref) {
  const cursorPosition = myQuill.getSelection().index
 myQuill.insertText(cursorPosition, "★")
 myQuill.setSelection(cursorPosition + 1)

      const range = myQuill.getSelection();
      myQuill.editor.insertEmbed(range.index, 'image', ref);

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
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>    
    <button className="ql-insertImage">
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"10px",height:"10px"}}
          onDrop={(e)=>this.handleFile(e,this.insertImage)}
        >
           <span style={{textAlign:"center",color:"red"}}>Image</span>
    </Dropzone>
    </button>
  </div>
)


 constructor(props) {
    super(props)
    this.state = { 
        text: '',
        quillImage:'',
        uploaded_uri:'' 
    } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  
   
   this.handleFile = this.handleFile.bind(this);
   this.insertImage = this.insertImage.bind(this);
   
  }




// START INSERTIMAGE


insertImage(ref){
    console.log("insertImage " +ref);
   let  str = this.state.text;
   
  let imageElement=`<img src="${ref}" />`;
  console.log("STR")
 console.log(str);
insertStar(ref);
     // const range = myEditor.getSelection();
     // myEditor.insertEmbed(range.index, 'image', imageElement);
  
}



// END insertIMAGE



   handleChange(value) {
       console.log(value);
    this.setState({ text: value })
  }

 componentDidMount(){
     console.log("component");
     
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
      console.log("text")
      console.log(this.state.text);

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
   
       
        <div 
        style={
            {position:"relative"
            ,zIndex:7
            ,top:"100px"
            ,width:"500px"
            ,height:"500px"
            ,border:"1px solid blue"
            }} >

          <div className="text-editor">
              <span>toolbar</span>
        <this.CustomToolbar />
        <span>end</span>
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
      "insertImage": insertImageDummy,
    }
  }
}







