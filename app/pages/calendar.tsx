import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { RootStackParamList } from "../_layout";
import { Month } from "../components/calendar/month";
import { createYear } from "../components/dataHandlers/calendarHandler";

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CalendarData, Year } from "../types/dates";

import { themes } from "../styles/themes";


type CalendarProps = {
    navigation: NativeStackNavigationProp<any>;
};

export const Calendar = ({ navigation }: CalendarProps) => {
    const route = useRoute<RouteProp<RootStackParamList, 'calendar'>>();
    const selected_year = route.params?.selected_year ?? new Date().getFullYear();

    // Year selectiond and creation logic
    const [calendar_data, setCalendarData] = useState<CalendarData>({years: []});
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


    // Year changing logic
    const changeYear = useCallback((delta: number) => {
        navigation.navigate('calendar', {selected_year: selected_year + delta});
    }, [navigation, selected_year]);
    // Handling year change via swipe gestures
    const swipeGesture =  Gesture.Pan().onEnd((event) => {
        if(event.translationX <= -100) runOnJS(changeYear)(1);
        if(event.translationX >= 100) runOnJS(changeYear)(-1);
    });


    // Using zoom view to hide year title
    const zoom_level = useSharedValue(0.085);
    const zoomable_view_ref = useRef<ReactNativeZoomableView | null>(null);
    const title_offset_y = useSharedValue(0);

    const title_animated_style = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: title_offset_y.value }],
            opacity: interpolate(title_offset_y.value, [0, 60], [1, 0])
        };
    });

    return(
        <View style={{flex:1}}>
            <View style={style_sheet.zoom_container}>
                <ReactNativeZoomableView 
                    ref={zoomable_view_ref}
                    bindToBorders={false} 
                    initialZoom={0.085}
                    minZoom={0} maxZoom={10} 
                    movementSensibility={1}
                    disableMomentum={true}
                    onZoomAfter={(event, g_state, z_event) => {
                        zoom_level.value = z_event.zoomLevel;
                        if (z_event.zoomLevel >= 0.085) title_offset_y.value = withTiming(2 * 60, {duration:300});
                        else title_offset_y.value = withTiming(0, {duration:300});
                        return false;
                    }}
                >
                    <View style={style_sheet.year_rows}>
                        <Month month={shown_year?.months[0]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[1]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[2]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                    </View>
                    <View style={style_sheet.year_rows}>
                        <Month month={shown_year?.months[3]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[4]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[5]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                    </View>
                    <View style={style_sheet.year_rows}>
                        <Month month={shown_year?.months[6]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[7]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[8]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                    </View>
                    <View style={style_sheet.year_rows}>
                        <Month month={shown_year?.months[9]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[10]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                        <Month month={shown_year?.months[11]} calendar_data={calendar_data} zoom={zoom_level}></Month>
                    </View>
                </ReactNativeZoomableView>
            </View>
            <Animated.View style={[style_sheet.title_view, title_animated_style, {bottom:0}]}>
                <GestureDetector gesture={swipeGesture}>
                    <Text style={[style_sheet.title_text, { lineHeight: 60 }]}> {shown_year?.year_absolute}</Text>
                </GestureDetector>
            </Animated.View>
        </View>
    )
}



const style_sheet = StyleSheet.create({
    zoom_container:{
        width:"100%",
        flex:1,
    },
    title_view:{
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.default.background,
        zIndex:10,
    },
    title_text:{
        width: "100%",
        marginLeft: -13,
        textAlign:"center",
        includeFontPadding:false,
        color:"white",
        fontSize:50,
        fontWeight:"bold",
    },
    year_rows:{
        flexDirection: 'row',
        margin: 100,
    },
});