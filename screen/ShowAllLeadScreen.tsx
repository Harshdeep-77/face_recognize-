import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
  const [selectedStatus, setSelectedStatus] = useState("active");  

   

  const fetchLeads = async (status = selectedStatus) => {
    try {
      setLoading(true);
      setError(null);
      const username = "yogesh123@";
  const alias_name = "ed";

      const API_URL = `http://192.168.1.20:8000/lead/leads?username=${username}&alias_name=${alias_name}&active=${status}`;

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

  // Refetch when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchLeads(selectedStatus);
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
        return "#ef4444";
      default:
        return "#60a5fa";
    }
  };

  const renderItem = ({ item }: { item: Lead }) => (
    <LinearGradient colors={["#1e293b", "#334155"]} style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
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
          <Text style={{ fontWeight: "600" }}>Status:</Text> {item.status}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: "600" }}>Phone:</Text> {item.contact_id}
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <View
          style={[
            styles.statusPill,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#60a5fa" }]}
          onPress={() => navigation.navigate("ViewLead", { user: item })}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  // UI rendering
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
          <View style={styles.topBar}>
      {/*  Add Lead Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddLeadScreen")}
      >
        <Text style={styles.addButtonText}>＋ Add Lead</Text>
      </TouchableOpacity>

      {/*  Filter Button */}
      <TouchableOpacity
        style={styles.filterButtonTop}
        onPress={() => Alert.alert("Filter", "Filter feature coming soon!")}
      >
        <Text style={styles.filterButtonText}>🔍 Filter</Text>
      </TouchableOpacity>
    </View>

      
      <Text style={styles.header}>📋 All Leads</Text>
        
        
      {/*  Status Filter Buttons */}
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
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#60a5fa",
  },
  activeFilter: {
    backgroundColor: "#60a5fa",
  },
  filterText: {
    color: "#60a5fa",
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#fff",
  },
  searchInput: {
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: { flex: 1 },
  name: { fontSize: 18, fontWeight: "700", color: "#fff" },
  detailText: { color: "#cbd5e1", marginTop: 2 },
  actionContainer: { alignItems: "flex-end", justifyContent: "space-between" },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: { color: "#fff", fontWeight: "bold" },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  emptyText: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 30,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  topBar: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

addButton: {
  backgroundColor: "#10b981",
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 10,
},

addButtonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 14,
},

filterButtonTop: {
  backgroundColor: "#3b82f6",
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 10,
},

filterButtonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 14,
},

});

export default AllLeadsScreen;



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import { useFocusEffect } from '@react-navigation/native'; // For refetching when screen is focused

// // Define the structure of a lead object based on your API response
// type Lead = {
//   id: string;
//   name: string;
//   email: string;
//   status: string; //  'updated', 'Pending', 'dcff'
//   contact_id: string; 
//   company_name: string;
//   assigned_to: string;
//   next_followup: string | null;
//   city:string;
// };

// interface AllLeadsScreenProps {
//     navigation: any;
// }

// const AllLeadsScreen: React.FC<AllLeadsScreenProps> = ({ navigation }) => {
//   const [search, setSearch] = useState("");
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const username = 'yougesh123@';
//       const alias_name = 'ed';
   
//   const API_URL ="http://192.168.1.20:8000/lead/leads?username=yogesh123@&alias_name=ed";;
 
//    const fetchLeads = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(API_URL, {
//         method: 'GET',
//         headers: { Accept: 'application/json' },
//       });
//       const data = await response.json();
//        console.log('Fetched Lead Data:', data);

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // const data = await response.json();
//       // console.log('Fetched Lead Data:', data);

       
//       if (Array.isArray(data.leads)) {
        
//         const mappedLeads: Lead[] = data.leads.map((lead: any) => ({
//           id: String(lead.id),  
//           name: lead.name,
//           email: lead.email || 'N/A',
//           contact_id: lead.contact_id || 'N/A',
//           status: lead.status || 'Unknown',
//           company_name: lead.company_name || 'N/A',
//           assigned_to: lead.assigned_to || 'N/A',
//           next_followup: lead.next_followup,
//           city:lead.city,
//         }));
//         setLeads(mappedLeads);
//       } else {
//         console.warn('Unexpected API format:', data);
//         setLeads([]);
//       }
//     } catch (err: any) {
//       console.error('Fetch Error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//    useFocusEffect(
//     React.useCallback(() => {
//       fetchLeads();
//       return () => {
         
