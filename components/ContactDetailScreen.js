import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function ContactDetailScreen({ route, navigation }) {
  const { contactData, deleteContact } = route.params;

  const handleDelete = () => {
    Alert.alert(
      "Delete Contact",
      "Are you sure delete this contact?",
      [
        {
          text: "No",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deleteContact(contactData.id), navigation.goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={myStyles.container}>
      <Image style={myStyles.image} source={{ uri: contactData.image }} />
      <Text style={myStyles.name}>{contactData.name}</Text>
      <Text style={myStyles.phone}>{contactData.phone}</Text>

      <View>
        <TouchableOpacity style={myStyles.deleteButton} onPress={handleDelete}>
          <Text style={myStyles.deleteButtonText}>Delete Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
