// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Alert,
//   FlatList,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import { useFocusEffect } from "@react-navigation/native";

// type Lead = {
//   id: string;
//   name: string;
//   email: string;
//   status: string;
//   contact_id: string;
//   company_name: string;
//   assigned_to: string;
//   next_followup: string | null;
//   city: string;
// };

// interface AllLeadsScreenProps {
//   navigation: any;
// }

// const AllLeadsScreen: React.FC<AllLeadsScreenProps> = ({ navigation }) => {
//   const [search, setSearch] = useState("");
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedStatus, setSelectedStatus] = useState("active");  

   

//   const fetchLeads = async (status = selectedStatus) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const username = "yogesh123@";
//   const alias_name = "ed";

//       const API_URL = `http://192.168.1.20:8000/lead/leads?username=${username}&alias_name=${alias_name}&active=${status}`;

//       const response = await fetch(API_URL, {
//         method: "GET",
//         headers: { Accept: "application/json" },
//       });

//       const data = await response.json();
//       console.log("Fetched Lead Data:", data);

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       if (Array.isArray(data.leads)) {
//         const mappedLeads: Lead[] = data.leads.map((lead: any) => ({
//           id: String(lead.id),
//           name: lead.name,
//           email: lead.email || "N/A",
//           contact_id: lead.contact_id || "N/A",
//           status: lead.status || "Unknown",
//           company_name: lead.company_name || "N/A",
//           assigned_to: lead.assigned_to || "N/A",
//           next_followup: lead.next_followup,
//           city: lead.city,
//         }));
//         setLeads(mappedLeads);
//       } else {
//         console.warn("Unexpected API format:", data);
//         setLeads([]);
//       }
//     } catch (err: any) {
//       console.error("Fetch Error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refetch when screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       fetchLeads(selectedStatus);
//     }, [selectedStatus])
//   );

//   const filteredLeads = leads.filter(
//     (item) =>
//       item.name.toLowerCase().includes(search.toLowerCase()) ||
//       item.email.toLowerCase().includes(search.toLowerCase()) ||
//       item.contact_id.includes(search) ||
//       item.company_name.toLowerCase().includes(search.toLowerCase())
//   );

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "updated":
//       case "converted":
//         return "#10b981";
//       case "pending":
//       case "inprogressive":
//         return "#facc15";
//       case "not interested":
//       case "close":
//         return "#ef4444";
//       default:
//         return "#60a5fa";
//     }
//   };

//   const renderItem = ({ item }: { item: Lead }) => (
//     <LinearGradient colors={["#1e293b", "#334155"]} style={styles.card}>
//       <View style={styles.infoContainer}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: "600" }}>Company:</Text> {item.company_name}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: "600" }}>Email:</Text> {item.email}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: "600" }}>City:</Text> {item.city}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: "600" }}>Status:</Text> {item.status}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: "600" }}>Phone:</Text> {item.contact_id}
//         </Text>
//       </View>

//       <View style={styles.actionContainer}>
//         {/* <View
//           style={[
//             styles.statusPill,
//             { backgroundColor: getStatusColor(item.status) },
//           ]}
//         >
//           <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
//         </View> */}

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: "#60a5fa" }]}
//           onPress={() => navigation.navigate("ViewLead", { user: item })}
//         >
//           <Text style={styles.buttonText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );

//   // UI rendering
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#10b981" />
//         <Text style={{ color: "#fff", marginTop: 8 }}>Loading leads...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "red" }}>Error: {error}</Text>
//         <TouchableOpacity onPress={() => fetchLeads(selectedStatus)}>
//           <Text style={{ marginTop: 10, color: "#60a5fa", fontWeight: "bold" }}>
//             Retry Fetch
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
//           <View style={styles.topBar}>
//       {/*  Add Lead Button */}
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate("AddLeadScreen")}
//       >
//         <Text style={styles.addButtonText}>＋ Add Lead</Text>
//       </TouchableOpacity>

//       {/*  Filter Button */}
//       <TouchableOpacity
//         style={styles.filterButtonTop}
//         onPress={() => Alert.alert("Filter", "Filter feature coming soon!")}
//       >
//         <Text style={styles.filterButtonText}>🔍 Filter</Text>
//       </TouchableOpacity>
//     </View>

      
//       <Text style={styles.header}>📋 All Leads</Text>
        
        
//       {/*  Status Filter Buttons */}
//       <View style={styles.filterContainer}>
//         {["open", "in progress", "closed"].map((status) => (
//           <TouchableOpacity
//             key={status}
//             style={[
//               styles.filterButton,
//               selectedStatus === status && styles.activeFilter,
//             ]}
//             onPress={() => setSelectedStatus(status)}
//           >
//             <Text
//               style={[
//                 styles.filterText,
//                 selectedStatus === status && styles.activeFilterText,
//               ]}
//             >
//               {status.toUpperCase()}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Search */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by Name, Company, or Phone..."
//         placeholderTextColor="#9ca3af"
//         value={search}
//         onChangeText={setSearch}
//       />

