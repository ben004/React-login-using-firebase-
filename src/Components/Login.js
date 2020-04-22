import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signin } from '../auth'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          email: "",
          password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.setState({ error: '' })
        try {
            await signin(this.state.email, this.state.password)
        } catch(error) {
            this.setState({ error: error.message })
        }
    }

    render() {
        return (
            <div>
                You are in login Page: <br/><br/>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <h1>
                        Login to fire Based react app</h1><h2><Link to="/">
                            click here
                        </Link> to back
                    </h2>
                    <p>
                        <b>Enter fillowing for login</b>
                    </p>
                    <div>
                    <label>Enter Email:</label>
                        <input placeholder="Enter your email"
                         name="email"
                         type="email"
                         onChange={this.handleChange}
                         value={this.state.email} />
                    </div>
                    <div>
                        <label>Enter Password:</label>
                        <input placeholder="Enter your password"
                         name="password"
                         type="password"
                         value={this.state.password}
                         onChange={this.handleChange} />
                    </div>
                    <div>
                        {this.state.error ? ( <p>{this.state.error}</p>) : null}
                        <button type="submit">Login</button>
                    </div>
                    <hr />
                    <p>
                        Create new account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        )
    }
}