import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function UpdateUserScreen({ route, navigation }) {
  const { user } = route.params; // data from UserProfileScreen

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);
  const [aliasName, setAliasName] = useState(user.alias_name);
  const [updatedBy, setUpdatedBy] = useState("admin"); // you can make dynamic later

  const handleUpdate = async () => {
    if (!name || !username || !role) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.1.20:8000/companyadmin/update_employee?name=${name}&username=${username}&role=${role}&id=${user.id}&alias_name=${aliasName}&updated_by=${updatedBy}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      console.log(data)
      console.log(response.status)

      if (response.ok) {
        Alert.alert("Success", "User updated successfully");
        navigation.goBack();  
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update user");
      console.error(error);
    }
  };

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Update Employee</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#94a3b8"
          value={username}
          onChangeText={setUsername}
          editable={false} // keep username fixed
        />

        <TextInput
          style={styles.input}
          placeholder="Role"
          placeholderTextColor="#94a3b8"
          value={role}
          onChangeText={setRole}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
    color: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
