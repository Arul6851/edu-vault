import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  const [rollno, setRollno] = useState('');
  const [regno, setRegno] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [dept, setDept] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        'http://localhost:5500/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rollno,
            regno,
            name,
            year: parseInt(year),
            dept,
            dob: new Date(dob),
            pass: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        router.push('/');
      } else {
        const errorData = await response.json();
        window.alert(errorData.message || 'Sign up failed, please try again.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      window.alert('An error occurred while trying to sign up. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require('../assets/images/edu-vault.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Create an account</Text>

        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          placeholderTextColor="#aaa"
          value={rollno}
          onChangeText={setRollno}
        />
        <TextInput
          style={styles.input}
          placeholder="Registration Number"
          placeholderTextColor="#aaa"
          value={regno}
          onChangeText={setRegno}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Year of Completion"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          placeholderTextColor="#aaa"
          value={dept}
          onChangeText={setDept}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          placeholderTextColor="#aaa"
          value={dob}
          onChangeText={setDob}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.signUpText} onPress={() => router.push('/login')}>
            Log in
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    paddingTop: 50,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logo: {
    width: 250,
    height: 250,
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
