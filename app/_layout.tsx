import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Calendar } from "./pages/calendar";
import { Eventinfo } from "./pages/eventinfo";

import { themes } from "./styles/themes";



export type RootStackParamList = {
    calendar: { selected_year?: number};
    eventinfo: { event_id: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootLayout() {

    const insets = useSafeAreaInsets();
    const style_sheet = StyleSheet.create({
        container:{
            width:"100%",
            height:"100%",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: Math.max(insets.left, 16),
            paddingRight: Math.max(insets.right, 16),
            backgroundColor:themes.default.background
        }
    });
    

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator 
                initialRouteName="calendar" 
                screenOptions={{
                    headerShown:false,
                    presentation: 'transparentModal',
                    contentStyle: style_sheet.container
                }}
            >
                <Stack.Screen name="calendar" component={Calendar} />
                <Stack.Screen name="eventinfo" component={Eventinfo} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    );
}
