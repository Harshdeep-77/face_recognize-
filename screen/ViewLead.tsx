import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';

// Define the User type again for clarity
type User = {
  id: string;
  name: string;
  role: string;
  company_name: string;
  username: string;
  state: string;
  city: string;
  stage: string;
  contact_1: string;
  requirement: string;
  assigned_to: string;
  progress: string;
  email?: string;
  timeline?: { status: string; date: string }[];
};

// Define the expected route parameter structure
type UserProfileRouteParams = {
  user: User;
};

// Define props for this screen
interface UserProfileScreenProps {
  route: RouteProp<{ UserProfile: UserProfileRouteParams }, 'UserProfile'>;
  navigation: any;
}

const ViewLead: React.FC<UserProfileScreenProps> = ({ route, navigation }) => {
  const { user } = route.params;

  // Add mock timeline for now (replace with API later)
  const [leadData, setLeadData] = useState<User>({
    ...user,
    timeline:
      user.timeline && user.timeline.length > 0
        ? user.timeline
        : [
            { status: 'Lead Created', date: '2025-10-29' },
            { status: 'In Progress', date: '2025-10-31' },
            { status: 'Follow-up Done', date: '2025-11-02' },
            { status: 'Closed', date: '2025-11-04' },
          ],
  });

  const [activeTab, setActiveTab] = useState<'details' | 'timeline'>('details');

  // Reusable row component
  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | null;
  }) => (
    <View style={styles.detailRow}>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value || '-'}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      {/* Back Button */}
     

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'details' && styles.activeTabText,
            ]}
          >
            Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'timeline' && styles.activeTab]}
          onPress={() => setActiveTab('timeline')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'timeline' && styles.activeTabText,
            ]}
          >
            Timeline
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'details' ? (
          <>
            <View style={styles.profileHeader}>
        
             
            </View>

            <View style={styles.detailsCard}>
              <Text style={styles.cardTitle}>Lead Details</Text>

              <DetailRow label="Client Name" value={leadData.name} />
              <DetailRow label="Company Name" value={leadData.company_name} />
              <DetailRow label="Contact Number" value={leadData.contact_1} />
              <DetailRow label="Status" value={leadData.stage} />
              <DetailRow label="State" value={leadData.state} />
              <DetailRow label="City" value={leadData.city} />
              <DetailRow label="Requirement" value={leadData.requirement} />
              <DetailRow label="Assigned To" value={leadData.assigned_to} />
              <DetailRow label="Progress" value={leadData.progress} />
              <DetailRow label="Email" value={leadData.email || 'N/A'} />
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                Alert.alert('Edit', 'Implement Edit Lead functionality here!')
              }
            >
              <Text style={styles.editButtonText}>Edit Lead</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.cardTitle}>Lead Timeline</Text>
            <View style={styles.timelineContainer}>
              {leadData.timeline && leadData.timeline.length > 0 ? (
                leadData.timeline.map((event, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineStatus}>{event.status}</Text>
                      <Text style={styles.timelineDate}>{event.date}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noTimelineText}>
                  No timeline data available.
                </Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#94a3b8',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  tabText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTab: {
    backgroundColor: '#0f172a',
  },
  activeTabText: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  role: {
    color: '#94a3b8',
    fontSize: 18,
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    color: '#94a3b8',
    fontSize: 13,
  },
  detailValue: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '60%',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  timelineContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
    marginRight: 15,
    marginTop: 5,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  timelineStatus: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  timelineDate: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 4,
  },
  noTimelineText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ViewLead;
