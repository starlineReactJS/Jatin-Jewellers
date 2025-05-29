import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '../../Components/Skeleton';
import { economicCalendar } from '../../Config';

export default function Calendar() {

    let calendarRef = useRef(null);
    const [, setOneTimeRender] = useState(null);
    const [isLoading, setIsLoading] = useState({});

    useEffect(() => {
        setOneTimeRender("rendered");
    }, []);


    const dataLoadedFn = (data) => {
        setIsLoading(data);
    };

    return (
        <div className="main-cover">
            <div className="container">
                {!(!!isLoading?.calendar) &&
                    <Skeleton dependency={{ calendar: !!calendarRef.current?.src ? [calendarRef.current?.src] : [] }}
                        isLoading={(data) => dataLoadedFn(data)}
                        height='600px' />
                }
                <div className={`mt-5`}>
                    <iframe ref={calendarRef}
                        title='calendar'
                        style={{ margin: "30px 0px", display: !(!!isLoading?.calendar) ? "none" : "block" }}
                        scrolling="no" allowtransparency="true" frameBorder="0" width="100%" height="600px" src={economicCalendar}></iframe>
                    <div id=""></div>
                </div>
            </div>
        </div>
    );
}
