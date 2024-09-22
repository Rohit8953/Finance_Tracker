
const DateAndTime=()=>{
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amAndpm = hours >= 12 ? 'pm' : 'am';
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDate = `${day} ${month} at ${hours}:${formattedMinutes} ${amAndpm}`;
    return formattedDate;
}
export default DateAndTime;