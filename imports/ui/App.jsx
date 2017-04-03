import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import RequestForm from './requestForm.jsx';

export default class App extends Component {
  constructor(props) {
    super()
    this.state = {
      breed: "state 1",
      value: "default"
    };

    this.requestData = this.requestData.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
  this.setState({value: event.target.value});
}
  requestData(event) {
    event.preventDefault()
    Meteor.call("searchDog",(this.state.value), (err, data) => this.setState({breed: data}))
  }
  render() {
    return(
      <div>
        <h1> {this.state.breed} </h1>
        <RequestForm onSubmit={this.requestData} value={this.state.value} onChange={this.handleChange}/>
      </div>
    )
  }
}
