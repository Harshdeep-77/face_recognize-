import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Employeeattendace({ route }) {
  const { username } = route.params;
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
      console.log(" Employee screen opened for user:", username);

    fetchAttendance(); 

    const interval = setInterval(() => {
      fetchAttendance();
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  const fetchAttendance = async () => {
    try {
      console.log("Fetching attendance for username:", username);

      const res = await fetch(`http://192.168.1.20:8000/attendence/employee_attendence?username=${username}`);
      console.log('Response status:', res.status);

      const data = await res.json();
      console.log('Full API response:', data); 
      setAttendance(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.log('Error fetching attendance:', error);
      setRawData({ error: error.message });
    } finally {
      setLoading(false);
    }
    
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (attendance.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>No attendance records found.</Text>
      </View>
    );
  }
    // try {
    //   const res = await fetch(
    //     `http://192.168.1.20:8000/attendence/employee_attendence?username=${username}`,
    //   );
    //   console.log('Login response status:', res.status);
    //   console.log('respose', res);
    //   console.log('Login response headers:', res.headers);
    //   const data = await res.json();
    //   setAttendance(data);

    //   //  if (Array.isArray(data)) {
    //   //   setAttendance(data);
    //   // } else if (data?.attendance) {
    //   //   setAttendance(data.attendance);
    //   // } else {
    //   //   setAttendance([]);
    //   // }
    // } catch (error) {
    //   console.log('Error fetching attendance:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <Text style={styles.header}>My Attendance</Text>

      <FlatList
        data={attendance}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>👤 {item.name}</Text>
            <Text style={styles.detail}>🧾 Username: {item.username}</Text>
            <Text
              style={[
                styles.status,
                { color: item.status === 'Present' ? '#10b981' : '#ef4444' },
              ]}
            >
              {item.status}
            </Text>
            <Text style={styles.detail}>📅 Date: {item.date}</Text>
            <Text style={styles.detail}>
              ⏰ Time: {new Date(item.time).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
