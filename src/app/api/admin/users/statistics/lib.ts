export function getLastWeek() {
    const date = new Date();
    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
    return date.toISOString();
}

export function getTodayNightTime() {
    const date = new Date();
    date.setHours(23, 59, 0, 0);
    return date.toISOString();
}
