import React, {Component} from 'react';
import LostDog from './LostDog.jsx'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import FoundDog from './FoundDog.jsx'
import Chatroom from './Chatroom.jsx'
// Import crucial modules

const MainScreen = () => (
    <div id="dashboard">
        <img src="Kanye.svg"/>
        <Link to="/lostdog" className="dashboardButton" id="LostDog">Lost a Dog</Link>
        {/* Link when pressed routes to /lostdog */}
        <br>

        </br>

        <Link to="/founddog" className="dashboardButton">Found a Dog</Link>
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
            renderThis = <Redirect push to="/dashboard"/>
            // If the user is logged in, redirect them to /dashboard
        } else {
            //Else render the login form
            renderThis = (
                <div id="loginForm">
                    <img src="Kanye.svg"/>
                    <h1 id="title">
                        DogSight
                    </h1>
                    <p className="subtitle"> report lost/found dogs </p>
                    <form onSubmit={this.login}>
                        {/* onSubmit of this form, run login() under the LoginForm component */}
                        <input className="loginBox" id="username" type="text" placeholder="username"/>

                        <input className="loginBox" id="password" type="text" placeholder="password"/>

                        <input type="submit" id="loginButton" value="login"/>

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
    constructor() {
      super()
    }
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={LoginForm}/> {/* If the window path is /dashboard, render the MainScreen component*/}

                    <Route exact path="/dashboard" component={MainScreen}/> {/* If the window path is /dashboard, render the MainScreen component*/}

                    <Route exact path="/lostdog" component={LostDog}/> {/* If the window path is /lostdog, render the LostDog component*/}

                    <Route exact path="/founddog" component={FoundDog}/> {/* If the window path is /founddog, render the NoMatch component*/}

                    <Route exact path="/chatroom" component={Chatroom}/> {/* If the window path is /founddog, render the NoMatch component*/}

                </div>
            </Router>
        )
    }
}
