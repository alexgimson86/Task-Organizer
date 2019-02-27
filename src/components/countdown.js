import React, { Component } from 'react';
import '../styles/stylesheet.css';
import axios from 'axios';


export default class Countdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: '',
            hours: '',
            minutes: '',
            seconds: '',
            clear: null,
        }
    }
    componentDidMount() {
        this.setState({ clear: setInterval(this.countLogic, 1000) });
    }
    componentWillUnmount() {
        clearInterval(this.state.clear);
    }
    countLogic = () => {
        let d = new Date();
        let difference = this.props.date.getTime() - d.getTime();
        if (difference <= 0) {
            clearInterval(this.state.clear);
        }
        else {
            var seconds = Math.floor(difference / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            hours %= 24;
            minutes %= 60;
            seconds %= 60;

            this.setState({
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            })

        }
    }

    render() {


        return (<Markup
            days={this.state.days}
            hours={this.state.hours}
            minutes={this.state.minutes}
            seconds={this.state.seconds} />
        );

    }
}
const Markup = (props) => {
    if (props.days) {
        return (
            <div>

                <br />
                <div id='clockdiv'>
                    <div>
                        <span className='days'>{props.days}</span>
                        <div className='smalltext'>Days</div>
                    </div>
                    <div>
                        <span className='hours'>{props.hours}</span>
                        <div className='smalltext'>Hours</div>
                    </div>
                    <div>
                        <span>{props.minutes}</span>
                        <div className='smalltext'>Minutes</div>
                    </div>
                    <div>
                        <span>{props.seconds}</span>
                        <div className='smalltext'>Seconds left</div>
                    </div>

                </div>
            </div>);
    }
    else {
        return ("");
    }
}