import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import {withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit = (event)=> {
        event.preventDefault()
        console.log('handleSubmit')

        axios.post("http://localhost:4000/todos/login", {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    // update the state to redirect to home
                    let userObject = {
                        loggedIn: true,
                        username: this.state.username
                    }
                    this.props.updateUser(userObject)
                    this.props.history.push("/list");
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }
  render() {
    return (
       <div>
           <form>
               <label>username: </label>
               <input
               type="text"
               name="username"
               value={this.state.username}
               onChange={this.onChangeUsername}
               />
               <label>password:</label>
               <input
               type="text"
               name="password"
               value={this.state.password}
               onChange={this.onChangePassword}
               />
               <button type="submit"
               onClick={this.handleSubmit}>
                   Submit
               </button>
           </form>
       </div>
          
    );
  }
}

export default withRouter(Login);