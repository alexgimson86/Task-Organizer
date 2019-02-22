import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/stylesheet.css'
import pic from "../calendar.png"


const Todo = (props) => {
    return(
<tr>
    <td className={props.todo.todo_completed ? "completed" :""}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? "completed" :""}>{props.todo.todo_responsible}</td>
    <td className={props.todo.todo_completed ? "completed" :""}>{props.todo.todo_priority}</td>
    <td>
        <Link to={"/edit/"+props.todo._id}>Edit</Link>
    </td>
    <td>
        <Link to={"/delete/"+props.todo._id}>Delete</Link>
    </td>
    <td><Link to={"/myCalendar/"+props.todo._id}><img src={pic} className="calendarIcon" alt="calendar"/></Link></td>
</tr>
);
}
export default class TodosList extends Component {
    constructor(props){
        super(props)
        this.state =  { todos: [], set: false }
    }
    componentDidMount(){
        axios.get("http://localhost:4000/todos").then(res => {
            this.setState((previous) => ({
                todos: res.data,
                set: true
            }))
        })
    }
    todoList = () => {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i}/>
        })
    }
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                            <th>Delete</th>
                            <th>Calendar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.set ? this.todoList() : <tr></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}