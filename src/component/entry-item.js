// EntryInput.js
import React from 'react';
import styles from "../styles/Entry.module.css"
import stylesLocal from "../styles/Entry.module.css";

const EntryInput = ({ data, setData }) => {
    const setDataFxns = name =>
        e => setData(prevData => ({
            ...prevData,
            [name]: e.target.value
        }));

    return <div className={styles.entryItemMain}>
        <input
            type="text"
            value={data.taskName}
            onChange={setDataFxns("taskName")}
            className={stylesLocal.entryItem1}
        />

        <input
            type="number"
            value={data.importance}
            onChange={setDataFxns("importance")}
            className={stylesLocal.entryItem2}
        />

        <input
            type="number"
            value={data.time}
            onChange={setDataFxns("time")}
            className={stylesLocal.entryItem3}
        />
    </div>;
};

export default EntryInput;
