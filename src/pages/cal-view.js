import React, {useEffect, useState} from "react";
import calendarStyle from "../styles/Calendar.module.css"
import stylesHome from "../styles/Home.module.css"
import {Inter} from "next/font/google";
import {useRouter} from "next/router";

const interFont = Inter({subsets: ['latin']})

function getNext7Days() {
    const today = new Date();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);

        const month = String(nextDay.getMonth() + 1).padStart(2, '0');
        const day = String(nextDay.getDate()).padStart(2, '0');
        const year = nextDay.getFullYear();

        const formattedDate = `${month}-${day}-${year}`;
        next7Days.push(formattedDate);
    }

    return next7Days;
}

const WeekCalendar = ({apiData}) => {
    console.log(apiData)
    const router = useRouter();
    const [startDate, setStartDate] = useState(new Date());
    const [events, setEvents] = useState(apiData);

    const next7Days = getNext7Days();

    const timeSlots = Array.from({ length: 24 }, (_, index) => index + 1);


    const renderEventsForDayAndTime = (day, timeSlot) => {
        const filtered = events
            .filter(event => event.date === day &&
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
        {/*<div className="calendar-header">*/}
        {/*</div>*/}
        <div className={calendarStyle.calGrid}>
            <span></span>{next7Days.map(day => <div key={day} className="day-column">
            <div className={calendarStyle.doy}>{day}</div>
        </div>)
        }
            <div>
                {timeSlots.map((v, i) => <div
                    key={i}
                    className={calendarStyle.timeOfDay}>{v}</div>)}
            </div>

            {next7Days.map(day => <div key={day} className="day-column">

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
        const apiUrl = "http://localhost:3000/api/read_data";
        const response = await fetch(apiUrl);

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