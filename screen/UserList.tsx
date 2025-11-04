import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';


// Define a TypeScript type for your user
type User = {
  id: string;
  name: string;
  role: string;
  company_alias: string;
  username: string;
};

interface UserListScreenProps {
  navigation: any;
}

const UserListScreen: React.FC<UserListScreenProps> = ({ navigation }) => {
  // const { usernames } = route.params;
  const [users, setUsers] = useState<User[]>([]); //  empty array in strating
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const username = 'yogesh123@';
      const alias_name = 'ed';

      const url = `http://192.168.1.20:8000/companyadmin/employees?username=${username}&alias_name=${alias_name}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('Fetched Employee Data:', data);

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data.employees) {
        setUsers(data.employees);
      } else {
        console.warn('Unexpected API format:', data);
      }
    } catch (err: any) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchEmployeeData();
  // }, []);
  useFocusEffect(
  React.useCallback(() => {
    fetchEmployeeData();
  }, [])
);

  const deleteUser = async (username:string ) => {
    const companyAlias = 'ed'; // Replace with actual company alias if needed
    try {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete success?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              console.log('Deleting user:', username, 'from company:', companyAlias);
              
              const response = await fetch(
                `http://192.168.1.20:8000/companyadmin/employee?Company_alias=${companyAlias}&username=${username}`,
                {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                },
              );
                  
              if (response.ok) {
                Alert.alert('Success', `${username} deleted successfully!`);
                
                setUsers(prev => prev.filter(u => u.username !== username));
              } else {
                const errorText = await response.text();
                Alert.alert('Error', errorText || 'Failed to delete user');
              }
            },
          },
        ],
      );
    } catch (err) {
      console.error('Delete Error:', err);
      Alert.alert('Error', 'Something went wrong while deleting the user.');
    }
  };

  // Step 6: Handle user profile view
  const handleViewProfile = (user: User) => {
    navigation.navigate('UserProfile', { user });
  };

  //  Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={{ color: '#fff', marginTop: 8 }}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchEmployeeData}>
          <Text style={{ marginTop: 10, color: '#60a5fa' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: User }) => (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#10b981' }]}
        onPress={() => handleViewProfile(item)}
      >
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ef4444' }]}
        onPress={() => deleteUser(item.username)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <Text style={styles.header}>Employee List</Text>

      <FlatList
        data={users}
        keyExtractor={item => item.username}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </LinearGradient>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  name: { color: '#fff', fontSize: 18, fontWeight: '600' },
  role: { color: '#94a3b8', fontSize: 14, marginTop: 4 },
  button: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
});

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// export default function UserListScreen({ navigation }) {
//   const [error, setError] = useState(null);
//   const [loding, setLoading] = useState(true);
//   const [users, setUsers] = useState([
//     { id: '1', name: 'Harsh Deep', role: 'Frontend Developer' },
//     { id: '2', name: 'Aryan Verma', role: 'Backend Engineer' },
//     { id: '3', name: 'Diya Patel', role: 'UI/UX Designer' },
//     { id: '4', name: 'Rohit Sharma', role: 'React Native Dev' },
//     { id: '5', name: 'Priya Singh', role: 'QA Tester' },
//     { id: '6', name: 'Karan Gupta', role: 'Data Analyst' },
//     { id: '7', name: 'Sneha Mehta', role: 'Project Manager' },
//     { id: '8', name: 'Vikram Rao', role: 'DevOps Engineer' },
//     { id: '9', name: 'Ananya Das', role: 'Software Intern' },
//     { id: '10', name: 'Ritesh Kumar', role: 'AI Engineer' },
//   ]);

//   const handleViewProfile = user => {
//     navigation.navigate('UserProfile', { user });
//   };

//   //handle api data and fatch employee data from api

//   const fetchEmployeeData = async () => {
//     try {
//       const response = await fetch('http:// ');
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data: User[] = await response.json();
//       console.log('Employee Data:', data);
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchEmployeeData();
//   }, []);

//   const renderItem = ({ item }: { item: User }) => (
//     <View style={styles.card}>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.role}>Role: {item.role}</Text>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={() => handleViewProfile(item)}>
//         <Text style={styles.buttonText}>View Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text>Loading users...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: 'red' }}>Error: {error}</Text>
//         <TouchableOpacity onPress={fetchEmployeeData}>
//           <Text style={{ marginTop: 10, color: 'blue' }}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
//       <FlatList
//         data={users}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <LinearGradient colors={['#1e293b', '#334155']} style={styles.card}>
//             <View>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.role}>{item.role}</Text>
//             </View>
//             <View style={styles.actions}>
//               <TouchableOpacity
//                 style={[styles.button, { backgroundColor: '#10b981' }]}
//                 onPress={() => handleViewProfile(item)}
//               >
//                 <Text style={styles.buttonText}>View</Text>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>
//         )}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: {
//     color: '#fff',
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
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
//   name: { color: '#fff', fontSize: 18, fontWeight: '600' },
//   role: { color: '#94a3b8', fontSize: 14, marginTop: 4 },
//   actions: { flexDirection: 'row', gap: 8 },
//   button: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
//   buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
//   backButton: {
//     backgroundColor: '#334155',
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });
