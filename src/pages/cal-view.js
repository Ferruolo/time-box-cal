import React, {useEffect, useState} from "react";
import calendarStyle from "../styles/Calendar.module.css"
import {Inter} from "next/font/google";

const interFont = Inter({subsets: ['latin']})

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


const WeekCalendar = ({apiData}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [events, setEvents] = useState([apiData]);

    const handlePrevWeek = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() - 7);
        setStartDate(newStartDate);
    };

    const handleNextWeek = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() + 7);
        setStartDate(newStartDate);
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const timeSlots = [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
    ];

    const renderEventsForDayAndTime = (day, timeSlot) =>
        events
            .filter(event => event.day === day && event.time === timeSlot)
            .map(event => <div key={event.id} className="event">
                {event.title}
            </div>);

    return <div className="week-calendar">
        <div className="calendar-header">
            <button onClick={handlePrevWeek}>&lt;</button>
            <h2>{`Week of ${startDate.toLocaleDateString()}`}</h2>
            <button onClick={handleNextWeek}>&gt;</button>
        </div>
        <div className="day-columns">
            {daysOfWeek.map(day => <div key={day} className="day-column">
                <div className="day-header">{day}</div>
                <div className="time-slots">
                    {timeSlots.map(timeSlot => <div key={timeSlot} className="time-slot">
                        <div className="time">{timeSlot}</div>
                        <div className="events">{renderEventsForDayAndTime(day, timeSlot)}</div>
                    </div>)}
                </div>
            </div>)}
        </div>
    </div>;
};


export async function getServerSideProps() {
    try {
        const apiUrl = "http://localhost:3000/api/read_data";
        const response = await fetch(apiUrl, {method: "post"});

        if (response.ok) {
            const apiData = await response.json();
            return {
                props: {
                    apiData,
                },
            };
        } else {
            console.error('Error fetching data from API:', response.statusText);
            return {
                props: {
                    apiData: null,
                },
            };
        }
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return {
            props: {
                apiData: null,
            },
        };
    }
}
export default WeekCalendar;