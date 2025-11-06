import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//  import {NavigationContainer} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './screen/RegistrationScreen';
import AttendanceScreen from './screen/AttendanceScreen';
import AttendanceLog from './screen/AttendanceLog';
import { AttendanceProvider } from './screen/AttendanceContext';
import { useState } from 'react';
import LoginScreen from './screen/LoginScreen';
import WelcomeScreen from './screen/WelcomeScreen';
import DashboardScreen from './screen/DashboardScreen';
import UserList from './screen/UserList';
import UserProfile from './screen/UserProfile';
import Markattendance from './screen/Markattendance';
import Employeeattendace from './screen/Employeeattendace';
import UpdateEmployee from './screen/UpdateEmployee';
import AddLeadScreen from './screen/AddLeadScreen';
import AssignLeadScreen from './screen/AssignLeadScreen';
import ShowAllLeadScreen from "./screen/ShowAllLeadScreen";
import ViewLead from "./screen/ViewLead";

const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showRegst, setShowRegst] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const[userRole,setUserRole]=useState(null);
  const [username,setUsername]=useState('');
  const handleLogin = (role,username) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUsername(username);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            options={{
              title: '',
              headerStyle: { backgroundColor: '#0f172a' },
            }}
          >
            {props => (
              <LoginScreen {...props} onLogin={(role,username) => handleLogin(role,username)} />
            )}
          </Stack.Screen>
        ) :  userRole === 'employee' && username ?(
              <Stack.Screen
          name="Employeeattendace"
          component={Employeeattendace}
          initialParams={{username}}
          options={{
            title: 'My Attendance',
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#fff',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  setIsLoggedIn(false);
                  setUserRole(null);
                }}
                style={{
                  backgroundColor: '#ef4444',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
          //  children= {(props) => <Employeeattendace {...props} username={username} />}
        />
        

        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              initialParams={{username}}
              options={{
                title: 'My Dashboard',
                headerStyle: { backgroundColor: '#3b82f6' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: '700', fontSize: 20 },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => setIsLoggedIn(false)}
                    style={{
                      backgroundColor: '#6e78a7ff',
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>
                      Logout
                    </Text>
                  </TouchableOpacity>
                ),
              }}
            />

            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                title: 'Registration Form',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="UserList"
              component={UserList}
              options={{
                title: '👥 User List',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{
                title: 'User Profile',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="UpdateEmployee"
              component={UpdateEmployee}
              options={{
                title: 'Update User',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="AddLeadScreen"
              component={AddLeadScreen}
              options={{
                title: 'skybound',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
             <Stack.Screen
              name="AssignLeadScreen"
              component={AssignLeadScreen}
              options={{
                title: 'skybound',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
             <Stack.Screen
              name="ShowAllLeadScreen"
              component={ ShowAllLeadScreen}
              options={{
                title: 'skybound',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
              <Stack.Screen
              name="ViewLead"
              component={ViewLead}
              options={{
                title: 'skybound',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />
            
            <Stack.Screen
              name="Markattendance"
              component={Markattendance}
              options={{
                title: 'Mark Attendance',
                headerStyle: { backgroundColor: '#0f172a' },
                headerTintColor: '#fff',
              }}
            />

            {/* <Stack.Screen name="AtendanceScreen" component={AttendanceScreen} 
                 options={{
            title: "",
            headerStyle: { backgroundColor: "#0f172a" },
            headerTintColor: "#fff",
          }}/> */}

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
 
  );
};

export default App;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#0f172a',
    paddingTop: 40, // for status bar spacing
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
