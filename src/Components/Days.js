import React from 'react';
import '../Styles/Days.css';

function Days(props) {
    const daysOfWeek = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];

    const handleDayClick = (index) => {
        props.handleDayClick(index);
    };

    return (
        <div className="card-action">
            {daysOfWeek.map((day, index) => (
                <a key={index} href="#" className={props.activeDay === index ? 'font active' : 'font'} onClick={() => handleDayClick(index)}>
                    {day}
                </a>
            ))}
        </div>
    );
}

export default Days;