import {createContainer} from 'meteor/react-meteor-data';
import {Chatdata} from "/imports/api/chat.js"
import React, {Component} from 'react'
import {Meteor} from 'meteor/meteor'

class Chatroom extends Component {
    constructor() {
        super()
        this.renderChat = this.renderChat.bind(this)
        this.enterMessage = this.enterMessage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeMessage = this.handleChangeMessage.bind(this)

    }
    renderChat() {
      console.log(this.props.ChatdataReact)
        return this.props.ChatdataReact.map((message, index) => {
            return (
                <p key={message.message}>
                {message.Name}: {message.Message}
                </p>
            )
        })
    }
//Gurnoor Starts
    handleChangeName(event) { 
        this.setState({name: event.target.value});
    }
    handleChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    enterMessage(event) {
      event.preventDefault()
      Chatdata.insert({
          Name: this.state.name,
          Message: this.state.message
      })
    }
    render() {
        return (
            <div id="chatDiv">
                <h1>
                    Chat
                </h1>
                <input id="inputName" type="text" placeholder="Enter name here" onChange={this.handleChangeName}/>
                <form onSubmit={this.enterMessage}>
                    <input id="inputName" type="text" placeholder="Enter message here" onChange={this.handleChangeMessage}/>
                </form>
                <div id="chatbox">
                    {this.renderChat()}
                </div>
            </div>
        )
    }
}
// Gurnoor Ends

export default createContainer(() => {
    return {ChatdataReact: Chatdata.find({}).fetch()};

}, Chatroom);
