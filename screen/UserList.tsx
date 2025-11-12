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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const base_url = 'http://192.168.1.20:8000/';
  // const { usernames } = route.params;
  const [users, setUsers] = useState<User[]>([]); //  empty array in strating
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await AsyncStorage.getItem('userToken');

      const url = `${base_url}companyadmin/employees`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type':' application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
         },
         body:'salesman_list=false',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result= await response.json();
      console.log('Fetched Employee Data:', result.data);

      if (Array.isArray(result.data)) {
        setUsers(result);
      } else if (result.data.employees) {
        setUsers(result.data.employees);
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
    }, []),
  );

  const deleteUser = async (username: string) => {
    const companyAlias = 'ed'; // Replace with actual company alias if needed
    try {
      const token = await AsyncStorage.getItem('userToken');

      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete success?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              console.log(
                'Deleting user:',
                username,
                'from company:',
                companyAlias,
              );

              const response = await fetch(
                `http://192.168.1.20:8000/companyadmin/employee?Company_alias=${companyAlias}&username=${username}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              console.log('Delete response status:', response.status);
              console.log('Delete response ok:', response.json());

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
 