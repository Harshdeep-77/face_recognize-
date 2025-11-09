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

const AddLeadScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');

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
  },
});

export default AddLeadScreen;






// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import LinearGradient from 'react-native-linear-gradient';

// const AddLeadScreen = ({ navigation }: any) => {
//   const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');

//   const [formData, setFormData] = useState({
//     name: "",
//     company_name: "",
//     city: "",
//     phoneNo: "",
//     inquiryType: "",
//     state: "",
//     contect_1: "",
//     inquery_type: "",
//     email: "",
//     requirement: "",
//     progress: "cold",
//     alias_name: "ed",
//     stage: "inprogressive",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (key: string, value: string) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.contect_1 || !formData.company_name) {
//       Alert.alert('Validation Error', 'Please fill all required fields.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const queryParams = new URLSearchParams(formData as any).toString();
//       const API_URL = `http://192.168.1.20:8000/lead/lead?${queryParams}`;

//       const response = await fetch(API_URL, 
//         { method: 'POST' ,
//           headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json', // Good practice to add this
//         },
//           body: JSON.stringify(formData),

//         });
//       const data = await response.json();
//       console.log('api data is', data);
//       if (response.ok) {
//         Alert.alert('Success', 'Lead added successfully!', [
//           { text: 'OK', onPress: () => navigation.goBack() },
//         ]);
//       } else {
//         Alert.alert('Error', data.message || 'Something went wrong.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add lead.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LinearGradient colors={['#f8fafc', '#f1f5f9']} style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <Text style={styles.title}>Add Leads</Text>
//         <Text style={styles.subtitle}>Add leads manually or in bulk</Text>

//         {/* Tabs */}
//         <View style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === 'manual' && styles.activeTab,
//             ]}
//             onPress={() => setActiveTab('manual')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === 'manual' && styles.activeTabText,
//               ]}
//             >
//               Add Manually
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'bulk' && styles.activeTab]}
//             onPress={() => setActiveTab('bulk')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === 'bulk' && styles.activeTabText,
//               ]}
//             >
//               Bulk Upload
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {activeTab === 'manual' && (
//           <>
//             {/* Input Fields */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Customer Name</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.name}
//                 onChangeText={t => handleChange('name', t)}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Company Name</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.company_name}
//                 onChangeText={t => handleChange('company_name', t)}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>State</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.state}
//                 onChangeText={t => handleChange('state', t)}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>City</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.city}
//                 onChangeText={t => handleChange('city', t)}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Contact Number</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 keyboardType="phone-pad"
//                 value={formData.contact_1}
//                 onChangeText={t => handleChange('contact_1', t)}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Enquiry Type</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.enquiry_type}
//                 onChangeText={t => handleChange('enquiry_type', t)}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Email ID</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.email}
//                 onChangeText={t => handleChange('email', t)}
//               />
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Progress</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.progress}
//                 onChangeText={t => handleChange('progress', t)}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Requirement</Text>
//               <TextInput
//                 style={[styles.input, styles.textArea]}
//                 multiline
//                 placeholder="Placeholder"
//                 placeholderTextColor="#9ca3af"
//                 value={formData.requirement}
//                 onChangeText={t => handleChange('requirement', t)}
//               />
//             </View>

//             {/* Buttons */}
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.addButtonText}>Add Lead</Text>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => navigation.goBack()}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 4 },
//   subtitle: { color: '#6b7280', marginBottom: 20 },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   tabButton: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   tabText: { color: '#475569', fontWeight: '600' },
//   activeTab: { backgroundColor: '#047857' },
//   activeTabText: { color: '#fff' },
//   formGroup: { marginBottom: 15 },
//   label: { color: '#1e293b', marginBottom: 6, fontWeight: '600' },
//   input: {
//     backgroundColor: '#fff',
//     borderColor: '#cbd5e1',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     color: '#111827',
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderColor: '#cbd5e1',
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   addButton: {
//     backgroundColor: '#047857',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   cancelButton: {
//     backgroundColor: '#fff',
//     borderColor: '#047857',
//     borderWidth: 1,
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   cancelButtonText: {
//     textAlign: 'center',
//     color: '#047857',
//     fontWeight: '600',
//   },
// });

// export default AddLeadScreen;
