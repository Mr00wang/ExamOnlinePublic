/*
格式化日期
 */

export function formateDate(time) {
    if(!time) return '';
    let date = new Date(time);
    let months = date.getMonth()+1;
    let days = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    //如果是单个数，则前面补0
    months  = months<10  ? "0"+months : months;
    days  = days <10  ? "0"+days : days;
    hours  = hours<10  ? "0"+hours : hours;
    minutes = minutes<10 ? "0"+minutes : minutes;
    seconds = seconds<10 ? "0"+seconds : seconds;
    return date.getFullYear() + '-' + months + '-' +days
        + ' ' +hours + ':' + minutes + ':' + seconds
}

export function formateDate1(time) {
    if(!time) return '';
    let date = new Date(time);
    let months = date.getMonth()+1;
    let days = date.getDate();
    //如果是单个数，则前面补0
    months  = months<10  ? "0"+months : months;
    days  = days <10  ? "0"+days : days;
    return date.getFullYear() + '-' + months + '-' +days

}
export function formateDate2(time) {
    if(!time) return '';
    let hours = parseInt(time / 60);
    let minutes = time % 60;
    hours  = hours<10  ? "0"+hours : hours;
    minutes = minutes<10 ? "0"+minutes : minutes;
    //如果是单个数，则前面补0
    return hours + ':' + minutes
}