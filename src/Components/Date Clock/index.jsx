import React, { memo, useEffect, useRef, useState } from 'react';
import moment from 'moment';
// import IndiaFlag from "../../images/ind.png";

const DateClock = () => {

    const [dateTime, setDateTime] = useState("");
    const dateTimeIntervalRef = useRef("");

    const getDateTime = () => {
        // let date = moment().format('ddd hh:mm:ss A');
        let date = moment().format('hh:mm:ss A');
        setDateTime(date);
    };

    useEffect(() => {
        dateTimeIntervalRef.current = setInterval(getDateTime, 1000);
        return () => {
            clearInterval(dateTimeIntervalRef.current);
        };
    }, []);

    return (
        <div className="flag"><img src={""} alt='Img' />
            <span id="date_time">{dateTime}</span>
        </div>
    );
};

export default memo(DateClock);
