import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";

import { createYear } from "../components/dataHandlers/calendarHandler";
import { CalendarData, Year } from "../types/dates";



type CalendarProps = {
    navigation: NativeStackNavigationProp<any>;
};

export const Calendar = ({ navigation }: CalendarProps) => {


    // Year selectiond and creation logic
    const [calendar_data, setCalendarData] = useState<CalendarData>({years: []});
    const [selected_year, setSelectedYear] = useState<number>(2024);
    const [shown_year, setShownYear] = useState<Year>();
    // When selected year changes, update shown year and calendar data if needed
    useEffect(() => {
        var existing_year = calendar_data.years.find(year => year.year_absolute === selected_year);
        if(!existing_year) {
            var new_year = createYear(selected_year, calendar_data.years.length);
            setCalendarData(prev_data => ({...prev_data, years: [...prev_data.years, new_year]}));
            existing_year = new_year;
        }
        setShownYear(existing_year);
    }, [selected_year]);


    return(
        <View>
            <View style={style_sheet.title_view}>
                <Text style={style_sheet.title_text}> {shown_year?.year_absolute}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedYear(prev => prev - 1)}>
                <Text style={{color: "white"}}>Previous Year</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedYear(prev => prev + 1)}>
                <Text style={{color: "white"}}>Next Year</Text>
            </TouchableOpacity>
        </View>
    )
}



const style_sheet = StyleSheet.create({
    title_view:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
    },
    title_text:{
        color:"white",
        fontSize:50,
        fontWeight:"bold"
    }
});