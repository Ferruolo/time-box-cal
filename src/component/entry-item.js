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
            // value={data.taskName}
            onChange={e => {setDataFxns("taskName")(e)}}
            className={stylesLocal.entryItem1}
        />

        <input
            type="number"
            // value={data.importance}
            onChange={e => {setDataFxns("importance")(e)}}
            className={stylesLocal.entryItem2}
        />

        <input
            type="number"
            // value={data.time}
            onChange={e => {setDataFxns("time")(e)}}
            className={stylesLocal.entryItem3}
        />
    </div>;
};

export default EntryInput;
