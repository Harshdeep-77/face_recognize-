import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you have vector-icons installed

// Define the User type again for clarity
type User = {
  id: string;
  name: string;
  role: string;
  company_alias: string;
  username: string;
};

// Define the expected route parameter structure
type UserProfileRouteParams = {
  user: User;
};

// Define the props for the screen component
interface UserProfileScreenProps {
  // Replace 'RootStackParamList' with your actual stack type if defined
  route: RouteProp<{ UserProfile: UserProfileRouteParams }, 'UserProfile'>; 
  navigation: any;
}

const  ViewLead = ({ route, navigation }) => {
  const { user } = route.params;

  // --- Helper function for rendering a detail row ---
  const DetailRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
    <View style={styles.detailRow}>
      {/* <Icon name={icon} size={20} color="#60a5fa" style={styles.detailIcon} /> */}
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      
     
     <ScrollView contentContainerStyle={styles.container}> 
      <View style={styles.profileHeader}>
        {/* <Icon name="person-circle-outline" size={80} color="#fff" /> */}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Account Details</Text>
        
        <DetailRow 
          icon="finger-print-outline" 
          label="Employee ID" 
          value={user.id} 
        />
        
        <DetailRow 
          icon="at-outline" 
          label="Username" 
          value={user.name} 
        />
              <DetailRow 
          icon="at-outline" 
          label="Email" 
          value={user.email} 
        />
        <DetailRow 
          icon="business-outline" 
          label="Company Alias" 
          value={user.company_name} 
        />
        <DetailRow 
          icon="business-outline" 
          label="City" 
          value={user.city} 
        />
        <DetailRow 
          icon="business-outline" 
          label="State" 
          value={user.state} 
        /><DetailRow 
          icon="business-outline" 
          label="Status" 
          value={user.stage} 
        />
        <DetailRow 
          icon="business-outline" 
          label="contact" 
          value={user.contact_1} 
        />
        <DetailRow 
          icon="business-outline" 
          label="Requirment" 
          value={user.requirement} 
        />
        <DetailRow 
          icon="business-outline" 
          label="Assigned to" 
          value={user.assign_to} 
        />
        <DetailRow 
          icon="business-outline" 
          label="Progress" 
          value={user.progress} 
        />
        {/* You can add more details here if your API provides them (e.g., email, phone) */}
        
      </View>
      
      {/* Action Button Example */}
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => Alert.alert('Action', 'Implement Edit Profile functionality here!')}
      >
        {/* <Icon name="create-outline" size={20} color="#fff" /> */}
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      </ScrollView>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    // alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    padding: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  name: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  role: { 
    color: '#94a3b8', 
    fontSize: 18, 
    marginTop: 4 
  },
  detailsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 20,
    width: '100%',
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
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailIcon: {
    marginRight: 15,
    padding: 8,
    backgroundColor: 'rgba(96, 165, 250, 0.2)', // Light blue background for the icon
    borderRadius: 8,
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
    flexDirection: 'row',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});

export default ViewLead;