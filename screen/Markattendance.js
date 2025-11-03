import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function MarkAttendanceScreen() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.20:8000/attendence/attendence',
      );
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#f0f9ff', '#ffffff']} style={styles.container}>
      <Text style={styles.header}>📋 Attendance Records</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchAttendance}>
        <Text style={styles.refreshText}>🔄 Refresh</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" />
      ) : (
        <FlatList
          data={attendanceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}></Text>
              <Text style={styles.detail}>
                ⏰ Time:{' '}
                {new Date(item.time).toLocaleTimeString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                })}
              </Text>
              <Text style={styles.time}>⏰ {item.date}</Text>
              <Text
                style={[
                  styles.status,
                  { color: item.status === 'Present' ? '#10b981' : '#ef4444' },
                ]}
              >
                {item.status}
              </Text>
            </View>
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  time: { fontSize: 14, color: '#6b7280' },
  status: { fontSize: 16, fontWeight: '600' },
  refreshButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#6366f1',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  refreshText: { color: '#fff', fontWeight: '600' },
});
