import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
// import { AttendanceContext } from './AttendanceContext'; 

export default function AttendanceScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const username = "Harsh Deep";
    // const { markPresent } = useContext(AttendanceContext); 
const handleMarkAttendance = () => {
    Alert.alert("Attendance Marked", `Marked attendance for ${username}`);
    navigation.navigate("Dashboard", { newUser: username });
  };

  // Camera options
  const cameraOptions = {
    mediaType: 'photo',
    quality: 0.8,
    includeBase64: true,
    saveToPhotos: false,
  };

  // Open camera function
  const openCamera = async () => {
    try {
      const res = await launchCamera(cameraOptions);
      if (res.didCancel) return;
      if (res.errorCode) {
        Alert.alert('Camera Error', res.errorMessage || res.errorCode);
        return;
      }

      if (res.assets && res.assets.length > 0) {
        const asset = res.assets[0];
        setPhoto(asset.uri || `data:${asset.type};base64,${asset.base64}`);
        Alert.alert('Captured', 'Face captured successfully');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Unable to open camera');
    }
  };

  // Mark attendance (simulate for now)
  const markAttendance = async () => {
    if (!photo) {
      Alert.alert('No Image', 'Please capture your face first ');
      return;
    }

    setLoading(true);
    try {

       
    const formData = new FormData();
    formData.append('file', {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
      const response = await fetch('http://192.168.1.20:8000/companyadmin/similarity_search', {
      method: 'POST',
      body: formData,
      headers:{
        'Content-Type':'multipart/form-data',
      }
      
    });

    console.log('Status:', response.status);
         const result = await response.json();
         console.log('API Response:', result);

if (String(result.status).toLowerCase() === "true") {
  Alert.alert(
    "Attendance Marked",
    `Welcome ${result.username}! Your attendance has been recorded successfully.`
  );
      setPhoto(null);
    } else {
      Alert.alert(' Failed', 'Face not recognized. Try again.');
    }

      setPhoto(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mark Attendance</Text>
      <Text style={styles.subtitle}>Click the button below to capture your face</Text>

      <View style={styles.cameraBox}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Camera Preview Placeholder</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.btn} onPress={openCamera}>
        <Text style={styles.btnText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#10b981' }]}
        onPress={markAttendance}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText} onPress={handleMarkAttendance}>Mark Attendance</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#b5c0cd',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraBox: {
    height: 260,
    backgroundColor: '#071026',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1f3340',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholder: { padding: 10 },
  placeholderText: { color: '#94a3b8', textAlign: 'center' },
  previewImage: { width: '100%', height: '100%', borderRadius: 10 },
  btn: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  backBtn: {
    backgroundColor: '#475569',
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
