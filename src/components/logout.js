import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
class Logout extends Component {
    componentDidMount() {
        axios.get("http://localhost:4000/todos/logout")
            .then(response => {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
                this.props.history.push('/login');

            }).catch(error => {
                console.log('logout error: ')
                console.log(error)

            })
    }


    render() {
        return ("")
    }
}

export default withRouter(Logout)