import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./components/create-todo";
import EditTodo from "./components/edit-todos";
import TodosList from "./components/todos-list";
import DeleteID from "./components/delete";
import FilterCompleted from "./components/filter-completed";
import FilterIncomplete from "./components/filter-incomplete";
import MyCalendar from "./components/my-calendar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Task Organizer</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/filterCompleted" className="nav-link">Show Completed</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/filterIncomplete" className="nav-link">Show Incomplete</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/delete/:id" component={DeleteID}/>
          <Route path="/filterCompleted/" component={FilterCompleted} />
          <Route path="/filterIncomplete/" component={FilterIncomplete} />
          <Route path="/myCalendar/:id" component={MyCalendar} />
        </div>
      </Router>
    );
  }
}

export default App;