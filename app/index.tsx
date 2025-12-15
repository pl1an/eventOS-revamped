import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootLayout from "./_layout";


export default function Index() {

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <NavigationContainer>
                    <RootLayout />
                </NavigationContainer>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}