import { Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "@react-navigation/elements";

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


type EventinfoProps = {
    navigation: NativeStackNavigationProp<any>;
};


export const Eventinfo = ({navigation}: EventinfoProps) => {
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: "white"}}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}