import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const [leadStatus, setLeadStatus] = useState('all');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [enquiryType, setEnquiryType] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleApply = () => {
    const filters = { leadStatus, state, city, enquiryType, assignedTo };
    onApply(filters);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Filters</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Lead Status */}
            <Text style={styles.label}>Lead Status</Text>
            <View style={styles.radioGroup}>
              {['all', 'open', 'in progress', 'close'].map(status => (
                <TouchableOpacity
                  key={status}
                  style={styles.radioOption}
                  onPress={() => setLeadStatus(status)}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      leadStatus === status && styles.radioOuterSelected,
                    ]}
                  >
                    {leadStatus === status && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioLabel}>{status.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Dropdowns */}
            <Text style={styles.label}>State</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={state}
                onValueChange={value => setState(value)}
                dropdownIconColor="#fff"
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Delhi" value="Delhi" />
                <Picker.Item label="Maharashtra" value="Maharashtra" />
              </Picker>
            </View>

            <Text style={styles.label}>City</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={city}
                onValueChange={value => setCity(value)}
                dropdownIconColor="#fff"
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Mumbai" value="Mumbai" />
                <Picker.Item label="Pune" value="Pune" />
              </Picker>
            </View>

            <Text style={styles.label}>Enquiry Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={enquiryType}
                onValueChange={value => setEnquiryType(value)}
                dropdownIconColor="#fff"
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Product" value="product" />
                <Picker.Item label="Service" value="service" />
              </Picker>
            </View>

            <Text style={styles.label}>Assigned To</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={assignedTo}
                onValueChange={value => setAssignedTo(value)}
                dropdownIconColor="#fff"
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yogesh" value="yogesh" />
                <Picker.Item label="Rahul" value="rahul" />
              </Picker>
            </View>

            {/* Apply Filters */}
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    height: '80%',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  label: {
    color: '#cbd5e1',
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#94a3b8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioOuterSelected: {
    borderColor: '#10b981',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
  },
  radioLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#10b981',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 16,
  },
  applyText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 8,
  },
  cancelText: {
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '600',
  },
});
