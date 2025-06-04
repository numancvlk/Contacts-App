import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useState } from "react";

import { dummyContacts } from "../data/DummyData";

export default function ContactsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const filteredContacts = searchText
    ? dummyContacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      })
    : dummyContacts;

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
              navigation.navigate("ContactDetailScreen", { contact: data.item })
            }
            style={myStyles.item}
          >
            <Text style={myStyles.name}>{data.item.name}</Text>
            <Text style={myStyles.phone}>{data.item.phone}</Text>
          </TouchableOpacity>
        )}
      />
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
});
