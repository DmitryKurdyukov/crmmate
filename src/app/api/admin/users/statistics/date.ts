
export const dates = {
    today: {
      text: 'Today',
      getTimes() {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);

        return [date, new Date()];
      },
    },
    yesterday: {
      text: 'Yesterday',
      getTimes() {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        return [date, date];
      },
    },
    last_week_days: {
      text: 'Last 7 Days',
      getTimes() {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        return [date, new Date()];
      },
    },
    last_week: {
      text: 'Last Week',
      getTimes() {
        const endOfLastWeek = new Date();
        endOfLastWeek.setDate(endOfLastWeek.getDate() - (endOfLastWeek.getDay() || 7));
        const startOfLastWeek = new Date(endOfLastWeek);
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 6);
        return [startOfLastWeek, endOfLastWeek];
      },
    },
    this_week: {
      text: 'This week',
      getTimes() {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return [startOfWeek, endOfWeek];
      },
    },
    this_month: {
      text: 'This Month',
      getTimes() {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        return [startOfMonth, endOfMonth];
      },
    },
    last_month: {
      text: 'Last Month',
      getTimes() {
        const now = new Date();
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        return [startOfLastMonth, endOfLastMonth];
      },
    },
    last_month_days: {
      text: 'Last 30 Days',
      getTimes() {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
        return [date, new Date()];
      },
    },
    this_year: {
      text: 'This Year',
      getTimes() {
        const startOfYear = new Date();
        startOfYear.setMonth(0); // Январь — первый месяц (индекс 0)
        startOfYear.setDate(1); // Первый день месяца
        
        const endOfYear = new Date(startOfYear);
        endOfYear.setFullYear(endOfYear.getFullYear() + 1);
        endOfYear.setMonth(0); // Возвращаемся к январю
        endOfYear.setDate(0); // Последний день декабря прошлого года
        
        return [startOfYear, endOfYear];
      },
    },
    last_year: {
      text: 'Last Year',
      getTimes() {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
        return [date, new Date()];
      },
    },
    all: {
      text: 'All Time',
      getTimes() {
        const startDate = new Date(2013, 6, 1); // Month is 0-indexed, so 6 represents July
        const endDate = new Date(); // Month is 0-indexed, so 6 represents July
        return [startDate, endDate];
      },
    },
}