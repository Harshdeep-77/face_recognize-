import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "@react-native-picker/picker";

const AddLeadScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    city: "",
    state: "",
    contect_1: "",
    inquery_type: "",
    email: "",
    requirement: "",
    progress: "cold",
    alias_name: "ed",
    active: "inprogressive",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.company_name || !formData.contect_1) {
      Alert.alert("Validation Error", "Please fill required fields!");
      return;
    }

    try {
      setLoading(true);

      const queryParams = new URLSearchParams(formData as any).toString();
      const API_URL = `http://192.168.1.20:8000/lead/lead?${queryParams}`;

      console.log("Submitting Lead to:", API_URL);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
      });

      const data = await response.json();
      console.log("Add Lead Response:", data);

      if (response.ok) {
        Alert.alert("✅ Success", "Lead added successfully!", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Add Lead Error:", error);
      Alert.alert("Error", "Failed to add lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>➕ Add New Lead</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#9ca3af"
          value={formData.name}
          onChangeText={(t) => handleChange("name", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#9ca3af"
          value={formData.company_name}
          onChangeText={(t) => handleChange("company_name", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#9ca3af"
          value={formData.city}
          onChangeText={(t) => handleChange("city", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          placeholderTextColor="#9ca3af"
          value={formData.state}
          onChangeText={(t) => handleChange("state", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
          value={formData.contect_1}
          onChangeText={(t) => handleChange("contect_1", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Inquiry Type"
          placeholderTextColor="#9ca3af"
          value={formData.inquery_type}
          onChangeText={(t) => handleChange("inquery_type", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={formData.email}
          onChangeText={(t) => handleChange("email", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Requirement"
          placeholderTextColor="#9ca3af"
          value={formData.requirement}
          onChangeText={(t) => handleChange("requirement", t)}
        />

        {/* Progress Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Progress</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.progress}
              onValueChange={(itemValue) => handleChange("progress", itemValue)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Cold" value="cold" />
              <Picker.Item label="Warm" value="warm" />
              <Picker.Item label="Hot" value="hot" />
            </Picker>
          </View>
        </View>

        {/* Active Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Active</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.active}
              onValueChange={(itemValue) => handleChange("active", itemValue)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Open" value="open" />
              <Picker.Item label="Inprogressive" value="in progress" />
              <Picker.Item label="Close" value="closed" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Save Lead</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdownLabel: {
    color: "#cbd5e1",
    marginBottom: 4,
    fontWeight: "600",
  },
  pickerWrapper: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
  },
  picker: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddLeadScreen;
