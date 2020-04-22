import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../services/firebase'
import { signOut } from '../helpers/auth'

export default class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: auth().currentUser
        }
        this.signOut = this.signOut.bind(this)
    }

    async signOut() {
        try {
            await signOut()
            return (<Redirect to="/login" />)
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    render() {
        return (
            <div>
                <div className="chat-area" ref={this.myref}>
                    <b>Welcome: <strong>{this.state.user.email}</strong></b>
                </div>
                <div>
                    successfully signin !!!!
                </div>
                <div>
                    <button type="button" onClick={this.signOut}>Sign out</button>
                </div>
            </div>
        )
    }
}
