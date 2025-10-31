 import { StyleSheet, Text, View ,Button} from 'react-native'
 import React from 'react'
 import { NavigationContainer } from '@react-navigation/native';

//  import {NavigationContainer} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 import {createNativeStackNavigator} from '@react-navigation/native-stack'
 import RegistrationScreen from './screen/RegistrationScreen';
  import AttendanceScreen from './screen/AttendanceScreen';
import AttendanceLog from './screen/AttendanceLog';
 

const Tab = createMaterialTopTabNavigator();

 const App = () => {
   return (
       <NavigationContainer>
           <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Face Attendance System</Text>
      </View>
      <Tab.Navigator
        initialRouteName="Registration"
        screenOptions={{
          tabBarStyle: { backgroundColor: '#0f172a' },
          tabBarActiveTintColor: '#10b981',
          tabBarInactiveTintColor: '#e2e8f0',
          tabBarIndicatorStyle: { backgroundColor: '#10b981', height: 3 },
        }}
      >
        <Tab.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: 'Register' }}
        />

        <Tab.Screen
          name="Attendance"
          component={AttendanceScreen}
          options={{ title: 'Attendance' }}
        />
         <Tab.Screen
          name="AttendanceLog"
          component={AttendanceLog}
          options={{ title: 'AttendanceLog' }}
        />

      </Tab.Navigator>
    </NavigationContainer>
   )
 };
 
 
 export default App
 
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
 })