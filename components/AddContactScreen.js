import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

export default function AddContactScreen({ navigation, route }) {
  const { addContact } = route.params;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!name || !phone) {
      setError("İsim zorunludur.");
      return;
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone)) {
      setError("Telefon numarası 11 haneli ve sadece rakamlardan oluşmalıdır.");
      return;
    }

    const newContact = {
      id: Date.now().toString(),
      name: name,
      phone: phone,
      image: image,
    };

    addContact(newContact);
    setName("");
    setPhone("");
    setImage("");
    setError("");
    navigation.goBack();
  };

  return (
    <View style={myStyles.container}>
      {error ? <Text style={myStyles.errorText}>{error}</Text> : null}

      <TextInput
        style={myStyles.inputs}
        placeholder="İsim"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setError("");
        }}
      />
      <TextInput
        style={myStyles.inputs}
        placeholder="Telefon (11 haneli)"
        value={phone}
        keyboardType="numeric"
        onChangeText={(text) => {
          setPhone(text);
          setError("");
        }}
        maxLength={11}
      />
      <TextInput
        style={myStyles.inputs}
        placeholder="Resim URL"
        value={image}
        onChangeText={setImage}
      />
      <TouchableOpacity style={myStyles.addButton} onPress={handleAdd}>
        <Text style={myStyles.addButtonText}>Add Contact</Text>
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
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    fontWeight: "bold",
  },
});
