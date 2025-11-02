// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

// // export default function WelcomeScreen({onLogin}) {
// //   return (
// //     <ImageBackground
// //       source={{ uri: 'https://images.unsplash.com/photo-1522204504400-68b2dce9f31a' }}
// //       style={styles.background}
// //       blurRadius={3}
// //     >
// //       <View style={styles.overlay}>
// //         <Text style={styles.title}>Welcome to Face Attendance System</Text>
// //         <Text style={styles.subtitle}>
// //           Manage user registration and mark attendance easily.
// //         </Text>

// //         <TouchableOpacity style={styles.button}>
// //           <Text style={styles.buttonText}>Go to Dashboard</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ImageBackground>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   background: {
// //     flex: 1,
// //     resizeMode: 'cover',
// //   },
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(15, 23, 42, 0.6)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //   },
// //   title: {
// //     color: '#10b981',
// //     fontSize: 26,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     marginBottom: 10,
// //   },
// //   subtitle: {
// //     color: '#e2e8f0',
// //     fontSize: 16,
// //     textAlign: 'center',
// //     marginBottom: 30,
// //   },
// //   button: {
// //     backgroundColor: '#10b981',
// //     paddingVertical: 12,
// //     paddingHorizontal: 30,
// //     borderRadius: 10,
// //     elevation: 3,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: '600',
// //   },
// // });

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// export default function WelcomeScreen({ onContinue }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🎉 Welcome to Face Attendance System!</Text>
//       <Text style={styles.subtitle}>Your attendance made smart & secure.</Text>

//       <TouchableOpacity style={styles.button} onPress={onContinue}>
//         <Text style={styles.buttonText}>Go to Dashboard</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0f172a',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     color: '#10b981',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     color: '#e2e8f0',
//     fontSize: 16,
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#10b981',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; //

export default function WelcomeScreen({ onContinue }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#0ea5e9']}
      style={styles.gradient}
    >
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.title}>🎉 Welcome to</Text>
        <Text style={styles.brand}>Face Attendance System</Text>
        <Text style={styles.subtitle}>Smart, Secure, and Seamless Attendance</Text>

        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Go to Dashboard →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 25,
  },
  title: {
    color: '#a5f3fc',
    fontSize: 26,
    fontWeight: '600',
    textShadowColor: '#38bdf8',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  brand: {
    color: '#10b981',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
    textShadowColor: '#34d399',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    color: '#e2e8f0',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 40,
    textAlign: 'center',
    width: 250,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 35,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
