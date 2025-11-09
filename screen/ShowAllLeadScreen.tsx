import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

type Lead = {
  id: string;
  name: string;
  email: string;
  status: string;
  contact_id: string;
  company_name: string;
  assigned_to: string;
  next_followup: string | null;
  city: string;
  active: string;
  stage: string;
  state: string;
};

interface AllLeadsScreenProps {
  navigation: any;
}

const AllLeadsScreen: React.FC<AllLeadsScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute();
  const filterParm = (route.params as { filter?: String })?.filter;
  const [selectedStatus, setSelectedStatus] = useState(filterParm || 'all');

  const [menuForId, setMenuForId] = useState<string | null>(null);
  // const[salesman_list,setSalesman_list]=useState(true);
  const [salesmen, setSalesmen] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Filter Modal States
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [leadStatus, setLeadStatus] = useState('all');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [enquiryType, setEnquiryType] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const fetchLeads = async (status = selectedStatus) => {
    try {
      setLoading(true);
      setError(null);

      const username = 'yogesh123@';
      const alias_name = 'ed';
      console.log(`status is ${status}`);

      const API_URL = `http://192.168.1.20:8000/lead/get_leads?username=${username}&alias_name=${alias_name}&stage=${encodeURIComponent(
        status,
      )}`;
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      const data = await response.json();
      console.log('Fetched Lead Data:', data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (Array.isArray(data.leads)) {
        const mappedLeads: Lead[] = data.leads.map((lead: any) => ({
          id: String(lead.id),
          name: lead.name,
          email: lead.email || 'N/A',
          contact_1: lead.contact_1 || 'N/A',
          status: lead.status || 'Unknown',
          company_name: lead.company_name || 'N/A',
          assigned_to: lead.assigned_to || 'N/A',
          next_followup: lead.next_followup,
          city: lead.city,
          requirement: lead.requirement,
          // active: lead.active,
          stage: lead.stage,
          state: lead.state,
        }));
        setLeads(mappedLeads);
      } else {
        console.warn('Unexpected API format:', data);
        setLeads([]);
      }
    } catch (err: any) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchLeads(selectedStatus);
      setMenuForId(null);
    }, [selectedStatus]),
  );

  const filteredLeads = leads.filter(
    item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.contact_id.includes(search) ||
      item.company_name.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusColor = (active: string) => {
    switch (
      active == undefined ? '' : active.toLowerCase()
      // case 'updated':
      // case 'converted':
      //   return '#10b981';
      // case 'pending':
      // case 'inprogressive':
      //   return '#facc15';
      // case 'not interested':
      // case 'close':
      // case 'closed':
      //   return '#ef4444';
      // default:
      //   return '#60a5fa';
    ) {
    }
  };

  const handleAssign = async (lead: Lead) => {
    try {
      const username = 'yogesh123@';
      const alias_name = 'ed';

      const response = await fetch(
        `http://192.168.1.20:8000/companyadmin/employees?username=${username}&alias_name=${alias_name}&salesman_list=true`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
      console.log(`status is ${response.status}`);
      console.log('api data is ', data);

      if (!response.ok) throw new Error('Failed to fetch salesmen');
      setSalesmen(data);
      setShowAssignModal(true);
      setSelectedLeadId(lead.id);
    } catch (error: any) {
      console.error('Assign Error:', error);
      Alert.alert('Error', error.message || 'Failed to load salesmen list.');
    }
  };

  const handleClose = (lead: Lead) => {
    setMenuForId(null);
    Alert.alert('Close Lead', `Are you sure you want to close `, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes, Close', onPress: () => closeLeadOnServer(lead.id) },
    ]);
  };

  const closeLeadOnServer = async (leadId: string) => {
    try {
      const username = 'yogesh123@';
      const alias_name = 'ed';

      const API_URL = `http://192.168.1.20:8000/lead/lead/${leadId}?alias_name=${alias_name}&username=${encodeURIComponent(
        username,
      )}`;

      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Close API Response:', data);

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to close lead');
      }

      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === leadId ? { ...lead, status: 'closed' } : lead,
        ),
      );

      Alert.alert('Success', 'Lead closed successfully.');
    } catch (error: any) {
      console.error('Close API Error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  const assignLeadToSalesman = async (
    leadId: string,
    salesmanUsername: string,
  ) => {
    try {
      const username = 'yogesh123@';
      const alias_name = 'ed';

      const API_URL = `http://192.168.1.20:8000/lead/assign_lead?username=${encodeURIComponent(
        username,
      )}&company_alise=${alias_name}&assiged_to=${encodeURIComponent(
        salesmanUsername,
      )}&lead_id=${encodeURIComponent(leadId)}`;

      console.log('Assign API URL:', API_URL);
      // console.log('Salesman API response data:', JSON.stringify(data, null, 2));

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Assign Lead API Response:', data);

      if (!response.ok)
        throw new Error(data.message || 'Failed to assign lead');

      Alert.alert(' Success', 'Lead assigned successfully!');
      setShowAssignModal(false);

      // Optionally refresh leads
      fetchLeads(selectedStatus);
    } catch (error: any) {
      console.error('Assign Lead Error:', error);
      Alert.alert(' Error', error.message || 'Something went wrong.');
    }
  };

  // api for update lead =============================
  const updateLeadOnServer = async (leadId, updatedData) => {
    try {
      const response = await fetch(
        `https://your-api-url.com/updateLead/${leadId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Lead updated successfully!');
        return data;
      } else {
        Alert.alert('Error', data.message || 'Failed to update lead.');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const renderItem = ({ item }: { item: Lead }) => (
    <LinearGradient colors={['#1e293b', '#334155']} style={styles.card}>
      {/* Top row: Name  status pill + three-dot button */}
      <View style={styles.cardTopRow}>
        <Text style={styles.name}>ID {item.id}</Text>

        <View style={styles.topRight}>
          <View
            style={[
              styles.statusPill,
              // { backgroundColor: getStatusColor(item.active) },
            ]}
          >
            <Text style={styles.statusText}>
              {item.active == undefined ? '' : item.active.toLowerCase()}
            </Text>
          </View>

          {/* THREE-DOT MENU BUTTON */}
          <TouchableOpacity
            style={styles.dotsButton}
            onPress={() =>
              setMenuForId(prev => (prev === item.id ? null : item.id))
            }
          >
            <Text style={styles.dotsText}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <View style={styles.infoContainer}>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: '600' }}>Client Name </Text>
          {item.name}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: '600' }}>Company Name </Text>{' '}
          {item.company_name}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: '600' }}>Phone:</Text> {item.contact_1}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: '600' }}>Requerment:</Text>{' '}
          {item.requirement}
        </Text>
        <Text style={styles.detailText}>
          <Text style={{ fontWeight: '600' }}>Status:</Text> {item.stage}
        </Text>
      </View>

      {/* Actions Row */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#60a5fa' }]}
          onPress={() => navigation.navigate('ViewLead', { user: item })}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* DROPDOWN MENU   */}
      {menuForId === item.id && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuForId(null);
              navigation.navigate('EditLeadScreen', { lead: item });
            }}
          >
            <Text style={styles.menuItemText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuForId(null);
              Alert.alert('Delete Lead', `Are you sure you want to delete`, [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Yes, Close',
                  onPress: () => closeLeadOnServer(item.id),
                },
              ]);
            }}
          >
            <Text style={styles.menuItemText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleAssign(item)}
          >
            <Text style={styles.menuItemText}>Assign</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleClose(item)}
          >
            <Text style={[styles.menuItemText, { color: '#ef4444' }]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={{ color: '#fff', marginTop: 8 }}>Loading leads...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
        <TouchableOpacity onPress={() => fetchLeads(selectedStatus)}>
          <Text style={{ marginTop: 10, color: '#60a5fa', fontWeight: 'bold' }}>
            Retry Fetch
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const applyFilters = async () => {
    try {
      setLoading(true);
      setError(null);

      const username = 'yogesh123@';
      const alias_name = 'ed';

      const params = new URLSearchParams({
        username,
        alias_name,
        stage: leadStatus || '',
        state: state || '',
        city: city || '',
        Enquiry_type: enquiryType || '',
        assigned_to: assignedTo || '',
      });

      const API_URL = `http://192.168.1.20:8000/lead/filter_leads?${params.toString()}`;

      console.log('Filter API URL:', API_URL);

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();
      console.log('Filter Leads API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to apply filters');
      }

      if (Array.isArray(data.leads)) {
        const mappedLeads: Lead[] = data.leads.map((lead: any) => ({
          id: String(lead.id),
          name: lead.name,
          email: lead.email || 'N/A',
          contact_1: lead.contact_1 || 'N/A',
          status: lead.status || 'Unknown',
          company_name: lead.company_name || 'N/A',
          assigned_to: lead.assigned_to || 'N/A',
          next_followup: lead.next_followup,
          city: lead.city,
          requirement: lead.requirement,
          stage: lead.stage,
        }));
        setLeads(mappedLeads);
      } else {
        console.warn('Unexpected API format:', data);
        setLeads([]);
      }

      setShowFilterModal(false);
    } catch (err: any) {
      console.error('Filter API Error:', err);
      Alert.alert('Error', err.message || 'Failed to apply filters');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddLeadScreen')}
        >
          <Text style={styles.addButtonText}>＋ Add Lead</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButtonTop}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterButtonText}>🔍 Filter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Leads</Text>

      {/* Status Filter */}
      <View style={styles.filterContainer}>
        {['all', 'open', 'in progress', 'closed'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              selectedStatus === status && styles.activeFilter,
            ]}
            onPress={() => {
              setSelectedStatus(status);
              setLeadStatus(status);
            }}
          >
            <Text
              style={[
                styles.filterText,
                selectedStatus === status && styles.activeFilterText,
              ]}
            >
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name, Company, or Phone..."
        placeholderTextColor="#9ca3af"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredLeads}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No leads found</Text>
        )}
        // auto-close menu when scrolling (nice UX)
        onScrollBeginDrag={() => setMenuForId(null)}
      />
      {showAssignModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Team</Text>
            <Text style={styles.modalSubtitle}>
              Select team member to assign lead
            </Text>

            {/*  Tap row = select only */}
            <FlatList
              data={salesmen}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setSelectedSalesman(item)}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      selectedSalesman?.id === item.id &&
                        styles.radioOuterSelected,
                    ]}
                  >
                    {selectedSalesman?.id === item.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            {/*  Buttons */}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAssignModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  selectedSalesman
                    ? styles.assignButton
                    : styles.assignButtonDisabled,
                ]}
                disabled={!selectedSalesman}
                onPress={() => {
                  if (!selectedSalesman) return;
                  console.log('Assigning lead to:', selectedSalesman.username);
                  assignLeadToSalesman(
                    selectedLeadId!,
                    selectedSalesman.username,
                  );
                }}
              >
                <Text style={styles.assignButtonText}>Assign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* fitlet button form    +==================================================== */}
      {showFilterModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalHeader}>Filters</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Lead Status */}
              <Text style={styles.label}>Lead Status</Text>
              <View style={styles.radioGroup}>
                {['all', 'open', 'in progress', 'closed'].map(status => (
                  <TouchableOpacity
                    key={status}
                    style={styles.radioOption}
                    onPress={() => {
                      setLeadStatus(status);
                      setSelectedStatus(status);
                    }}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        leadStatus === status && styles.radioOuterSelected,
                      ]}
                    >
                      {leadStatus === status && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <Text style={styles.radioLabel}>
                      {status.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Dropdown Filters */}
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

              {/*filter  ======================================= Buttons */}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyText}>Apply Filters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

export default AllLeadsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 16 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  addButtonText: { color: '#fff', fontWeight: '700' },
  filterButtonTop: {
    backgroundColor: '#1f2937',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  filterButtonText: { color: '#fff', fontWeight: '700' },
  header: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 10 },

  filterContainer: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#374151',
  },
  activeFilter: { backgroundColor: '#10b981' },
  filterText: { color: '#e5e7eb', fontWeight: '700' },
  activeFilterText: { color: '#111827' },

  searchInput: {
    backgroundColor: '#111827',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
  },

  card: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 14,
    position: 'relative', // important for the dropdown absolute positioning
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  name: { color: '#fff', fontSize: 18, fontWeight: '800' },
  infoContainer: { marginTop: 4 },
  detailText: { color: '#cbd5e1', marginTop: 4 },

  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: { color: '#0b1020', fontWeight: '800', fontSize: 10 },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: '700' },

  // three-dot button
  dotsButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  dotsText: { color: '#e5e7eb', fontSize: 18, marginTop: -2 },

  // dropdown menu anchored to the card's top-right
  menuContainer: {
    position: 'absolute',
    top: 30,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    width: 140,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  menuItemText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '600',
  },
  menuItemActive: {
    backgroundColor: '#e0f2fe',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 4,
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#64748b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  radioOuterSelected: {
    borderColor: '#2563eb',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },

  radioLabel: {
    fontSize: 16,
    color: '#111827',
  },

  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },

  cancelButton: {
    backgroundColor: '#f1f5f9',
  },

  cancelButtonText: {
    color: '#111827',
    fontWeight: '600',
  },

  assignButton: {
    backgroundColor: '#2563eb',
  },

  assignButtonDisabled: {
    backgroundColor: '#9ca3af',
  },

  assignButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  emptyText: { color: '#94a3b8', textAlign: 'center', marginTop: 30 },

  // filter form styles =============================================================================================

  // Filter Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    zIndex: 200,
  },
  modalBox: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  modalHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
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
    borderColor: '#64748b',
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
