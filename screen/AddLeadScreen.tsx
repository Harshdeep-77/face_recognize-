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
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
// import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddLeadScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  const base_url=`http://192.168.1.20:8000/`;

  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    city: '',
    state: '',
    contect_1: '',
    inquery_type: '',
    email: '',
    requirement: '',
    progress: 'cold',
    alias_name: 'ed',
    stage: 'open',
  });

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null); //For bulk upload file

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.contect_1 || !formData.company_name) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);

      // Create URL with query params
      const queryParams = new URLSearchParams(formData as any).toString();
      const API_URL = `http://192.168.1.20:8000/lead/lead?${queryParams}`;

      console.log('Final API URL:', API_URL);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        Alert.alert('Success', 'Lead added successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to add lead.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilePick = async () => {
    try {
      // const res = await DocumentPicker.pickSingle({
      //   // type: [
      //   //   DocumentPicker.types.csv,
      //   //   DocumentPicker.types.xls,
      //   //   DocumentPicker.types.xlsx,
      //   // ],
      // });
      // setSelectedFile(res);
      // console.log('Selected file:', res);
    } catch (err) {
      // if (DocumentPicker.isCancel(err)) {
      //   console.log('File selection cancelled.');
      // } else {
      //   console.error(err);
      //   Alert.alert('Error', 'Failed to pick file.');
      // }
    }
  };

  const handleBulkUpload = async () => {
      

    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });

      const response = await fetch(
        'http://192.168.1.20:8000/lead/bulk_upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      const data = await response.json();
      console.log('Bulk upload response:', data);

      if (response.ok) {
        Alert.alert('Success', 'Bulk leads uploaded successfully!');
        setSelectedFile(null);
      } else {
        Alert.alert('Error', data.message || 'Failed to upload leads.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Something went wrong while uploading.');
    } finally {
      setLoading(false);
    }
  };
  const downloadCsvFile= async ()=>{
    try{
    const token = await AsyncStorage.getItem('userToken'); 
    const API_URL=base_url+"lead/leads/csv";
    
    const fileName = `leads_${Date.now()}.csv`;
    const filePath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const response = await fetch(API_URL, {
          method: 'GET',
          headers: { Accept: 'application/json',
          Authorization:`Bearer ${token}` },
        });

        // console.log("csv file is ",response);
        
    if (!response.ok) {
      throw new Error(`Failed to download CSV. Status: ${response.status}`);
    }
       // Convert response to blob
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

      await RNFS.writeFile(filePath, buffer.toString('utf8'), 'utf8');
       Alert.alert(
            'Download Complete 🎉',
            `File saved to ${filePath}`,
            [
              {
                text: 'OK',
              },
            ]
          );
       console.log('✅ CSV saved at:', filePath);
      }catch (error) {
      console.log('Error to download csv:', error);
       
    } 


  }
  return (
    <LinearGradient colors={['#f8fafc', '#f1f5f9']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Leads</Text>
        <Text style={styles.subtitle}>Add leads manually or in bulk</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'manual' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('manual')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'manual' && styles.activeTabText,
              ]}
            >
              Add Manually
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'bulk' && styles.activeTab]}
            onPress={() => setActiveTab('bulk')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'bulk' && styles.activeTabText,
              ]}
            >
              Bulk Upload
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'manual' && (
          <>
            {/* Input Fields */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Customer Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={t => handleChange('name', t)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter company name"
                placeholderTextColor="#9ca3af"
                value={formData.company_name}
                onChangeText={t => handleChange('company_name', t)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter state"
                placeholderTextColor="#9ca3af"
                value={formData.state}
                onChangeText={t => handleChange('state', t)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                placeholderTextColor="#9ca3af"
                value={formData.city}
                onChangeText={t => handleChange('city', t)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter contact number"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                value={formData.contect_1}
                onChangeText={t => handleChange('contect_1', t)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Enquiry Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter enquiry type"
                placeholderTextColor="#9ca3af"
                value={formData.inquery_type}
                onChangeText={t => handleChange('inquery_type', t)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={t => handleChange('email', t)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Requirement</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter requirement"
                placeholderTextColor="#9ca3af"
                multiline
                value={formData.requirement}
                onChangeText={t => handleChange('requirement', t)}
              />
            </View>

            {/* Buttons */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.addButtonText}>Add Lead</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
        {activeTab === 'bulk' && (
          <View style={{ marginTop: 20 }}>
            {/* Section Header */}
            <Text style={styles.bulkTitle}>Upload file</Text>
            <Text style={styles.bulkSubtitle}>
              Upload a CSV or Excel file  
            </Text>

            {/* File Picker */}
            <TouchableOpacity
              style={styles.filePickerButton}
              onPress={handleFilePick}
            >
              <Text style={styles.filePickerText}>
                {selectedFile ? selectedFile.name : 'Choose File'}
              </Text>
              <Text style={styles.filePickerHint}>
                Tap to select your CSV or Excel file
              </Text>
            </TouchableOpacity>

            {/* Show file details if selected */}
            {selectedFile && (
              <View style={styles.fileDetailsContainer}>
                <Text style={styles.fileDetailsText}>
                  📄 {selectedFile.name}
                </Text>
                <Text style={styles.fileDetailsText}>
                  Type: {selectedFile.type}
                </Text>
                <Text style={styles.fileDetailsText}>
                  Size: {(selectedFile.size / 1024).toFixed(2)} KB
                </Text>
              </View>
            )}

            {/* CSV Template Download */}
            <View style={styles.csvContainer}>
              <Text style={styles.csvLabel}>Don’t have a CSV file?</Text>
              <TouchableOpacity
                style={styles.csvButton}
                onPress={() => {downloadCsvFile }}
              >
                <Text style={styles.csvButtonText}>
                  ⬇ Download CSV Template
                </Text>
              </TouchableOpacity>
            </View>

            {/* Upload Button */}
            <TouchableOpacity
              style={[styles.addButton, { marginTop: 30 }]}
              onPress={handleBulkUpload}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.addButtonText}>Upload Leads</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 4 },
  subtitle: { color: '#6b7280', marginBottom: 20 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: { color: '#475569', fontWeight: '600' },
  activeTab: { backgroundColor: '#047857' },
  activeTabText: { color: '#fff' },
  formGroup: { marginBottom: 15 },
  label: { color: '#1e293b', marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: '#fff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#111827',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  addButton: {
    backgroundColor: '#047857',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderColor: '#047857',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#047857',
    fontWeight: '600',
  },// Add below your existing styles
bulkTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#111827',
  marginBottom: 6,
},
bulkSubtitle: {
  color: '#6b7280',
  marginBottom: 20,
  fontSize: 14,
},

filePickerButton: {
  backgroundColor: '#f1f5f9',
  borderRadius: 10,
  paddingVertical: 20,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#cbd5e1',
  marginBottom: 15,
  elevation: 2,
},
filePickerText: {
  color: '#111827',
  fontWeight: '700',
  fontSize: 16,
},
filePickerHint: {
  color: '#6b7280',
  fontSize: 13,
  marginTop: 5,
},

fileDetailsContainer: {
  backgroundColor: '#ecfdf5',
  borderColor: '#34d399',
  borderWidth: 1,
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
},
fileDetailsText: {
  color: '#065f46',
  fontSize: 14,
},

csvContainer: {
  backgroundColor: '#e0f2fe',
  padding: 20,
  borderRadius: 10,
  marginTop: 25,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#bae6fd',
},
csvLabel: {
  color: '#0c4a6e',
  marginBottom: 10,
  fontWeight: '600',
},
csvButton: {
  backgroundColor: '#0284c7',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},
csvButtonText: {
  color: '#fff',
  fontWeight: '700',
},

});

export default AddLeadScreen;