//       <FlatList
//         data={filteredLeads}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         ListEmptyComponent={() => (
//           <Text style={styles.emptyText}>
//             No leads found for "{selectedStatus}".
//           </Text>
//         )}
//       />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   filterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   filterButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 18,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#60a5fa",
//   },
//   activeFilter: {
//     backgroundColor: "#60a5fa",
//   },
//   filterText: {
//     color: "#60a5fa",
//     fontWeight: "600",
//   },
//   activeFilterText: {
//     color: "#fff",
//   },
//   searchInput: {
//     backgroundColor: "#1e293b",
//     color: "#fff",
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 12,
//   },
//   card: {
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   infoContainer: { flex: 1 },
//   name: { fontSize: 18, fontWeight: "700", color: "#fff" },
//   detailText: { color: "#cbd5e1", marginTop: 2 },
//   actionContainer: { alignItems: "flex-end", justifyContent: "space-between" },
//   statusPill: {
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//   },
//   statusText: { color: "#fff", fontWeight: "bold" },
//   button: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginTop: 6,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   emptyText: {
//     textAlign: "center",
//     color: "#94a3b8",
//     marginTop: 30,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#0f172a",
//   },
//   topBar: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: 10,
// },

// addButton: {
//   backgroundColor: "#10b981",
//   paddingVertical: 8,
//   paddingHorizontal: 14,
//   borderRadius: 10,
// },

// addButtonText: {
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: 14,
// },

// filterButtonTop: {
//   backgroundColor: "#3b82f6",
//   paddingVertical: 8,
//   paddingHorizontal: 14,
//   borderRadius: 10,
// },

// filterButtonText: {
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: 14,
// },

// });

// export default AllLeadsScreen;

 


import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert, // <-- you were using Alert already; adding import here
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

type Lead = {
  id: string;
  name: string;
  email: string;
  status: string;
  contact_id: string;
  company_name: string;
  assigned_to: string;
  next_followup: string | null;
  city: string;
};

interface AllLeadsScreenProps {
  navigation: any;
}

