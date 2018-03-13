import React from 'react';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

const Cycle = (props) => {
    return (
        <div className="oneCycle">
            {/* Testing Alert, don't think I got the syntax correct */}
            {/* {
                alert () => {
                    if (moment(props.date).fromNow() === 3){
                        alert(); 
                    }
                }
            } */}
            {/* <h2 className="daysTo">{moment(props.date).fromNow()}</h2> */}
            <h2><CountdownTimer endDate={moment(props.date)} /></h2>
            <p>{props.date}</p>
            <button className="edit"><i className="fas fa-pen-square"></i></button>
            <button className="edit">+</button>
        </div>
    )
}

export default Cycle