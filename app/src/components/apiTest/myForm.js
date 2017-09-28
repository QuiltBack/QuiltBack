import React, {Component} from 'react';
import {bindAll} from 'lodash';
import axios from "axios";




const api = axios.create({
        withCredentials:true
});
class myForm extends Component {

  constructor(props) {
      super(props);
    this.state = {
      data_uri: null,
      processing: false
    }

    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });
console.log("file data?");
console.log(this.state.data_uri);
console.log(this.state.filename);
console.log(this.state.filetype);
console.log("sending data");
   let pic={
            imageBody:this.state.data_uri,
            imageName: this.state.filename,
            imageExtension: this.state.filetype
    
     
   }
   console.log("pic");
   console.log(pic);
   axios.post('http://localhost:3001/api/upload',{pic:pic})
    .then(function(data){
        console.log("s3 return");
        console.log(data);
      _this.setState({
        processing: false,
        uploaded_uri: data.uri
      });
    });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <img className='image-preview' src={this.state.uploaded_uri} />
          <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Processing image, hang tight";
    }

    return (
      <div className='row'>
        <div className='col-sm-12'>
          <label>Upload an image</label>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
        </div>
      </div>
    );
  }
}

export default myForm;