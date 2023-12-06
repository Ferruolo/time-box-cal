const getCurDate = () =>{
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\//g, '-')
}