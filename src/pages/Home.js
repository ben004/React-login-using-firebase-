import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to CaliChat</h1>
                <p><Link to="/login">click here</Link> to go to the login page</p> 
            </div>
        )
    }
}
