import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([
    { id: '1', name: 'Harsh Deep', role: 'Frontend Developer' },
    { id: '2', name: 'Aryan Verma', role: 'Backend Engineer' },
    { id: '3', name: 'Diya Patel', role: 'UI/UX Designer' },
    { id: '4', name: 'Rohit Sharma', role: 'React Native Dev' },
    { id: '5', name: 'Priya Singh', role: 'QA Tester' },
    { id: '6', name: 'Karan Gupta', role: 'Data Analyst' },
    { id: '7', name: 'Sneha Mehta', role: 'Project Manager' },
    { id: '8', name: 'Vikram Rao', role: 'DevOps Engineer' },
    { id: '9', name: 'Ananya Das', role: 'Software Intern' },
    { id: '10', name: 'Ritesh Kumar', role: 'AI Engineer' },
  ]);

  const handleViewProfile = (user) => {
    navigation.navigate('UserProfile', { user });
  };
     

  //handle api data and fatch employee data from api
  
     const fetchEmployeeData = async () => {
       try {
         const response = await fetch('http:// ');
          const data = await response.json();
          console.log('Employee Data:', data);


       }catch (error) {
         console.error('Error fetching employee data:', error);
         Alert.alert('Error', 'Unable to fetch employee data');
       }
      };

    
   
    

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LinearGradient colors={['#1e293b', '#334155']} style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#10b981' }]}
                onPress={() => handleViewProfile(item)}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </LinearGradient>
  );
}

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
  actions: { flexDirection: 'row', gap: 8 },
  button: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  backButton: {
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
