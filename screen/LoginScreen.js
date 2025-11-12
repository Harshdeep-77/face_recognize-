import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { use, useState } from 'react';
import Config from 'react-native-config';


const base_url ="http:192.168.1.20:8000";// Config.API_URL;
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { getRequest, postRequest } from '../utils/api';
// import api from '../interceptor'
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen({ onLogin, navigation }) {
  // const base_url = 'http://192.168.1.20:8000';
  const [username, setUsername] = useState('yogesh123@');
  const [password, setPassword] = useState('Admin123@');
  const [alias, setAlias] = useState('ed');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username && !password) {
      Alert.alert('Please enter email and password');
      return;
    }
    setLoading(true);

    try {
      setAlias('ed');
      const payload = new URLSearchParams({
        username:username,
        password:password,
        alias_name: 'ed',
      }).toString();
    
      console.log("login payload", payload)
      console.log("base url",base_url)
      const response = await fetch(`${base_url}/companyadmin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body:payload,
      
      });
      
      if (response.ok) {
        const result = await response.json();
        
        console.log('.............', result);
        const resData = result.data;
        saveToken(resData.token);
        console.log('datdtata', resData);
        saveUserDetails(resData['role']);
        const role = resData?.role?.trim().toLowerCase();

        if (role == 'salesman') {
          Alert.alert('Welcome!', 'You are logged in as Salesman', [
            {
              text: 'OK',
              onPress: () => onLogin(role, username),
            },
          ]);
        } else if(role == 'admin') {
          Alert.alert('Welcome!', 'You are logged in as Admin', [
            {
              text: 'OK',
              onPress: () => onLogin(role, username),
            },
          ])
        }else if(role == 'implementationengineer'){
          Alert.alert('Welcome!', 'You are logged in as Engineer', [
            {
              text: 'OK',
              onPress: () => onLogin(role, username),
            },
          ])
        
        }

        //   Alert.alert("Login Successful!");
        //   onLogin();
        // } else {
        //  Alert.alert("Invalid credentials", "Please check your username or password");
        // }
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToken = async token => {
    try {
      await AsyncStorage.setItem('userToken', token);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };
  const saveUserDetails = async userdetail => {
    console.log('_________', userdetail);
    try {
      await AsyncStorage.setItem('role', userdetail);
      console.log('user Role saved successfully');
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };
  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#334155']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/295/295128.png',
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to SkyBound World</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Username "
            placeholderTextColor="#94a3b8"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => onLogin('admin', 'Harshdeep')} 
            style={{
              backgroundColor: '#22c55e',
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Skip Login (Test)
            </Text>
          </TouchableOpacity> */}

          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text style={styles.linkText}>Register Now</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: '#10b981',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 6,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  footerText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: '#10b981',
    fontWeight: '600',
  },
});
