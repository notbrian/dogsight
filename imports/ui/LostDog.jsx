import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import RequestForm from './requestForm.jsx';
import Dropzone from 'react-dropzone';
import { fs } from "fs"
import swal from "sweetalert"
import 'sweetalert/dist/sweetalert.css';

// Import crucial modules

export default class LostDog extends Component {
  // Export the LostDog component for use in other files
  onDrop(files) {
    // Creates the onDrop method for the Dropzone component, loads a 'files' parameter
    var reader  = new FileReader();
    // Create a new FileReader to read the image
    reader.addEventListener("load", function () {
    // Create a event listener on the reader to retrieve the data once it finishes converting the image to base64
      Meteor.call("searchDog", reader.result, (err, data) => {
        // Call the searchDog method on the server side and pass it the base64 converted image
      if (err) {
        // If the server responds with an error, render a error alert on the screen
        swal("Oops...", "Something went wrong!", "error");
      }
      else {
        let formattedData = data[0].map((element, currentValue) => {
          return ` ${currentValue + 1}: ${element} `
        })
        // Format each of the label results in the form: (number in list): (element), e.g 1. Terrier , 2. Dog
        swal("Success!", formattedData, "success")
        // Render a success alert with the data on the screen
      }
    })

  }, false)
    reader.readAsDataURL(files[0])
    // Tells the FileReader to convert the image into a base64 string

    }

  render() {
    return(
      <div>
        <h1 id="title"> Lost a dog page </h1>
        <Dropzone id="dropzone" onDrop={this.onDrop}>
          // Render a react Dropzone element, when a image is dropped into it, run the onDrop method on the lostDog component
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    )
  }
}
