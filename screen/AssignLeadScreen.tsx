import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function AssignLeadScreen({ navigation }) {
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    leadType: "",
    unassignedLead: "",
    salesman: "",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

 const handleAssign = async () => {
  const response = await fetch("https://yourapi.com/assignLead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  Alert.alert("API Response", result.message);
};


  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Assign Lead</Text>

        <TextInput
          style={styles.input}
          placeholder="State"
          placeholderTextColor="#9ca3af"
          value={formData.state}
          onChangeText={(value) => handleChange("state", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#9ca3af"
          value={formData.city}
          onChangeText={(value) => handleChange("city", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Lead Type"
          placeholderTextColor="#9ca3af"
          value={formData.leadType}
          onChangeText={(value) => handleChange("leadType", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Unassigned Lead"
          placeholderTextColor="#9ca3af"
          value={formData.unassignedLead}
          onChangeText={(value) => handleChange("unassignedLead", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Salesman List"
          placeholderTextColor="#9ca3af"
          value={formData.salesman}
          onChangeText={(value) => handleChange("salesman", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleAssign}>
          <Text style={styles.buttonText}>Assign Lead</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "#1f2937",
    borderRadius: 10,
    color: "#fff",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#374151",
  },
  button: {
    width: "90%",
    backgroundColor: "#16a34a",
    borderRadius: 10,
    padding: 14,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
