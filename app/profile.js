import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  // State variables for profile details
  const [profile, setProfile] = useState({
    name: 'XXX',
    registerNo: '311122104xxx',
    email: 'XXX@licet.ac.in',
    classSec: 'CSE-B',
    cgpa: 8.9,
  });

  return (
    <View style={styles.container}>
      {/* Back Button with Image */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require('../assets/images/arrow_back.png')} // Replace with your back icon image
          style={styles.backImage}
        />
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Avatar Image */}
        <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />

        {/* Profile Details */}
        <Text style={styles.title}>Your Profile</Text>
        <View style={styles.profileDetails}>
          <Text style={styles.profileItem}>
            <Text style={styles.label}>Name: </Text>{profile.name}
          </Text>
          <Text style={styles.profileItem}>
            <Text style={styles.label}>Register No: </Text>{profile.registerNo}
          </Text>
          <Text style={styles.profileItem}>
            <Text style={styles.label}>Email: </Text>{profile.email}
          </Text>
          <Text style={styles.profileItem}>
            <Text style={styles.label}>Class & Sec: </Text>{profile.classSec}
          </Text>
          <Text style={styles.profileItem}>
            <Text style={styles.label}>Current CGPA: </Text>{profile.cgpa}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 50,
    elevation: 2,
  },
  backImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  profileDetails: {
    width: '100%',
    paddingVertical: 10,
  },
  profileItem: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontWeight: 'bold',
    color: '#4a90e2',
  },
});
