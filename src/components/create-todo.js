import React, { Component } from 'react';
import axios from "axios"

export default class CreateTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoDescription: '',
            todoAssignedTo: '',
            todoPriority: '',
            todoCompleted: false,
            dueDate: '',
        }
    }
    onChangeTodoDescription = (e) => {
        this.setState({
            todoDescription: e.target.value
        })
    }
    onChangeTodoResponsible = (e) => {
        this.setState({
            todoAssignedTo: e.target.value
        })
    }
    onChangeTodoPriority = (e) => {
        this.setState({
            todoPriority: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newTodo ={
            "todo_description": this.state.todoDescription,
            "todo_responsible" : this.state.todoAssignedTo,
            "todo_priority": this.state.todoPriority,
            "todo_completed": false,
            "due_date": new Date(),
        }
        axios.post("http://localhost:4000/todos/add", newTodo)
        .then(res => console.log(res.data))
        this.setState({
            todoDescription: '',
            todoAssignedTo: '',
            todoPriority: '',
            todoCompleted: false,
            due_date: '',
        })
    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todoDescription}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.todoAssignedTo}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todoPriority === 'Low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todoPriority === 'Medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.todoPriority === 'High'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
