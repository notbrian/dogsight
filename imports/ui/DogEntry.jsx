import React, {Component} from 'react'
import {Meteor} from 'meteor/meteor'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'


export default class DogEntry extends Component {
  constructor() {
    super()
    this.state = {
      goToChatroom: false
    }
    this.goToChatroom = this.goToChatroom.bind(this)
  }
  goToChatroom() {
    this.setState({
      goToChatroom: true
    })
  }
  render() {
    if (this.state.goToChatroom === true) {
      return(
        <Redirect push to="/chatroom"/>
      )
    }
    return(
      <div className="dogEntry">
        <p> Name: {this.props.dog.Name}</p>
        <img src={this.props.dog.Image}/>
        <button className="claimDogButton" onClick={this.goToChatroom}> This is my dog! </button>
      </div>
    )
  }
}
