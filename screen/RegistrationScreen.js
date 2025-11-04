import React, { useState, useEffect, use } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { Picker } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function RegistrationScreen({ navigation }) {
  const [companyAlias, setCompanyAlias] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [photo, setPhoto] = useState({ uri: '', type: '', fileName: '' });
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          'http://192.168.1.20:8000/companyadmin/role',
        );
        const data = await response.json();
        setRoles(data); // Example response: [{id:1, role:'Admin'}, {id:2, role:'HR'}]
      } catch (error) {
        console.error('Error fetching roles:', error);
        Alert.alert('Error', 'Failed to fetch roles from server.');
      }
    };

    fetchRoles();
  }, []);

  const cameraOptions = {
    mediaType: 'photo',
    quality: 0.8,
    includeBase64: false,
  };

  const photoSteps = ['Front', 'Left Side', 'Right Side', 'Top View'];

  const openCamera = async () => {
    if (photos.length >= photoSteps.length) {
      Alert.alert(
        'All Photos Taken',
        'You have already captured all 4 photos.',
      );
      return;
    }

    const currentStep = photoSteps[photos.length];

    Alert.alert('Capture Required', `Please take the ${currentStep} photo.`, [
      {
        text: 'Open Camera',
        onPress: async () => {
          const result = await launchCamera(cameraOptions);
          if (result.didCancel || !result.assets) return;

          setPhotos(prev => [...prev, result.assets[0]]);
          const nextIndex = photos.length + 1;

          if (nextIndex < photoSteps.length) {
            Alert.alert(
              'Next Photo',
              `Now capture the ${photoSteps[nextIndex]} photo.`,
            );
          } else {
            Alert.alert('Done!', 'All 4 photos captured successfully.');
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openGallery = async () => {
    if (photos.length >= 4) {
      Alert.alert('Limit Reached', 'You can only upload 4 photos.');
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.didCancel || !result.assets) return;

    const selectedPhoto = result.assets[0];
    setPhotos(prev => [...prev, selectedPhoto]);

    Alert.alert(
      'Photo Added',
      `You selected ${photos.length + 1} of 4 required photos.`,
    );
  };

  // Upload employee data
  const saveEmployee = async () => {
    if (
      !companyAlias ||
      !name ||
      !username ||
      !password ||
      !role ||
      !createdBy ||
      photos.length < 4
    ) {
      Alert.alert(
        'Missing Info',
        'Please fill all fields and upload 4 photo photo.',
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      photos.forEach(photo => {
        formData.append('photos', {
          uri: photo.uri,
          type: photo.type || 'image/jpeg',
          name: photo.fileName || 'employee_photo.jpg',
        });
      });

      const query = `Company_alias=${companyAlias}&name=${name}&username=${username}&password=${password}&role=${role}&created_by=${createdBy}`;
      const response = await fetch(
        `http://192.168.1.20:8000/companyadmin/employee?${query}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.ok) {
        Alert.alert('Success', 'Employee registered successfully!');
        setCompanyAlias('');
        setName('');
        setUsername('');
        setPassword('');
        setRole('');
        setCreatedBy('');
        setPhotos([]);
      } else {
        const err = await response.text();
        Alert.alert('Error', err || 'Failed to register employee.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
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

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Select Role</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={role}
              dropdownIconColor="#fff"
              style={styles.picker}
              onValueChange={itemValue => setRole(itemValue)}
            >
              <Picker.Item label="Select Role" value="" color="#9CA3AF" />
              {roles.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.role}
                  value={item.role.toLowerCase()}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* <TextInput
          placeholder="Role"
          placeholderTextColor="#9CA3AF"
          value={role}
          onChangeText={setRole}
          style={styles.input}
        /> */}

        <TextInput
          placeholder="Created By"
          placeholderTextColor="#9CA3AF"
          value={createdBy}
          onChangeText={setCreatedBy}
          style={styles.input}
        />

        <View style={styles.cameraBox}>
          {photos.length > 0 ? (
            <View style={styles.photoGrid}>
              {photos.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img.uri }}
                  style={styles.previewImages}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.placeholderText}>No Photos Selected</Text>
          )}
        </View>
        {/* <View style={styles.cameraBox}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.previewImage} />
          ) : (
            <Text style={styles.placeholderText}>No Photo Selected</Text>
          )}
        </View> */}

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.btn, styles.blue]}
            onPress={openCamera}
          >
            <Text style={styles.btnText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.cyan]}
            onPress={openGallery}
          >
            <Text style={styles.btnText}>Gallery</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.btn, styles.green]}
          onPress={saveEmployee}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Registering...' : 'Register'}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          onPress={goBackToWelcome} 
          style={[styles.btn, { backgroundColor: '#f87171', marginTop: 10 }]}
        >
          <Text style={styles.btnText}>← Back to Welcome</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.backBtn} onPress={goBackToWelcome}>
  <Text style={styles.btnText}>← Back to Welcome</Text>
</TouchableOpacity> */}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
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
  btnText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  backBtn: {
    backgroundColor: '#475569',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  previewImages: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  pickerWrapper: {
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  picker: {
    color: '#fff',
    height: Platform.OS === 'ios' ? 180 : 50,
    width: '100%',
  },
});
