import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { config } from 'dotenv';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Sending the POST request with username and password
      const response = await fetch(
        `http://localhost:5500/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rollno: username,
            pass: password,
          }),
        }
      );
  
      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();  // Parse the JSON response
        console.log(data.message);  // Log the message from the server (optional)
  
        // Redirect to the dashboard or another page if login is successful
        router.push('/dashboard');
      } else {
        // If the response is not OK (error), parse the error message and alert the user
        const errorData = await response.json();
        window.alert(errorData.message || "Login failed, please try again.");
      }
    } catch (error) {
      // Catch any network errors and alert the user
      console.error("Error during login:", error);
      window.alert("An error occurred while trying to log in. Please try again.");
    }
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
        <Text style={styles.signUpText} onPress={() => router.push("/signup")}> Sign up</Text>
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