const AllLeadsScreen: React.FC<AllLeadsScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   const [selectedStatus, setSelectedStatus] = useState("open");

   const [menuForId, setMenuForId] = useState<string | null>(null);

  const fetchLeads = async (status = selectedStatus) => {
    try {
      setLoading(true);
      setError(null);

      const username = "yogesh123@";
      const alias_name = "ed";

        const API_URL = `http://192.168.1.20:8000/lead/leads?username=${username}&alias_name=${alias_name}&active=${encodeURIComponent(
        status
      )}`;

      const response = await fetch(API_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const data = await response.json();
      console.log("Fetched Lead Data:", data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (Array.isArray(data.leads)) {
        const mappedLeads: Lead[] = data.leads.map((lead: any) => ({
          id: String(lead.id),
          name: lead.name,
          email: lead.email || "N/A",
          contact_id: lead.contact_id || "N/A",
          status: lead.status || "Unknown",
          company_name: lead.company_name || "N/A",
          assigned_to: lead.assigned_to || "N/A",
          next_followup: lead.next_followup,
          city: lead.city,
        }));
        setLeads(mappedLeads);
      } else {
        console.warn("Unexpected API format:", data);
        setLeads([]);
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

   useFocusEffect(
    React.useCallback(() => {
      fetchLeads(selectedStatus);
       setMenuForId(null);
    }, [selectedStatus])
  );

  const filteredLeads = leads.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.contact_id.includes(search) ||
      item.company_name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "updated":
      case "converted":
        return "#10b981";
      case "pending":
      case "inprogressive":
        return "#facc15";
      case "not interested":
      case "close":
      case "closed":
        return "#ef4444";
      default:
        return "#60a5fa";
    }
  };

 
  const handleAssign = (lead: Lead) => {
    setMenuForId(null);
    
    navigation.navigate("AssignLead", { lead });
  };
 

  const handleClose = (lead: Lead) => {
    setMenuForId(null);
    Alert.alert(
      "Close Lead",
      `Are you sure you want to close "${lead.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Close", onPress: () => closeLeadOnServer(lead.id) },
      ]
    );
  };

  const closeLeadOnServer = async (leadId: string) => {
  try {
    const username = "yogesh123@";  
    const alias_name = "ed";

    const API_URL = `http://192.168.1.20:8000/lead/lead/${leadId}?alias_name=${alias_name}&username=${encodeURIComponent(username)}`;

    const response = await fetch(API_URL, {
      method: "DELETE",  
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
     });

    const data = await response.json();
    console.log("Close API Response:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Failed to close lead");
    }

     setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: "closed" } : lead
      )
    );

    Alert.alert("Success", "Lead closed successfully.");
  } catch (error: any) {
    console.error("Close API Error:", error);
    Alert.alert("Error", error.message || "Something went wrong.");
  }
};


  const renderItem = ({ item }: { item: Lead }) => (
    <LinearGradient colors={["#1e293b", "#334155"]} style={styles.card}>
      {/* Top row: Name  status pill + three-dot button */}
      <View style={styles.cardTopRow}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.topRight}>
          <View
            style={[styles.statusPill, { backgroundColor: getStatusColor(item.status) }]}
          >
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>

            {/* THREE-DOT MENU BUTTON */}
            <TouchableOpacity
              style={styles.dotsButton}
              onPress={() => setMenuForId((prev) => (prev === item.id ? null : item.id))}
            >
              <Text style={styles.dotsText}>⋯</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <View style={styles.infoContainer}>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: "600" }}>Company:</Text> {item.company_name}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: "600" }}>Email:</Text> {item.email}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: "600" }}>City:</Text> {item.city}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: "600" }}>Phone:</Text> {item.contact_id}
        </Text>
      </View>

      {/* Actions Row */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#60a5fa" }]}
          onPress={() => navigation.navigate("ViewLead", { user: item })}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* DROPDOWN MENU   */}
     {menuForId === item.id && (
  <View style={styles.menuContainer}>
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setMenuForId(null);
        navigation.navigate("EditLead", { lead: item });
      }}
    >
      <Text style={styles.menuItemText}>Edit</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setMenuForId(null);
        Alert.alert(
          "Delete Lead",
          `Are you sure you want to delete "${item.name}"?`,
          [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Close",
          onPress: () => closeLeadOnServer(item.id),
        },
      ]
        );
      }}
    >
      <Text style={styles.menuItemText}>Delete</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem} onPress={() => handleAssign(item)}>
      <Text style={styles.menuItemText}>Assign</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem} onPress={() => handleClose(item)}>
      <Text style={[styles.menuItemText, { color: "#ef4444" }]}>Close</Text>
    </TouchableOpacity>
  </View>
)}

    </LinearGradient>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={{ color: "#fff", marginTop: 8 }}>Loading leads...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
        <TouchableOpacity onPress={() => fetchLeads(selectedStatus)}>
          <Text style={{ marginTop: 10, color: "#60a5fa", fontWeight: "bold" }}>
            Retry Fetch
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddLeadScreen")}
        >
          <Text style={styles.addButtonText}>＋ Add Lead</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButtonTop}
          onPress={() => Alert.alert("Filter", "Filter feature coming soon!")}
        >
          <Text style={styles.filterButtonText}>🔍 Filter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>📋 All Leads</Text>

      {/* Status Filter */}
      <View style={styles.filterContainer}>
        {["open", "in progress", "closed"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              selectedStatus === status && styles.activeFilter,
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === status && styles.activeFilterText,
              ]}
            >
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name, Company, or Phone..."
        placeholderTextColor="#9ca3af"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredLeads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            No leads found for "{selectedStatus}".
          </Text>
        )}
        // auto-close menu when scrolling (nice UX)
        onScrollBeginDrag={() => setMenuForId(null)}
      />
    </LinearGradient>
  );
};

export default AllLeadsScreen;

 
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  topBar: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  addButton: { backgroundColor: "#10b981", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  addButtonText: { color: "#fff", fontWeight: "700" },
  filterButtonTop: { backgroundColor: "#1f2937", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  filterButtonText: { color: "#fff", fontWeight: "700" },
  header: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 10 },

  filterContainer: { flexDirection: "row", gap: 8, marginBottom: 10 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 18, backgroundColor: "#374151" },
  activeFilter: { backgroundColor: "#10b981" },
  filterText: { color: "#e5e7eb", fontWeight: "700" },
  activeFilterText: { color: "#111827" },

  searchInput: {
    backgroundColor: "#111827",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
  },

  card: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 14,
    position: "relative", // important for the dropdown absolute positioning
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  topRight: { flexDirection: "row", alignItems: "center", gap: 8 },

  name: { color: "#fff", fontSize: 18, fontWeight: "800" },
  infoContainer: { marginTop: 4 },
  detailText: { color: "#cbd5e1", marginTop: 4 },

  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: { color: "#0b1020", fontWeight: "800", fontSize: 10 },

  actionContainer: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  button: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  buttonText: { color: "#fff", fontWeight: "700" },

  // three-dot button
  dotsButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  dotsText: { color: "#e5e7eb", fontSize: 18, marginTop: -2 },

  // dropdown menu anchored to the card's top-right
  menuContainer: {
  position: "absolute",
  top: 30,
  right: 8,
  backgroundColor: "#fff",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 4,
  width: 140,
  zIndex: 10,
},
menuItem: {
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderBottomWidth: 1,
  borderBottomColor: "#e5e7eb",
  backgroundColor: "#fff"
},
menuItemText: {
  color: "#111",
  fontSize: 15,
  fontWeight: "600",
},
menuItemActive: {
  backgroundColor: "#e0f2fe",
},


  emptyText: { color: "#94a3b8", textAlign: "center", marginTop: 30 },
});
