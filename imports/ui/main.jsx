import React, {Component} from 'react';
import LostDog from './LostDog.jsx'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'

// Import crucial modules

const MainScreen = () => (
    <div id="dashboard">
        <Link to="/lostdog">Lost a Dog</Link>
        // Link when pressed routes to /lostdog
        <br></br>
        <Link to="/founddog">Found a Dog</Link>
    </div>
)

// Create MainScreen function for routing to, returns UI elements for dashboard

const NoMatch = () => (
    <h1>
        404: Page not found
    </h1>
)

// Create NoMatch function for routing to when a page cannot be found

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false
        }
        // Initalize state
        this.login = this.login.bind(this)
        // Bind context of 'this' for this.login
    }
    login(event) {
        //Method to change state of 'isLoggedIn'
        event.preventDefault();
        //Prevents form from refreshing page on submit
        this.setState({isLoggedIn: true})
        // Change the state value 'isLoggedIn' to true
    }
    render() {
        // What to render
        let renderThis = null
        // Create a variable called renderThis with value of null
        if (this.state.isLoggedIn) {
            renderThis = <Redirect to="/dashboard"/>
            // If the user is logged in, redirect them to /dashboard
        } else {
          //Else render the login form
            renderThis = (
                <div>
                    <h1 id="title">
                        DogSight Login Page
                    </h1>
                    <form onSubmit={this.login}>
                      // onSubmit of this form, run login() under the LoginForm component
                        <input type="text" placeholder="username"/>
                        <input type="text" placeholder="password"/>
                        <input type="submit" value="login"/>
                    </form>
                </div>
            )
        }
        return (
            <div>
                {renderThis}
            </div>
            // Return the value of renderThis to render(), rendering the UI
        )

    }
}
// Create LoginForm component for the login form
export default class MainPage extends Component {
  // Export this MainPage component for use in other files
    render() {
        return (
            <Router>
              // Create the router component for routing
                <div>
                    <LoginForm/>
                    // Render the LoginForm component
                    <Route exact path="/dashboard" component={MainScreen}/>
                    // If the window path is /dashboard, render the MainScreen component
                    <Route exact path="/lostdog" component={LostDog}/>
                    // If the window path is /lostdog, render the LostDog component
                    <Route exact path="/founddog" component={NoMatch}/>
                    // If the window path is /founddog, render the NoMatch component
                </div>
            </Router>
        )
    }
}
