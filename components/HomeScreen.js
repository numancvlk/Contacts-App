import { View, Text, StyleSheet, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={myStyle.container}>
      <Text>Home Screen</Text>
      <Button
        title="CONTACTS"
        onPress={() => navigation.navigate("ContactsScreen")}
      />
    </View>
  );
}

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
