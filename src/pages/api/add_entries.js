import {getCurDate}  from "@/utils/date"
import fs from "fs";

function incrementDay(dateString) {
    // Convert the date string to a Date object
    const currentDate = new Date(dateString);

    // Increment the day by one
    currentDate.setDate(currentDate.getDate() + 1);

    // Format the updated date as a string (you can customize the format if needed)
    return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\//g, '-')
}


const route = "https://time-box-cal.vercel.app/"
export default async function handler(req, res) {
    console.log("**********HERERERE******************")
    const currentDate = new Date();
    let formattedDate = getCurDate();

    let data = await fetch(route + "/api/read_data").then(res => res.json())

    let nextAvailable = currentDate.getHours() + 1;
    let entries = JSON.parse(req.body)


    // Not my finest work
    while (entries.length > 0) {
        const today = data.filter(item => item.date === formattedDate);
        const notToday = data.filter(item => item.date !== formattedDate)
        const daySchedule = Array(24).fill(null);
        today.forEach(d => {
            for (let i = d.start; i < d.end; ++i) {
                daySchedule[i] = d;
            }
        })
        const not_scheduled = [];
        entries.sort((a, b) => a.importance < b.importance)
        console.log(daySchedule)
        while (nextAvailable < 24 && entries.length > 0){
            const item = entries[entries.length - 1];
            let isFree = true;
            for (let i = nextAvailable; i < nextAvailable + item.time; ++i) {
                if (daySchedule[i] !== null && daySchedule[i]!==undefined) {
                    isFree = false;
                    break;

                }
            }
            if (isFree) { // schedule
                for (let i = nextAvailable; i < nextAvailable + item.time; ++i) {
                    daySchedule[i] = item;
                }
                entries.pop();
                nextAvailable += item.time + 1;
            } else {
                nextAvailable += 1;
            }

        }

        let prev = null;
        for (let i = 0; i < 24; ++i) {
            const cur_item = daySchedule[i];

            if (cur_item === null) {
                if (prev !== null) {
                    prev.end = i - 1;
                    prev.date = formattedDate
                    notToday.push(prev);
                    prev = null;
                }
            } else {
                if (prev === null || prev.taskName !== cur_item.taskName) {
                    if (prev !== null) {
                        prev.end = i - 1;
                        prev.date = formattedDate
                        notToday.push(prev);
                    }
                    cur_item.start = i;
                }

                if (i === 23) {
                    // Handle the last item in the schedule
                    cur_item.end = i;
                    prev.date = formattedDate
                    notToday.push(cur_item);
                }

                prev = cur_item;
            }
        }
        console.log(notToday)
        entries = not_scheduled
        nextAvailable = 8
        data = notToday
        formattedDate = incrementDay(formattedDate)
    }
    const filePath = "./src/data/calendar-entries.json"
    console.log(data)
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({stat: "success"})
}
