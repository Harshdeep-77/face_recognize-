import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation,useRoute } from "@react-navigation/native";
// import { useNavigation, useRoute } from "@react-navigation/native";
 
const stats = [
  { id: "1", label: "Total Leads", value: "1,249", color: "#3b82f6", icon: "📊" },
  { id: "2", label: "Assigned", value: "856", color: "#10b981", icon: "🧾" },
  { id: "3", label: "Closed", value: "760", color: "#22c55e", icon: "✅" },
  { id: "4", label: "Pending", value: "51", color: "#f97316", icon: "⏳" },
];

 

 

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [teamMembers, setTeamMembers] = useState([
  { id: "1", name: "Harsh Deep", status: "Active" },
  { id: "2", name: "Aryan Verma", status: "Inactive" },
  { id: "3", name: "Diya Patel", status: "Active" },
]);

useEffect(() => {
  if (route.params?.newUser) {
    const newUser = {
      id: Date.now().toString(),
      name: route.params.newUser,
      status: "Active",
    };
    setTeamMembers((prev) => [newUser, ...prev]);
  }
}, [route.params?.newUser]);

  return (
    <LinearGradient colors={["#f0f9ff", "#ffffff"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🌈 Header Section */}
        <LinearGradient
          colors={["#fff", "#b9bae4ff"]}
          style={styles.headerContainer}
        >
          <View style={styles.headerLeft}>
               <Image
            source={require("../logo/skyound.jpg")}
            style={styles.headerLogo}
          />
            <Text style={styles.headerTitle}>Welcome, Harsh 👋</Text>
            <Text style={styles.headerSubtitle}>Dashboard Overview</Text>
          </View>
        
        </LinearGradient>

        {/*  Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: item.color }]}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>
 
        <TouchableOpacity
          style={[styles.tile, { backgroundColor: "#6366f1" }]}
          onPress={() => navigation.navigate("Registration")}
          activeOpacity={0.85}
        >
          <Text style={styles.tileIcon}>📝</Text>
          <Text style={styles.tileText}>Registration</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { backgroundColor: "#8b5cf6" }]}
          onPress={() => navigation.navigate("UserList")}
          activeOpacity={0.85}
        >
          <Text style={styles.tileIcon}>👥</Text>
          <Text style={styles.tileText}>User List</Text>
        </TouchableOpacity>

         <TouchableOpacity
          style={[styles.tile, { backgroundColor: "#8b5cf6" }]}
          onPress={() => navigation.navigate("Markattendance")}
          activeOpacity={0.85}
        >
          <Text style={styles.tileIcon}>👥</Text>
          <Text style={styles.tileText}>Mark Attendance</Text>
        </TouchableOpacity>
          {/* <TouchableOpacity
          style={[styles.tile, { backgroundColor: "#8b5cf6" }]}
          onPress={() => navigation.navigate("AtendanceScreen")}
          activeOpacity={0.85}
        >
          <Text style={styles.tileIcon}>👥</Text>
          <Text style={styles.tileText}>AttendenceScreen</Text>
        </TouchableOpacity> */}

        {/* 👥 Recent Leads */}
        <Text style={styles.subHeader}>Recent Leads</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={teamMembers}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.memberRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.avatar}>{item.name.charAt(0)}</Text>
                  <Text style={styles.memberName}>{item.name}</Text>
                </View>
                <Text
                  style={[
                    styles.memberStatus,
                    { color: item.status === "Active" ? "#10b981" : "#ef4444" },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* 🌈 HEADER SECTION */
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 25,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  headerLeft: {},
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  headerSubtitle: { color: "#e0e7ff", fontSize: 14 },
  headerLogo: {
    width: 300,
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fff",
  },

  /* CARDS SECTION */
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  card: {
    width: "47%",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: "center",
  },
  icon: { fontSize: 28, marginBottom: 8 },
  value: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  label: { color: "#f1f5f9", fontSize: 14, marginTop: 4 },

  /* FULL-WIDTH TILES */
  tile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  tileIcon: { fontSize: 26, marginRight: 10, color: "#fff" },
  tileText: { color: "#fff", fontSize: 18, fontWeight: "600" },

  /* RECENT LEADS */
  subHeader: {
    color: "#1e293b",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
    marginLeft: 20,
  },
  listContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#3b82f6",
    color: "#fff",
    textAlign: "center",
    lineHeight: 35,
    fontWeight: "bold",
    marginRight: 10,
  },
  memberName: { color: "#0f172a", fontSize: 16, fontWeight: "500" },
  memberStatus: { fontWeight: "bold", fontSize: 14 },
});
