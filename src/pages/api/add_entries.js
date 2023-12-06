import getCurDate from "../../utils/date"
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

// Example usage
const inputDate = '2023-12-06';
const updatedDate = incrementDay(inputDate);

console.log('Original Date:', inputDate);
console.log('Updated Date:', updatedDate);


export default function handler(req, res) {
    const currentDate = new Date();
    let formattedDate = getCurDate();

    let data = fetch("/api/read_data").then(res =>res.json())

    let nextAvailable = currentDate.getHours() + 1;
    let entries = JSON.parse(req.body)


    // Not my finest work
    while (!(entries.length > 0)){
        const today = data.filter(item => item.day === today);
        const notToday = data.filter(item => item.day !== today)
        const daySchedule = Array(24).fill(null);
        today.forEach(d =>{
            for (let i = d.start; i < d.end; ++i){
                daySchedule[i] = d;
            }
        })
        const not_scheduled = [];
        entries.sort((a, b) => a.importance < b.importance)
        entries.forEach(item => {
            if (nextAvailable > 24) break;
            let isFree = true;
            for (let i = nextAvailable; i < nextAvailable + item.time; ++i){
                if (daySchedule[i] !== null && daySchedule[i].importance >= item.importance) {
                    isFree = false;
                    break;
                }
            }
            if (isFree) { // schedule
                for (let i = nextAvailable; i < nextAvailable + item.time; ++i){
                    daySchedule[i] = entries;
                }
            } else {
                not_scheduled.push(item);
            }

        })


        let prev  = null
        for (let i = 0; i < 24; ++i){
            if (daySchedule[i] === null){
                continue
            }
            const cur_item = daySchedule[i];
            if (prev === null){
                cur_item.start = i
            } else if (prev.taskName !== cur_item.taskName) {
                prev.end = i - 1;
                notToday.push(prev);
                cur_item.start = i;
            }
            prev = cur_item;
        }
        entries = not_scheduled
        nextAvailable = 8
        data = notToday
        formattedDate = incrementDay(formattedDate)
    }
    const filePath = "./src/data/calendar-entries.json"
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200)
}
