import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

export default function EditContactScreen({ route, navigation }) {
  const { contact, updateContact } = route.params;

  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [image, setImage] = useState(contact.image);

  const handleSave = () => {
    if (!name || !phone) {
      Alert.alert("Invalid Input", "Name and phone fields are required");
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      Alert.alert(
        "Invalid Phone",
        "Phone number must consist of digits only and be exactly 11 characters long."
      );
      return;
    }

    const updatedContact = {
      ...contact,
      name,
      phone,
      image,
    };

    updateContact(updatedContact);
    navigation.navigate("ContactsScreen");
  };
  return (
    <View style={myStyles.container}>
      <TextInput
        style={myStyles.inputs}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={myStyles.inputs}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        maxLength={11}
      />
      <TextInput
        style={myStyles.inputs}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity onPress={handleSave}>
        <Text style={myStyles.button}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    padding: 8,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    color: "white",
    padding: 12,
    textAlign: "center",
    borderRadius: 8,
  },
});
