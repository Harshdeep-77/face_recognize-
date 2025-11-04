// AddLeadScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function AddLeadScreen({ navigation }) {
  const [leadData, setLeadData] = useState({
    fullName: "",
    companyName: "",
    state: "",
    city: "",
    phoneNo: "",
    inquiryType: "",
    email: "",
  });

  const handleChange = (field, value) => {
    setLeadData({ ...leadData, [field]: value });
  };

const handleSubmit = async () => {
  try {
    const response = await fetch(`https://your-api-url.com/addLead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    });

    const result = await response.json();
    if (response.ok) {
      Alert.alert("Success", "Lead added successfully!");
      navigation.goBack();  
    } else {
      Alert.alert("Error", result.message || "Failed to add lead");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Network Error", "Please check your connection");
  }
};

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add Lead</Text>

        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Lead From Excel</Text>
        </TouchableOpacity>

        <View style={styles.form}>
          {[
            { label: "Full Name", key: "fullName" },
            { label: "Company Name", key: "companyName" },
            { label: "State", key: "state" },
            { label: "City", key: "city" },
            { label: "Phone No", key: "phoneNo" },
            { label: "Inquiry Type", key: "inquiryType" },
            { label: "Email", key: "email" },
          ].map((item) => (
            <View key={item.key} style={styles.inputContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${item.label}`}
                placeholderTextColor="#94a3b8"
                value={leadData[item.key]}
                onChangeText={(text) => handleChange(item.key, text)}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Lead</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  uploadButton: {
    backgroundColor: "#14532d",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  form: { gap: 15 },
  inputContainer: {},
  label: { color: "#fff", fontSize: 16, marginBottom: 6 },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  submitButton: {
    backgroundColor: "#22c55e",
    marginTop: 30,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
