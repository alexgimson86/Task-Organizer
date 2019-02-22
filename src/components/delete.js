import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteID extends Component {
    constructor(props) {
        super(props);
        this.state = {
           deleted: false
        }
    }
    componentDidMount(){
        axios.get("http://localhost:4000/todos/delete/" + this.props.match.params.id).then(res => {
            this.setState({
                deleted: true
            })
        })
        this.props.history.push('/')
    }
    render(){
        return("")
    }
}