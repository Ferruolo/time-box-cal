export default function EntryItem({index, getFxn, setFxn}) {
    return <input value={() => getFxn(index)} onChange={(v) => setFxn(index, v.target.value)}/>
}