import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Dogdata} from "/imports/api/data.js"
import DogEntry from './DogEntry.jsx'

class FoundDog extends Component {
  constructor() {
    super()
    this.renderDogs = this.renderDogs.bind(this)
  }
  renderDogs() {
      return this.props.DogdataReact.map((dogObject, index) => {
          return (<DogEntry key={index} dog={dogObject}/>)
      })
  }
  render() {
    if (this.props.DogdataReact === undefined) {
      return(
        <div id="FoundDogDiv">
        <h1 id="foundDogHeader"> We found no dogs that match your picture! Check back later. </h1>
        </div>
      )
    }
    return(
      <div id="FoundDogDiv">
      <h1> Here are the dogs we've found that match your picture!</h1>
        <div>
          {this.renderDogs()}
        </div>
      </div>
    )
  }
}

export default createContainer(props => {
  if (props.dogChar) {

  var cleanedChar = props.dogChar.filter(value => {
    if (value == "dog" || value == "dog breed" || value == "mammal" || value == "vertebrate" || value == "dog like mammal") {
      return false
    } else {
      return true
    }
  })
  console.log(cleanedChar)
    return {DogdataReact: Dogdata.find({ Characteristics: cleanedChar}).fetch()};
  }
  else {return {DogdataReact: Dogdata.find({}).fetch()};}
}, FoundDog);
