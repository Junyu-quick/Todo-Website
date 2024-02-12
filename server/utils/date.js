module.exports = function (date) {
    currentDate = new Date();

    const isSameDay = (
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate()
    );

    console.info('same date document found.')
    return isSameDay
}