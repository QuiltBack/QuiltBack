import React, {Component} from 'react';
import {bindAll} from 'lodash';
import axios from "axios";
import Dropzone from 'react-dropzone';
import './ApiCreateEvent.css';
import 'font-awesome/css/font-awesome.min.css';
class ApiCreateEvent extends Component{

constructor(props) {
      super(props);
   this.state={
       uploaded_uri:''
   };
     bindAll(this, 'handleFile', 'handleSubmit');
}


handleSubmit(fileArray) {
    
    const _this = this;

   

   
  }

handleFile(fileArray) {
    let that=this;
    const reader = new FileReader();
    const file = fileArray[0];
 
   this.setState({
      processing: true
    });
    reader.onload = (upload) => {

console.log(upload);

let fileType=upload.currentTarget.result.replace(/data:([^;]*);.*$/,"$1");
        let pic={
            imageBody:upload.currentTarget.result,
            imageName: file.name,
            imageExtension: fileType
   }

    

  

 axios.post('http://localhost:3001/api/upload',{pic:pic})
    .then(function(data){
        that.setState({uploaded_uri:data.data.Location})
    })
    .catch(err=>{
        console.log("UPLOAD ERROR");
        console.log(err);
    })

    };

    reader.readAsDataURL(file);
  }


render(){
let processing="";
let imageStyle={};
if (this.state.uploaded_uri) {
  
     imageStyle={
         backgroundImage:"url('" + this.state.uploaded_uri + "')",
         backgroundRepeat:"no-repeat",
         backgroundSize:"100% 100%"
       }
    
    }

    
      
    




    return (

    <div className="createEventsPage">
    
    CREATE EVENT
    <div className="ImageUpload" onClick={this.handleSubmit}>
       <Dropzone
        multiple={false}
        accept="image/*"
        style={{width:"50vw",heigth:"300px"}}
          onDrop={this.handleFile}>
       <div className="ImageContainer" style={imageStyle}></div>
    </Dropzone>
     </div>   
    
    
    </div>

    );
}



}
export default ApiCreateEvent;