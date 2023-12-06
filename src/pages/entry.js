import React, {useState} from "react";
import stylesHome from "../styles/Home.module.css";
import stylesLocal from "../styles/Entry.module.css";
import EntryInput from "@/component/entry-item";
import {Inter} from "next/font/google";
import {useRouter} from "next/router";

const interFont = Inter({subsets: ['latin']})

const Entry = () => {
    const router = useRouter()
    const [entryItems, setEntryItems] = useState([]);

    const addNewItem = () => setEntryItems(prevItems =>
        [...prevItems, {taskName: "New Item", importance: 0, time: 0}]);

    const updateData = (index, newData) =>
        setEntryItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = newData;
            return newItems;
        });
    const submit = e =>{
        e.preventDefault();

    }

    return <main className={stylesHome.main} style={interFont.style}>
        <nav className={stylesHome.navClass}>
            <button
                className={stylesHome.navButton}
                onClick={() => router.push("/")}
            >
                Return to Landing
            </button>
            <button
                onClick={() => router.push("/cal-view")}
                className={stylesHome.navButton}
            >
                Continue to next page
            </button>
        </nav>
        <div className={stylesLocal.header}>
            <h1 className={stylesLocal.header}>Entry Page</h1>
            <h2>
                Please enter all the tasks you want to accomplish today, <br/>
                their priority, and the time it will take to accomplish them
            </h2>
        </div>

        <div className={stylesLocal.entryArea}>
            <div className={stylesLocal.entryItemHeader}>
                <span className={stylesLocal.entryItem1}>Item Name</span>
                <span className={stylesLocal.entryItem2}>Importance</span>
                <span className={stylesLocal.entryItem3}>Hours Expected</span>
            </div>

            {entryItems.map((item, index) => <EntryInput
                key={index}
                data={item}
                setData={newData => updateData(index, newData)}
            />)}
        </div>
        <div className={stylesHome.navClass}>
            <button onClick={addNewItem}
                    className={stylesHome.navButton}>
                New Item
            </button>
            <button onClick={submit}
                    className={stylesHome.navButton}>
                New Item
            </button>

        </div>

    </main>;
};

export default Entry;
