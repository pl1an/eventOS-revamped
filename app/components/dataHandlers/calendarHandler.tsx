import { CalendarData, Day, DayLocation, Month, MonthLocation, Year } from "@/app/types/dates";



export function createYear(absolute_year: number, relative_year: number): Year {
    // Creating a new year object
    var new_year: Year = {
        id: `year-${absolute_year}`,
        year_absolute: absolute_year,
        year_index: relative_year,
        months: []
    };
    // Filling the year with empty months
    for(var month_index = 0; month_index < 12; month_index++) {
        var new_month: Month = createMonth(month_index, new_year);
        new_year.months.push(new_month);
    }
    // Returning the new year
    return new_year;
}


export const month_names = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export function createMonth(month: number, year:Year): Month {
    // Creating a new month object
    var new_month: Month = {
        id: `month-${month}-year-${year.year_absolute}`,
        month_name: month_names[month],
        calendar_index:{
            month: month,
            year: year.year_index
        },
        days: []
    };
    // Filling the month with empty days
    var days_in_month = new Date(year.year_absolute, month + 1, 0).getDate();
    for(var day_index = 1; day_index <= days_in_month; day_index++) {
        var new_day: Day = createDay(new Date(year.year_absolute, month, day_index), new_month);
        new_month.days.push(new_day);
    }
    // Returning the new month
    return new_month;
}


export const weekday_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export function createDay(date: Date, month: Month): Day {
    // Creating a new day object
    var new_day: Day = {
        id: `day-${date.getDate()}-month-${month.calendar_index.month}-year-${date.getFullYear()}`,
        date: date,
        weekday: weekday_names[date.getDay()] as Day["weekday"],
        calendar_index:{
            day: date.getDate() - 1,
            month: month.calendar_index.month,
            year: month.calendar_index.year
        },
        commitments:{
            tasks: [],
            events: [],
            purchases: []
        }
    };
    // Returning the new day
    return new_day;
}



export function getParentMonth(day: Day, calendar_data: CalendarData): Month {
    return calendar_data.years[day.calendar_index.year].months[day.calendar_index.month];
}

export function getParentYear(month: Month, calendar_data: CalendarData): Year {
    return calendar_data.years[month.calendar_index.year];
}


export function getDayFromDate(date: Date, calendar_data: CalendarData): Day | null {
    var year = calendar_data.years.find(y => y.year_absolute === date.getFullYear());
    if(!year) return null;
    var month = year.months.find(m => m.calendar_index.month === date.getMonth());
    if(!month) return null;
    var day = month.days.find(d => d.date.getDate() === date.getDate());
    if(!day) return null;
    return day;
}

export function getDayFromLocation(location: DayLocation, calendar_data: CalendarData): Day {
    return calendar_data.years[location.year].months[location.month].days[location.day];
}

export function getMonthFromLocation(location: MonthLocation, calendar_data: CalendarData): Month {
    return calendar_data.years[location.year].months[location.month];
}

