import { StyleSheet, Text, View } from "react-native";

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from "react";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from 'react-native-reanimated';
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


    // Handling year change via swipe gestures
    const changeYear = useCallback((delta: number) => {
        setSelectedYear(prev => prev + delta);
    }, []);
    // Use a horizontal pan gesture to change year on swipe end.
    const horizontalPan = Gesture.Pan()
        .onEnd((ev) => {
            const dx = ev.translationX ?? 0;
            if (dx <= -100) runOnJS(changeYear)(1);
            if (dx >= 100) runOnJS(changeYear)(-1);
        });


    return(
        <View>
            <GestureDetector gesture={horizontalPan}>
                <View style={style_sheet.title_view}>
                    <Text style={style_sheet.title_text}> {shown_year?.year_absolute}</Text>
                </View>
            </GestureDetector>
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