import React, { use, useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen({ onLogin, navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username && !password) {
      Alert.alert('Please enter email and password');
      return;
    }
    setLoading(true);

    try {
      const query = `username=${username}&password=${password}`;
      const response = await fetch(
        `http://192.168.1.20:8000/companyadmin/login?${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
          console.log('Login response status:', response.status);
          console.log('respose',response)
          console.log('Login response headers:', response.headers);
      if (response.ok) {
        const resData = await response.json();
        console.log('Response data:', resData);

         const role = resData?.data?.role?.trim().toLowerCase();

        if (role === 'employee') {
          Alert.alert('Welcome!', 'You are logged in as Employee');
          onLogin(role,username);
           
        } else if (role === 'admin' || role === 'hr') {
          Alert.alert(
            'Login Successful!',
            `Welcome ${role.toUpperCase()}`,
          );
          onLogin(role);
        } else {
          Alert.alert('Login Failed', 'Invalid role received from server');
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
