import React, {useState} from 'react';

const entryInput = ({}) => {
    // Define three state variables with default values
    const [value1, setValue1] = useState('Default Value 1');
    const [value2, setValue2] = useState('Default Value 2');
    const [value3, setValue3] = useState('Default Value 3');

    // Function to handle changes in the first input
    const handleChange1 = e => setValue1(e.target.value);

    // Function to handle changes in the second input
    const handleChange2 = e => setValue2(e.target.value);

    // Function to handle changes in the third input
    const handleChange3 = e => setValue3(e.target.value);

    return <div>
        <input type="text" value={value1} onChange={handleChange1}/>

        <input type="text" value={value2} onChange={handleChange2}/>

        <input type="text" value={value3} onChange={handleChange3}/>
    </div>
};

export default entryInput;
