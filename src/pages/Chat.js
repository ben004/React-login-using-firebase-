import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth, db } from '../services/firebase'
import { signOut } from '../helpers/auth'

export default class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null
        }
        this.myref = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    async componentDidMount() {
        const chatArea = this.myref.current
        this.setState({ readError: null })
        try {
            db.ref('chats').on('value', snapshot => {
                let chats = []
                snapshot.forEach((snap) => {
                    chats.push(snap.val())
                })
                this.setState({ chats })
                chatArea.scrollBy(0, chatArea.scrollHeight);
            })
        } catch (error) {
            this.setState({ readError: error.message })
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.setState({ writeError: null })
        try {
            await db.ref('chats').push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            })
            this.setState({ content: '' })
        } catch (error) {
            this.setState({ writeError: error.message })
        }
    }

    async signOut() {
        try {
            await signOut()
            return (<Redirect to="/login" />)
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
    }

    render() {
        return (
            <div>
                <div className="chat-area" ref={this.myref}>
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                            {chat.content}
                            <br />
                            <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                        </p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit} className="mx-3">
                    <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
                    {this.state.error ? <p className="text-danger">{this.state.error}</p> : null} <br />
                    <button type="submit" className="">Send</button>
                </form>
                <div>
                    Logged in as: <strong>{this.state.user.email}</strong>
                </div>
                <div>
                    <button type="button" onClick={this.signOut}>Sign out</button>
                </div>
            </div>
        )
    }
}
