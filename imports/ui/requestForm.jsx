import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class RequestForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label>
          Name:
          <input type="text" value={this.props.value} onChange={this.props.onChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
