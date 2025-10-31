import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function AttendanceLog() {
  const [filter, setFilter] = useState("week");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Logs</Text>

      {/* Search */}
      <TextInput
        placeholder="Search by date"
        placeholderTextColor="#8899A8"
        style={styles.searchInput}
      />

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === "week" && styles.activeBtn]}
          onPress={() => setFilter("week")}
        >
          <Text style={[styles.btnText, filter === "week" && styles.activeText]}>
            This Week
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === "month" && styles.activeBtn]}
          onPress={() => setFilter("month")}
        >
          <Text style={[styles.btnText, filter === "month" && styles.activeText]}>
            This Month
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === "custom" && styles.activeBtn]}
          onPress={() => setFilter("custom")}
        >
          <Text style={[styles.btnText, filter === "custom" && styles.activeText]}>
            Custom
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Total Hours</Text>
        <Text style={styles.statValue}>40:30</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Avg. Daily Hours</Text>
        <Text style={styles.statValue}>8:06</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Late Days</Text>
        <Text style={[styles.statValue, { color: "#ffbd42" }]}>2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
    padding: 18,
  },
  title: {
    color: "#E6EEF8",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18,
  },
  searchInput: {
    backgroundColor: "#162032",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterBtn: {
    backgroundColor: "#1d283a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeBtn: {
    backgroundColor: "#2296FF",
  },
  btnText: {
    color: "#8899A8",
    fontSize: 13,
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  statCard: {
    backgroundColor: "#131d2e",
    padding: 20,
    borderRadius: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#213045",
  },
  statLabel: {
    color: "#9fb0c1",
    fontSize: 14,
    marginBottom: 6,
  },
  statValue: {
    color: "#E6EEF8",
    fontSize: 26,
    fontWeight: "700",
  },
});
