import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from '@react-navigation/native';

// Type for team members (recent leads list)
type TeamMember = {
  id: string;
  name: string;
  status: string;
};

// Type for lead stats (from API)
type LeadStats = {
  total_leads: number;
  open_leads: number;
  closed_leads: number;
  in_progress_leads: number;
  unassigned_leads?: number;
};

// Define props for navigation
type RootStackParamList = {
  AddLeadScreen: undefined;
  ShowAllLeadScreen: undefined;
  AssignLeadScreen: undefined;
  Markattendance: undefined;
  Registration: undefined;
  UserList: undefined;
};

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  const [leadStats, setLeadStats] = useState<LeadStats>({
    total_leads: 0,
    open_leads: 0,
    closed_leads: 0,
    in_progress_leads: 0,
    unassigned_leads: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Harsh Deep', status: 'Active' },
    { id: '2', name: 'Aryan Verma', status: 'Inactive' },
    { id: '3', name: 'Diya Patel', status: 'Active' },
  ]);

  useEffect(() => {
    const fetchLeadCounts = async () => {
      try {
        setLoading(true);
        const username = 'yogesh123@';
        const alias_name = 'ed';
        const API_URL = `http://192.168.1.20:8000/lead/count_leads?alias_name=${alias_name}&username=${encodeURIComponent(
          username,
        )}`;

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });

        const data = await response.json();
        console.log('Lead Count Data:', data);

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch stats');
        }

        setLeadStats(data);
      } catch (err: any) {
        console.error('Error fetching stats:', err);
        setError('Unable to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadCounts();
  }, []);

  return (
    <LinearGradient colors={['#f0f9ff', '#ffffff']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== HEADER ===== */}
        <LinearGradient
          colors={['#fff', '#b9bae4ff']}
          style={styles.headerContainer}
        >
          <View style={styles.headerLeft}>
            <Image
              source={require('../logo/skyound.jpg')}
              style={styles.headerLogo}
            />
          </View>
        </LinearGradient>

        {/* ===== OVERVIEW SECTION ===== */}
        <Text style={styles.sectionTitle}>📊 Lead Overview</Text>

        {loading ? (
          <Text style={{ textAlign: 'center', color: '#555' }}>
            Loading stats...
          </Text>
        ) : error ? (
          <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
        ) : (
          <View style={styles.statsContainer}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#10b981' }]}
              onPress={() =>
                navigation.navigate('ShowAllLeadScreen', { filter: 'all' })
              }
            >
              <Text style={styles.value}>{leadStats.total_leads}</Text>
              <Text style={styles.label}>Total Leads</Text>
            </TouchableOpacity>
            
              <TouchableOpacity
              style={[styles.card, { backgroundColor: '#10b981' }]}
              onPress={() =>
                navigation.navigate('ShowAllLeadScreen', { filter: 'in progress' })
              }
            >
              <Text style={styles.value}>{leadStats.in_progress_leads}</Text>
              <Text style={styles.label}>In Progress</Text>
            </TouchableOpacity>
             
              <TouchableOpacity
              style={[styles.card, { backgroundColor: '#10b981' }]}
              onPress={() =>
                navigation.navigate('ShowAllLeadScreen', { filter: 'closed' })
              }
            >
              <Text style={styles.value}>{leadStats. closed_leads}</Text>
              <Text style={styles.label}>Closed</Text>
            </TouchableOpacity>
 

           <TouchableOpacity
              style={[styles.card, { backgroundColor: '#10b981' }]}
              onPress={() =>
                navigation.navigate('ShowAllLeadScreen', { filter: 'open' })
              }
            >
              <Text style={styles.value}>{leadStats.open_leads}</Text>
              <Text style={styles.label}>Pending</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ===== LEAD MANAGEMENT SECTION ===== */}

        <Text style={styles.sectionTitle}> Lead Management</Text>
        <View style={styles.leadContainer}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#6366f1' }]}
            onPress={() => navigation.navigate('Registration')}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>Registration</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#8b5cf6' }]}
            onPress={() => navigation.navigate('UserList')}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>User List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.leadCard, { backgroundColor: '#3b82f6' }]}
            onPress={() => navigation.navigate('AddLeadScreen')}
          >
            <Text style={styles.cardEmoji}>➕</Text>
            <Text style={styles.cardText}>Add Lead</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.leadCard, { backgroundColor: '#10b981' }]}
            onPress={() => navigation.navigate('ShowAllLeadScreen')}
          >
            <Text style={styles.cardEmoji}>📋</Text>
            <Text style={styles.cardText}>Show Leads</Text>
          </TouchableOpacity>

         
        </View>

        {/* ===== =======================================ATTENDANCE SECTION ===== */}
        <Text style={styles.sectionTitle}> Attendance</Text>
        <View style={styles.leadContainer}>
          <TouchableOpacity
            style={[styles.leadCard, { backgroundColor: '#8b5cf6' }]}
            onPress={() => navigation.navigate('Markattendance')}
            activeOpacity={0.85}
          >
            <Text style={styles.cardEmoji}>📆</Text>
            <Text style={styles.cardText}>View Attendance</Text>
          </TouchableOpacity>
        </View>

        {/* ================================================== RECENT LEADS SECTION == */}
        <Text style={styles.subHeader}>Recent Leads</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={teamMembers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.memberRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.avatar}>{item.name.charAt(0)}</Text>
                  <Text style={styles.memberName}>{item.name}</Text>
                </View>
                <Text
                  style={[
                    styles.memberStatus,
                    { color: item.status === 'Active' ? '#10b981' : '#ef4444' },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DashboardScreen;

// =================== STYLES ===================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  headerLogo: {
    width: 300,
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },

  sectionTitle: {
    color: '#1e293b',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 10,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  card: {
    width: '47%',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  value: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  label: { color: '#f1f5f9', fontSize: 14, marginTop: 4 },

  leadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  leadCard: {
    width: '47%',
    height: 110,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardEmoji: { fontSize: 30, marginBottom: 6 },
  cardText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  subHeader: {
    color: '#1e293b',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 15,
    marginLeft: 20,
  },
  listContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 35,
    fontWeight: 'bold',
    marginRight: 10,
  },
  memberName: { color: '#0f172a', fontSize: 16, fontWeight: '500' },
  memberStatus: { fontWeight: 'bold', fontSize: 14 },
});
