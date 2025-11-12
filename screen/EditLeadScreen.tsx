import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const progressOption=["hot","warm","cold","po raised"];
const stageOption=["open","closed","in progress"]

const EditLeadScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const lead: any = route.params?.lead;

  const [formData, setFormData] = useState({
    lead_id: lead?.id || '',
    username: 'yogesh123@', // or from logged-in user
    alias_name: 'ed',
    name: lead?.name || '',
    company_name: lead?.company_name || '',
    contect_1: lead?.contact_1 || '',
    inquery_type: lead?.inquery_type || '',
    email: lead?.email || '',
    requirement: lead?.requirement || '',
    status: lead?.status || '',
    assigned_to: lead?.assigned_to || '',
    progress: lead?.progress || '',
    stage: lead?.stage || '',
    next_followup: lead?.next_followup || '',
    city: lead?.city || '',
    state: lead?.state || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    try {
           const token = await AsyncStorage.getItem('userToken'); 

      setLoading(true);
       console.log("form data is ",formData)
      const formBody = Object.keys(formData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
      .join('&');
      // Convert formData to query params
      // const query = new URLSearchParams(formData).toString();
      const API_URL = `http://192.168.1.20:8000/lead/update_lead`;

      console.log('Update API URL:', formBody);
       


      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
           'Content-Type':'application/x-www-form-urlencoded',
          Authorization:`Bearer ${token}`
        },
        body:formBody
      });

      const data = await response.json();
      console.log('Update API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update lead');
      }

      Alert.alert('Success', 'Lead updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('Update Lead Error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Edit Lead</Text>

      {Object.keys(formData).map((key, index) => {
  if (['lead_id', 'alias_name', 'username'].includes(key)) return null;

  const readOnlyKeys = ['company_name', 'city', 'contect_1', 'state', 'email', 'created_at', 'updated_at'];

  return (
    <View key={index} style={styles.formGroup}>
      <Text style={styles.label}>{key.replace(/_/g, ' ').toUpperCase()}</Text>

      {/* 👇 Dropdown for 'progress' field */}
      {key === 'progress' ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData[key]}
            onValueChange={itemValue => handleChange(key, itemValue)}
            dropdownIconColor="#10b981"
          >
            <Picker.Item label="Select Progress" value="" />
            {progressOption.map((option, i) => (
              <Picker.Item key={i} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ) : key === 'stage' ? ( // 👇 Dropdown for 'stage' field
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData[key]}
            onValueChange={itemValue => handleChange(key, itemValue)}
            dropdownIconColor="#10b981"
          >
            <Picker.Item label="Select Stage" value="" />
            {stageOption.map((option, i) => (
              <Picker.Item key={i} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ) : (
        // 👇 Default TextInput for other fields
        <TextInput
          style={styles.input}
          value={String(formData[key])}
          onChangeText={text => handleChange(key, text)}
          placeholder={`Enter ${key}`}
          placeholderTextColor="#9ca3af"
          editable={!readOnlyKeys.includes(key)}
        />
      )}
    </View>
  );
})}

        {loading ? (
          <ActivityIndicator size="large" color="#10b981" style={{ marginTop: 16 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Lead</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default EditLeadScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 16, textAlign: 'center' },
  formGroup: { marginBottom: 12 },
  label: { color: '#e5e7eb', marginBottom: 4, fontWeight: '600' },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#10b981',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
  },
  pickerContainer: {
  backgroundColor: '#1e293b',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#334155',
  color: '#fff',
},

  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 },
});
