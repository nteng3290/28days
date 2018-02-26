import React from 'react';
import moment from 'moment';

const Cycle = (props) => {
    return (
        <div className="oneCycle">
            <p className="daysTo">{moment(props.date).fromNow()}</p>
            <p>{props.date}</p>
            <button className="edit"><i className="fas fa-pen-square"></i></button>
        </div>
    )
}

export default Cycle