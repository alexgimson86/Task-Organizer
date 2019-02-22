import React, { Component } from 'react';
import Calendar from 'react-calendar';
import '../styles/stylesheet.css';
import axios from 'axios'

export default class MyCalendar extends Component {
 constructor(props){
    super(props);
    this.state = {
    date:null,
  }
}
componentDidMount(){
     axios.get('http://localhost:4000/todos/calendar/'+ this.props.match.params.id)
     .then(response =>{
        let dateArr = response.data.split('-');
        this.setState({
            date : new Date(dateArr[0],dateArr[1],dateArr[2]),
        })
    }).catch(error =>{
        console.log(error)
    })
}

  onChange = (date) => {
    axios.post('http://localhost:4000/todos/calendar/' + this.props.match.params.id , {date} )
    .then(response => {
        let dateArr = response.data.split('-');
       this.setState({
           date : new Date(dateArr[0],dateArr[1],dateArr[2]),
       })
   }).catch(error =>{
       console.log(error)
   })
      this.setState({ date: date })
  }
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
