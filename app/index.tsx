import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootLayout from "./_layout";


export default function Index() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootLayout />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}