import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, TextInput, Alert } from "react-native";

const ApiScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // To hold the selected item for update
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [viewMode, setViewMode] = useState("initial"); // To manage different views: 'initial', 'list', 'add'

  const APICAL = async () => {
    setLoading(true);
    try {
      const url = "http://192.168.200.20:3000/users";
      let result = await fetch(url);
      result = await result.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
  }, []);

  const handleDelete = async (id) => {
    const url = `http://192.168.200.20:3000/users/${id}`;
    try {
      await fetch(url, {
        method: "DELETE",
      });
      setData(data.filter((item) => item.id !== id));
      Alert.alert("Success", "Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
      Alert.alert("Error", "Failed to delete record. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !age.trim() || !email.trim()) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const url = `http://192.168.200.20:3000/users/${selectedItem.id}`;
    const updatedData = { id: selectedItem.id, name, age, email };

    try {
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      setData(data.map((item) => (item.id === selectedItem.id ? updatedData : item)));
      setSelectedItem(null);
      setName("");
      setAge("");
      setEmail("");
      setViewMode("list"); // Switch back to list view
      Alert.alert("Success", "Record updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      Alert.alert("Error", "Failed to update record. Please try again.");
    }
  };

  const handleEditPress = (item) => {
    setSelectedItem(item);
    setName(item.name);
    setAge(item.age.toString());
    setEmail(item.email);
    setViewMode("add"); // Show the update form
  };

  const handleAddData = () => {
    setName("");
    setAge("");
    setEmail("");
    setSelectedItem(null);
    setViewMode("add"); // Show the add form
  };

  const handleSaveNewData = async () => {
    if (!name.trim() || !age.trim() || !email.trim()) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const newData = { name, age, email };
    try {
      const url = `http://192.168.200.20:3000/users`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      APICAL(); // Refresh data
      setViewMode("list"); // Switch back to list view
      Alert.alert("Success", "Record added successfully!");
    } catch (error) {
      console.error("Error adding data:", error);
      Alert.alert("Error", "Failed to add record. Please try again.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.age}</Text>
      <Text style={styles.body}>{item.email}</Text>
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
      <Button title="Update" onPress={() => handleEditPress(item)} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {viewMode === "initial" && (
        <>
          <Button title="Load Data" onPress={() => { APICAL(); setViewMode("list"); }} />
          <Button title="Add Data" onPress={handleAddData} />
        </>
      )}

      {viewMode === "list" && (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}

      {viewMode === "add" && (
        <View style={styles.updateForm}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Age"
            value={age}
            keyboardType="numeric"
            onChangeText={(text) => setAge(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email} 
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <Button title={selectedItem ? "Save Update" : "Submit"} onPress={selectedItem ? handleUpdate : handleSaveNewData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: "#333",
  },
  updateForm: {
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ApiScreen;
