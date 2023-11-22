import {useState} from "react";
import {EntryItem} from "../component/entry-item"
import {useRouter} from "next/router";

export default function Entry() {
    const {taskList, setTaskList} = useState([])
    const {displayList, setDisplayList} = useState([])
    const router = useRouter()

    const getItem = (idx) => taskList[idx];
    const setItem = (idx, val) => {
        setTaskList(prevState => [...prevState, prevState[idx] = val]);
    }

    const newItem = (e) => {
        e.preventDefault();
        setTaskList(prevState => [...prevState, ""]);
        displayList(EntryItem(taskList.length, getItem, setItem));
    }


    return (
        <main>
            <div>
                {displayList}
                <button onClick={newItem}>Add New item</button>
            </div>
            <div onClick={() => router.push("/cal-view")}>Create Calendar for Day</div>
        </main>)
}