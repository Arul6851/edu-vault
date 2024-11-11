import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // if (username && password) {
    //   router.push('/dashboard');
    // } else {
    //   alert('Please enter valid credentials');
    // }
    router.push('/dashboard');
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/edu-vault.png")} style={styles.logo} />
      <Text style={styles.subtitle}>Please log in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Don’t have an account? 
        <Text style={styles.signUpText} onPress={() => alert('Sign up')}> Sign up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    padding: 50,
  },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    },
  logo: {
    width: 250,  // Adjust width as necessary
    height: 250, // Adjust height as necessary
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});
