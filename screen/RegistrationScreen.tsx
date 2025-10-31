import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  StyleSheet, Alert, ScrollView 
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
 

export default function RegistrationScreen({ navigation }) {
  const [companyAlias, setCompanyAlias] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [photo, setPhoto] = useState({uri:'',type:'',fileName:''});
  const [loading, setLoading] = useState(false);

  const cameraOptions = {
    mediaType: 'photo',
    quality: 0.8,
    includeBase64: false,
  };

  // Open camera
  const openCamera = async () => {
    const result = await launchCamera(cameraOptions);
    if (result.didCancel || !result.assets) return;
    setPhoto(result.assets[0]);
  };

  // Open gallery
  const openGallery = async () => {
    const result = await launchImageLibrary(cameraOptions);
    if (result.didCancel || !result.assets) return;
    setPhoto(result.assets[0]);
  };

  // Upload employee data
  const saveEmployee = async () => {
    if (!companyAlias || !name || !username || !password || !role || !createdBy || !photo) {
      Alert.alert('Missing Info', 'Please fill all fields and select a photo.');
      return;
    }

       

    setLoading(true);

    try {
      const formData = new FormData();
         formData.append('photo', {
        uri: photo.uri,
        type: photo.type || 'image/jpeg',
        name: photo.fileName || 'employee_photo.jpg',
      });

  //     formData.append('Company_alias', "ed");
  // formData.append('name'," name");
  // formData.append('username', "username");
  // formData.append('password', "password");
  // formData.append('role', "role");
  // formData.append('created_by', "createdBy");
  // formData.append('photo', {
  //   uri: photo.uri,
  //   type: 'image/jpeg', // or 'image/png'
  //   name: 'photo.jpg',
  // });
      // formData.append('file', {
      //   uri: photo.uri,
      //   type: photo.type || 'image/jpeg',
      //   name: photo.fileName || 'employee_photo.jpg',
      // });

const query = `Company_alias=${companyAlias}&name=${name}&username=${username}&password=${password}&role=${role}&created_by=${createdBy}`;
      const response = await fetch(`http://192.168.1.20:8000/companyadmin/employee?${query}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
         
      });

      if (response.ok) {
        Alert.alert('Success', 'Employee registered successfully!');
        setCompanyAlias('');
        setName('');
        setUsername('');
        setPassword('');
        setRole('');
        setCreatedBy('');
        setPhoto({});
      } else {
        const err = await response.text();
        Alert.alert('Error', err || 'Failed to register employee.');
      }
    } catch (error) {
      Alert.alert('Error',error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Employee Registration</Text>

        <TextInput 
          placeholder="Company Alias"
          placeholderTextColor="#9CA3AF"
          value={companyAlias}
          onChangeText={setCompanyAlias}
          style={styles.input}
        />

        <TextInput 
          placeholder="Full Name"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput 
          placeholder="Username"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput 
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />

        <TextInput 
          placeholder="Role"
          placeholderTextColor="#9CA3AF"
          value={role}
          onChangeText={setRole}
          style={styles.input}
        />

        <TextInput 
          placeholder="Created By"
          placeholderTextColor="#9CA3AF"
          value={createdBy}
          onChangeText={setCreatedBy}
          style={styles.input}
        />

        <View style={styles.cameraBox}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.previewImage} />
          ) : (
            <Text style={styles.placeholderText}>No Photo Selected</Text>
          )}
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, styles.blue]} onPress={openCamera}>
            <Text style={styles.btnText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.cyan]} onPress={openGallery}>
            <Text style={styles.btnText}>Gallery</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.btn, styles.green]} 
          onPress={saveEmployee} 
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading ? 'Registering...' : 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#0f172a', padding: 20 },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  cameraBox: {
    height: 200,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { color: '#94a3b8' },
  previewImage: { width: '100%', height: '100%', borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  btn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  blue: { backgroundColor: '#3b82f6' },
  cyan: { backgroundColor: '#06b6d4' },
  green: { backgroundColor: '#10b981' },
  btnText: { color: '#fff', fontWeight: '600' },
});
