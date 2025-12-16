import { themes } from '@/app/styles/themes';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CalendarData, DayLocation, Month as MonthType } from '../../types/dates';
import { createYear, getDayFromLocation, getMonthFromLocation, getParentYear, weekday_names } from '../dataHandlers/calendarHandler';
import { Day } from './day';



interface MonthProps {
    month?: MonthType;
    calendar_data: CalendarData;
    zoom?: number;
}

export const Month = ({ month, calendar_data, zoom}: MonthProps) => {


    // Creating month rows to display
    const [month_rows, setMonthRows] = React.useState<DayLocation[][]>([]);
    useEffect(() => {
        if(!month || month.days.length === 0) return;
        var rows: DayLocation[][] = [];

        // Filling with past month days if month doesn't start on Sunday
        if(month.days[0].weekday !== "Sunday"){
            var first_day_weekday_index = weekday_names.indexOf(month.days[0].weekday);
            var year: number | undefined = month.calendar_index.year;
            // Finding past year if needed
            if (month.calendar_index.month === 0) {
                year = calendar_data.years.find(y => 
                    y.year_absolute === getParentYear(month, calendar_data).year_absolute - 1
                )?.year_index;
                if(!year){
                    createYear(getParentYear(month, calendar_data).year_absolute - 1, calendar_data.years.length);
                    year = calendar_data.years.length - 1;
                }
            }
            // Getting previous month
            var previous_month = getMonthFromLocation({
                month: (month.calendar_index.month - 1 + 12) % 12,
                year: year
            }, calendar_data);
            // Adding previous month days to first week
            for(var i = first_day_weekday_index - 1; i >= 0; i--) {
                var day_location: DayLocation = {
                    day: previous_month.days.length - i - 1,
                    month: previous_month.calendar_index.month,
                    year: previous_month.calendar_index.year
                };
                if(!rows[0]) rows[0] = [];
                rows[0].push(day_location);
            }

        }

        // Filling rows with weeks
        var row_index = 0;
        month.days.forEach((day) => {
            if(rows[row_index] && rows[row_index].length >= 7) row_index++;
            if(!rows[row_index]) rows[row_index] = [];
            rows[row_index].push(day.calendar_index);
        });
        setMonthRows(rows);

        // Filling all 6 rows to have 7 days
        if(rows.length < 6 || rows[5].length < 7) {
            var last_day_week_day_index = weekday_names.indexOf(month.days[month.days.length - 1].weekday);
            var year: number | undefined = month.calendar_index.year;
            // Finding next year if needed
            if (month.calendar_index.month === 11) {
                year = calendar_data.years.find(y => 
                    y.year_absolute === getParentYear(month, calendar_data).year_absolute + 1
                )?.year_index;
                if(!year){
                    createYear(getParentYear(month, calendar_data).year_absolute + 1, calendar_data.years.length);
                    year = calendar_data.years.length - 1;
                }
            }
            // Getting next month
            var next_month = getMonthFromLocation({
                month: (month.calendar_index.month + 1) % 12,
                year: year
            }, calendar_data);
            // Adding nex month days to fill rows
            var row_index = rows.length - 1;
            var i = 0;
            while(true) {
                var day_location: DayLocation = {
                    day: i,
                    month: next_month.calendar_index.month,
                    year: next_month.calendar_index.year
                };
                if(!rows[row_index]) rows[row_index] = [];
                rows[row_index].push(day_location);
                if(rows[row_index].length >= 7 && row_index >= 5) break;
                if(rows[row_index].length >= 7) row_index++;
                i++;
            }
        }

    }, [month]);


    return(
        <View style={style_sheet.container}>
            <Text style={style_sheet.month_text}>{month? month.month_name : ""}</Text>
            <View style={style_sheet.weekday_names}>
                <FlatList data={weekday_names} horizontal renderItem={({item}) => 
                    <Text style={style_sheet.week_text}>{item}</Text>
                }/>
            </View>
            <FlatList data={month_rows} renderItem={(row)=>
                <FlatList style={style_sheet.month_row} data={row.item} renderItem={(item) => 
                    <Day day={getDayFromLocation(item.item, calendar_data)} pastMonth={item.item.month !== month?.calendar_index.month}></Day>
                }/>
            }/>
        </View>
    );
}


const style_sheet = StyleSheet.create({
    container:{
        width:1400,
        height:995,
        margin:50,
        borderWidth:1,
        borderColor:themes.default.primary,
    },
    month_text:{
        fontSize:30,
        padding:10,
        borderWidth:1,
        borderColor:themes.default.primary,
        color:themes.default.primary,
    },
    month_row:{
        flexDirection:"row"
    },
    weekday_names:{
        height:40,
        overflow:"hidden",
        width:"100%",
        backgroundColor:themes.default.primary,
    },
    week_text:{
        width:200,
        height:40,
        paddingLeft:10,
        textAlign:"left",
        textAlignVertical:"center",
        borderBottomWidth:1,
        color:themes.default.background,
    }
});