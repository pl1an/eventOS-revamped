import { Commitment } from "./commitments";


export interface Day {
    id: string;
    date: Date;
    weekday: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
    calendar_index:{
        day: number;
        month: number;
        year: number;
    }
    commitments:{
        tasks: Commitment[];
        events: Commitment[];
        purchases: Commitment[];
    };
}

export interface Month {
    id: string;
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