import { themes } from "@/app/styles/themes"
import { Day as DayType } from "@/app/types/dates"
import { StyleSheet, Text, View } from "react-native"


interface DayProps {
    day?: DayType
    pastMonth?: boolean
}

export const Day = ({day, pastMonth}: DayProps) => {
    return(
        <View style={style_sheet.container}>
            <Text style={
                {...style_sheet.number_text, color: pastMonth ? themes.default.secondary : themes.default.primary}
            }>{day ? day.calendar_index.day + 1 : ""}</Text>
        </View>
    );
}


const style_sheet = StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop: 5,
        width:200,
        height:150,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor: themes.default.primary,
    },
    number_text:{
        fontSize:20,
        color:themes.default.primary,
    },
    itemlist:{
        marginTop:10,
        flex:1,
    }
});