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
import Login from "./components/login";
import Signup from "./components/signup";
import Logout from "./components/logout";
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      username: null
    }
  }
  updateUser  = (userObject) =>{
    this.setState(userObject)
  }
  isLoggedIn = () =>{
        let no = <Link to="/" className="nav-link">Log In</Link>
        let yes = <Link to="/logout" className="nav-link">Log Out</Link>

        if(this.state.loggedIn) return yes;
        else return no;
  }
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/list" className="navbar-brand">Task Organizer</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">Todos</Link>
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
                <li className="navbar-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
                <li className="navbar-item">
                  {this.isLoggedIn()}
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact render={()=><Login updateUser={this.updateUser}/>}/>
          <Route path="/logout" render={()=><Logout updateUser={this.updateUser}/>}/>
          <Route path="/list"  component={TodosList} />
          <Route path="/signup"  component={Signup} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/delete/:id" component={DeleteID}/>
          <Route path="/filterCompleted" component={FilterCompleted} />
          <Route path="/filterIncomplete" component={FilterIncomplete} />
          <Route path="/myCalendar/:id" component={MyCalendar} />
        </div>
      </Router>
    );
  }
}

export default App;