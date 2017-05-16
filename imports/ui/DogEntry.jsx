import React, {Component} from 'react'
import {Meteor} from 'meteor/meteor'

export default class DogEntry extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div className="dogEntry">
        <p> Name: {this.props.dog.Name}</p>
        <p> Gender: {this.props.dog.Gender}</p>
        <p> Characteristics: {
            this.props.dog.Characteristics.map((characteristic, index) => {
              return <li key={index}> {characteristic} </li>
            })
          }</p>
        <p> Image: <img src={this.props.dog.Image}/> </p>
      </div>
    )
  }
}
