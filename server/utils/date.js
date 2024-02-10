module.exports = function (date) {
    currentDate = new Date();

    const isSameDay = (
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate()
    );

    return isSameDay
}