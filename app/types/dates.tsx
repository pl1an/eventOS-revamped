import { Commitment } from "./commitments";


export type Weekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";


export interface DayLocation {
    day: number;
    month: number;
    year: number;
}
export interface Day {
    id: string;
    date: Date;
    weekday: Weekday;
    calendar_index: DayLocation;
    commitments:{
        tasks: Commitment[];
        events: Commitment[];
        purchases: Commitment[];
    };
}

export interface MonthLocation {
    month: number;
    year: number;
}
export interface Month {
    id: string;
    month_name: string;
    calendar_index:{
        month: number;
        year: number;
    }
    days: Day[];
}

export interface Year {
    id: string;
    year_absolute: number;
    year_index: number;
    months: Month[];
}


export interface CalendarData {
    years: Year[];
}