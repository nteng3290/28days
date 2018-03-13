import React from 'react';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

const Cycle = (props) => {
    return (
        <div className="oneCycle">
            <h2><CountdownTimer endDate={moment(props.date)} /></h2>
            <p>{props.date}</p>
            {/* <button className="edit"><i className="fas fa-pen-square"></i></button>
            <button className="edit">+</button> */}
        </div>
    )
}

export default Cycle