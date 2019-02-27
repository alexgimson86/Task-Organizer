import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Countdown from './countdown';
import '../styles/stylesheet.css';
import axios from 'axios';

export default class MyCalendar extends Component {
 constructor(props){
    super(props);
    this.state = {
    date : new Date(),
  }
}
componentDidMount(){
     axios.get('http://localhost:4000/todos/calendar/'+ this.props.match.params.id)
     .then(response =>{
        let dateArr = response.data.split('-');
        dateArr[1] = dateArr[1] - 1;
        this.setState({
            date : new Date(dateArr[0],dateArr[1].toString(),dateArr[2]),
        })
    }).catch(error =>{
        console.log(error)
    })
}

  onChange = (date) => {
    axios.post('http://localhost:4000/todos/calendar/' + this.props.match.params.id , {date} )
    .then(response => {
        let dateArr = response.data.split('-');
        dateArr[1] = dateArr[1] - 1;
       this.setState({
           date : new Date(dateArr[0],dateArr[1].toString(),dateArr[2]),
       })
   }).catch(error =>
    {
       console.log(error)
   })
      this.setState({ date: date })
  }
  render() {
    let currDate = new Date();
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <Countdown
          date={this.state.date}
          currDate={currDate}
        />
      </div>
    );
  }
}
