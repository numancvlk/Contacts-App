import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//------------------COMPONENTS----------------------
import HomeScreen from "./components/HomeScreen";
import ContactsScreen from "./components/ContactsScreen";
import ContactDetailScreen from "./components/ContactDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName="Home" uygulamanın hangi sayfayla başlayacağı */}
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="ContactsScreen"
          component={ContactsScreen}
          options={{
            title: "Contacts",
          }}
        />
        <Stack.Screen
          name="ContactDetailScreen"
          component={ContactDetailScreen}
          options={{ title: "Contact Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
