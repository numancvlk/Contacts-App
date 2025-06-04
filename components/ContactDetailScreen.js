import { View, Text, StyleSheet, Image } from "react-native";

export default function ContactDetailScreen({ route }) {
  const { contact } = route.params;
  return (
    <View style={myStyles.container}>
      <Image style={myStyles.image} source={{ uri: contact.image }} />
      <Text style={myStyles.name}>{contact.name}</Text>
      <Text style={myStyles.phone}>{contact.phone}</Text>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 28, fontWeight: "bold" },
  phone: { fontSize: 20, marginTop: 10 },
  image: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
});
