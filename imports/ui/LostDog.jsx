import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import RequestForm from './requestForm.jsx';
import Dropzone from 'react-dropzone';
import {fs} from "fs"
import swal from "sweetalert"
import 'sweetalert/dist/sweetalert.css';
import DogEntry from './DogEntry.jsx'
import {createContainer} from 'meteor/react-meteor-data';
import {Dogdata} from "/imports/api/data.js"
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import FoundDog from './FoundDog.jsx'
// Import crucial modules and styling

export default class LostDog extends Component {
    // Export the LostDog component for use in other files
    constructor() {
        super()
        this.state = {
            name: "",
            imageProcessed: false,
            dogCharacteristics: ""
        }
        // Initalizes state with name as an empty string
        this.onDrop = this.onDrop.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeGender = this.handleChangeGender.bind(this)
        // Bind context of this to methods
    }
    onDrop(files) {
        // Creates the onDrop method for the Dropzone component, loads a 'files' parameter
        var reader = new FileReader();
        // Create a new FileReader to read the image
        let dog = this.state
        // Set the value of dog as the state of the LostDog
        let dogGender = null
        // Create variable dogGender
        if (dog.gender == "female") {
            dogGender = "her!"
        } else {
            dogGender = "him!"
        }
        // Depending on the gender specified, assign dogGender to either be "her!" or "him!"
        reader.addEventListener("load", () => {
            // Create a event listener on the reader to retrieve the data once it finishes converting the image to base64
            Meteor.call("searchDog", reader.result, dog, (err, data) => {
                // Call the searchDog method on the server side and pass it the base64 converted image and dog object
                if (err) {
                    // If the server responds with an error, render a error alert on the screen
                    swal("Oops...", "Something went wrong!", "error");
                } else {
                  console.log(data)
                    let formattedData = data[1].responses[0].labelAnnotations.map((element, currentValue) => {
                        let capitalizedLabel = element.description.slice(0, 1).toUpperCase() + element.description.slice(1, 300000)
                        // Capitalizes first letter of the label
                        let properPercentage = element.score.toFixed(2) * 100 + "%"
                        // Rounds confidence level to 2 decimal places and converts to proper properPercentage
                        return `${capitalizedLabel}: ${properPercentage} \n`
                        // Returns a string in the form '(Capitalized Label): (Percentage)' and adds a new line escape character
                    })
                    // Format each of the label results in the form: (Label): (Confidence Level), e.g 'Terrier: 94%''
                    let displayMessage = `We've stored ${dog.name} in our database and we'll let you know if we find ${dogGender} \n\n ${formattedData.join("")}`
                    // Craft a display message to the user with the dog name and gender
                    swal({
                        title: "Success!",
                        text: displayMessage,
                        type: "success"
                    }, () => {
                      var DogChar = data[1].responses[0].labelAnnotations.map((element) => {return element.description})
                      this.setState({dogCharacteristics: DogChar})
                      this.setState({imageProcessed: true})
                    })
                    // Render a success alert with the data on the screen
                }
            })

        }, false)
        reader.readAsDataURL(files[0])
        // Tells the FileReader to convert the image into a base64 string

    }
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
    // Method to handle changing name value in LostDog
    handleChangeGender(event) {
        this.setState({gender: event.target.value});
    }
    // Method to handle changing gender value in LostDog
    render() {
        if (this.state.imageProcessed) {
          return <FoundDog dogChar={this.state.dogCharacteristics}></FoundDog>
        }
        return (
            <div id="lostDogDiv">
                <h1 id="title">
                    Upload your dog
                </h1>
                <form>
                    <input id="inputName" type="text" placeholder="Enter your Dogs name" onChange={this.handleChangeName}/> {/* Input box for Dog name */}
                    <br></br>
                    <input type="radio" name="gender" value="male" onChange={this.handleChangeGender}/>
                    Male
                    <br></br>
                    <input type="radio" name="gender" value="female" onChange={this.handleChangeGender}/>
                    Female {/* Radio buttons for Dog gender */}
                </form>
                <Dropzone id="dropzone" onDrop={this.onDrop}>
                    {/* Render a react Dropzone element, when a image is dropped into it, run the onDrop method on the lostDog component */}
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </div>
        )
    }
}
