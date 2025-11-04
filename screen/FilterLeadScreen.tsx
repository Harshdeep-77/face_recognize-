import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "@react-native-picker/picker";

export default function FilterLeadScreen({ navigation }) {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [leadType, setLeadType] = useState("");
  const [salesman, setSalesman] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleFilter = () => {
    console.log("Filter Data:", { state, city, leadType, salesman, assignee });
    // Later this will call API and show filtered leads
  };

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <LinearGradient colors={["#14532d", "#166534"]} style={styles.header}>
        <Text style={styles.headerText}>Filter Lead</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* State */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>State</Text>
          <Picker
            selectedValue={state}
            onValueChange={(itemValue) => setState(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select State" value="" />
            <Picker.Item label="Punjab" value="punjab" />
            <Picker.Item label="Haryana" value="haryana" />
            <Picker.Item label="Delhi" value="delhi" />
          </Picker>
        </View>

        {/* City */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>City</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select City" value="" />
            <Picker.Item label="Ludhiana" value="ludhiana" />
            <Picker.Item label="Ambala" value="ambala" />
            <Picker.Item label="Delhi" value="delhi" />
          </Picker>
        </View>

        {/* Lead Type */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Lead Type</Text>
          <Picker
            selectedValue={leadType}
            onValueChange={(itemValue) => setLeadType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Lead Type" value="" />
            <Picker.Item label="Hot" value="hot" />
            <Picker.Item label="Warm" value="warm" />
            <Picker.Item label="Cold" value="cold" />
          </Picker>
        </View>

        {/* Salesman */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Salesman</Text>
          <Picker
            selectedValue={salesman}
            onValueChange={(itemValue) => setSalesman(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Salesman" value="" />
            <Picker.Item label="Ravi" value="ravi" />
            <Picker.Item label="Amit" value="amit" />
          </Picker>
        </View>

        {/* Assignee */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Assignee</Text>
          <Picker
            selectedValue={assignee}
            onValueChange={(itemValue) => setAssignee(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Assignee" value="" />
            <Picker.Item label="Harsh" value="harsh" />
            <Picker.Item label="Deepak" value="deepak" />
          </Picker>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleFilter}>
          <Text style={styles.buttonText}>Apply Filter</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  formContainer: {
    padding: 20,
  },
  inputBox: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 5,
  },
  picker: {
    color: "#f8fafc",
  },
  button: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
