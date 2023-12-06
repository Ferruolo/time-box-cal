import React, {useEffect, useState} from "react";
import calendarStyle from "../styles/Calendar.module.css"
import stylesHome from "../styles/Home.module.css"
import {Inter} from "next/font/google";
import {useRouter} from "next/router";

const interFont = Inter({subsets: ['latin']})

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


const WeekCalendar = ({apiData}) => {
    const router = useRouter();
    const [startDate, setStartDate] = useState(new Date());
    const [events, setEvents] = useState([...apiData[0]["12-4-2023"]]);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const timeSlots = [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
    ];


    const renderEventsForDayAndTime = (day, timeSlot) => {
        const filtered = events
            .filter(event => event.day === day &&
                (event.start <= timeSlot && timeSlot <= event.end));
        if (filtered.length > 0) {
            return <span>{filtered.sort()[0].taskName}</span>
        } else {
            return <span>_</span>
        }
    }
    return <main className="week-calendar" style={interFont.style}>
        <nav className={stylesHome.navClass}>
            <button
                className={stylesHome.navButton}
                onClick={() => router.push("/")}
            >
                Back to Landing
            </button>
            <button
                className={stylesHome.navButton}
                onClick={()=> router.push("/entry")}
            >
                Add More Items
            </button>
        </nav>
        <div className="calendar-header">
        </div>
        <div className={calendarStyle.calGrid}>
            <span></span>{daysOfWeek.map(day => <div key={day} className="day-column">
            <div className={calendarStyle.doy}>{day}</div>
        </div>)
        }
            <div>
                {timeSlots.map((v, i) => <div
                    key={i}
                    className={calendarStyle.timeOfDay}>{v}</div>)}
            </div>

            {daysOfWeek.map(day => <div key={day} className="day-column">

                <div className="time-slots">
                    {timeSlots.map(timeSlot => <div key={timeSlot} className="time-slot">
                        <div className={calendarStyle.task}>{renderEventsForDayAndTime(day, timeSlot)}</div>
                    </div>)}
                </div>
            </div>)}
        </div>
    </main>;
};


export async function getServerSideProps() {
    try {
        const apiUrl = "/api/read_data";
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