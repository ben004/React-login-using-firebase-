import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <b><h1>Welcome to React App</h1></b>
                <p><Link to="/login">click here</Link> for login </p> 
            </div>
        )
    }
}