//       };
//     }, [])
//   );

//    const filteredLeads = leads.filter(
//     (item) =>
//       item.name.toLowerCase().includes(search.toLowerCase()) ||
//       item.email.toLowerCase().includes(search.toLowerCase()) ||
//       item.contact_id.includes(search) ||
//       item.company_name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Helper function to determine color based on status
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "updated":
//       case "converted":
//         return "#10b981"; // Green (Success)
//       case "pending":
//       case "nihot": // Based on previous API response
//         return "#facc15"; // Yellow (Warning)
//       case "not interested":
//       case "dcff": // Based on previous API response
//         return "#ef4444"; // Red (High priority/Issue)
//       default:
//         return "#60a5fa"; // Blue (Default/Other)
//     }
//   };

//   // 3. New Card/Row Layout (renderItem)
//   const renderItem = ({ item }: { item: Lead }) => (
//     <LinearGradient colors={['#1e293b', '#334155']} style={styles.card}>
//       <View style={styles.infoContainer}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: '600' }}>Company:</Text> {item.company_name}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: '600' }}>Email:</Text> {item.email}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: '600' }}>city:</Text> {item.city}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: '600' }}>Status:</Text> {item.status}
//         </Text>
//         <Text style={styles.detailText}>
//           <Text style={{ fontWeight: '600' }}>Phone:</Text> {item.contact_id}
//         </Text>
//       </View>

//       <View style={styles.actionContainer}>
//         {/* Status Pill */}
//         <View
//           style={[
//             styles.statusPill,
//             { backgroundColor: getStatusColor(item.status) },
//           ]}
//         >
//           <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
//         </View>

//         {/* View Button */}
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#60a5fa' }]}
//           // Assuming you have a 'LeadDetails' screen defined
//           onPress={() => navigation.navigate('ViewLead', { user: item })} 
//         >
//           <Text style={styles.buttonText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );

//   // Loading State
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#10b981" />
//         <Text style={{ color: '#fff', marginTop: 8 }}>Loading leads...</Text>
//       </View>
//     );
//   }

//    if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: 'red' }}>Error: {error}</Text>
//         <TouchableOpacity onPress={fetchLeads}>
//           <Text style={{ marginTop: 10, color: '#60a5fa', fontWeight: 'bold' }}>Retry Fetch</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
//       <Text style={styles.header}>📋 All Leads</Text>

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
//           <Text style={styles.emptyText}>No leads found. Try a different search.</Text>
//         )}
//       />
//     </LinearGradient>
//   );
// }

// export default AllLeadsScreen;

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     padding: 20 
//   },
//   header: {
//     color: '#fff',
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   searchInput: {
//     backgroundColor: "#1e293b",
//     color: "#fff",
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#334155",
//     fontSize: 16,
//   },
//   card: {
//     borderRadius: 14,
//     padding: 15,
//     marginBottom: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   infoContainer: {
//     flex: 1,
//     marginRight: 10,
//   },
//   actionContainer: {
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//     height: 70,  
//   },
//   name: { 
//     color: '#fff', 
//     fontSize: 18, 
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   detailText: { 
//     color: '#e2e8f0', 
//     fontSize: 13, 
//     marginTop: 2 
//   },
//   button: { 
//     paddingVertical: 6, 
//     paddingHorizontal: 14, 
//     borderRadius: 8,
//     minWidth: 70,
//     alignItems: 'center',
//   },
//   buttonText: { 
//     color: '#fff', 
//     fontWeight: 'bold', 
//     fontSize: 14 
//   },
//   statusPill: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 15,
//     minWidth: 80,
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   statusText: {
//     color: '#0f172a',
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0f172a',
//   },
//   emptyText: {
//     color: '#9ca3af',
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 16,
//   },
// });