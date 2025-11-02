import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function UserProfileScreen({ route, navigation }) {
  const { user } = route.params;

  // Optionally show initials if no profile picture
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      {/* Header Section */}
      <LinearGradient colors={["#3b82f6", "#06b6d4"]} style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </LinearGradient>

      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          {user.image ? (
            <Image source={{ uri: user.image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>

          <View style={styles.detailBox}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>
              {user.email ? user.email : "harshdeep@gmail.com "}
            </Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{user.id}</Text>
          </View>
        </View>
      </View>

       
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>⬅ Back to Users</Text>
      </TouchableOpacity> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },

  header: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },

  card: {
    marginTop: -40,
    backgroundColor: "#1e293b",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#38bdf8",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  avatarText: {
    fontSize: 32,
    color: "#e2e8f0",
    fontWeight: "bold",
  },

  infoContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    color: "#f8fafc",
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 20,
  },

  detailBox: {
    width: "100%",
    backgroundColor: "#334155",
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    color: "#94a3b8",
  },
  value: {
    fontSize: 16,
    color: "#f8fafc",
    fontWeight: "500",
    marginTop: 3,
  },

  backButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 30,
    elevation: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
