import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { dummyContacts } from "../data/DummyData";

export default function ContactsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [contact, setContact] = useState(dummyContacts);

  const filteredContacts = searchText
    ? contact.filter((contact) => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      })
    : contact;

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem("contacts");
        if (storedContacts !== null) {
          setContact(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.log("AsyncStorage get error: ", error);
      }
    };

    loadContacts();
  }, []);

  const addNewContact = async (newContact) => {
    try {
      setContact((prevContact) => {
        const updatedContacts = [...prevContact, newContact];
        AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
        return updatedContacts;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeScreen = () => {
    return navigation.navigate("AddContactScreen", {
      addContact: addNewContact,
    });
  };

  const deleteContact = async (id) => {
    const updated = contact.filter((c) => c.id !== id);
    setContact(updated);
    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updated));
    } catch (err) {
      console.log("Silme sırasında hata oluştu:", err);
    }
  };

  const updateContact = async (updated) => {
    try {
      setContact((prev) => {
        const updatedContacts = prev.map((c) =>
          c.id === updated.id ? updated : c
        );
        AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
        return updatedContacts;
      });
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.screenTitle}>All Contacts</Text>
      <TextInput
        style={myStyles.searchBar}
        inputMode="search"
        placeholder="Search for a person"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(data) => data.id}
        renderItem={(data) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContactDetailScreen", {
                contactData: data.item,
                deleteContact: deleteContact,
                updateContact: updateContact,
              })
            }
            style={myStyles.item}
          >
            <Text style={myStyles.name}>{data.item.name}</Text>
            <Text style={myStyles.phone}>{data.item.phone}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={myStyles.floatingButton} onPress={changeScreen}>
        <Text style={myStyles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 8,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "flex-start",
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  floatingButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
