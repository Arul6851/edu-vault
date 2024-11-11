import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';

const StudySessions = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [scheduledSessions, setScheduledSessions] = useState([
    { id: 1, title: 'Math Study Group', date: '2024-11-12', time: '10:00 AM', link: 'https://meetinglink.com' },
    { id: 2, title: 'CS Project Review', date: '2024-11-13', time: '2:00 PM', link: 'https://meetinglink2.com' },
  ]);
  const [newSessionTitle, setNewSessionTitle] = useState('');

  const handleJoinMeeting = () => {
    if (meetingLink) {
      alert('Joining meeting...');
      // Handle the join logic here (e.g., navigate to a video call, etc.)
    } else {
      alert('Please enter a valid meeting link.');
    }
  };

  const handleCreateSession = () => {
    if (newSessionTitle) {
      const newSession = {
        id: scheduledSessions.length + 1,
        title: newSessionTitle,
        date: '2024-11-15', // Add logic for dynamic date/time selection
        time: '3:00 PM',
        link: 'https://newmeetinglink.com',
      };
      setScheduledSessions([...scheduledSessions, newSession]);
      setNewSessionTitle('');
      alert('Study session created!');
    } else {
      alert('Please enter a session title.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton} onPress={() => alert('Back pressed')}>
        <Image source={require('../assets/images/arrow_back.png')} style={styles.backImage} />
      </TouchableOpacity> */}

      {/* Scheduled Study Sessions */}
      <Text style={styles.title}>Scheduled Public Study Sessions</Text>
      <FlatList
        data={scheduledSessions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>{item.title}</Text>
            <Text style={styles.sessionDetails}>
              {item.date} | {item.time}
            </Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => alert('Joining meeting: ' + item.link)}
            >
              <Text style={styles.joinButtonText}>Join Meeting</Text>
            </TouchableOpacity>
          </View>
        )}
      />
        <View style={styles.join}>
      {/* Join Meeting by entering link */}
      <TextInput
        style={styles.linkInput}
        placeholder="Enter Meeting Link"
        value={meetingLink}
        onChangeText={setMeetingLink}
      />
      <TouchableOpacity style={styles.joinButton} onPress={handleJoinMeeting}>
        <Text style={styles.joinButtonText}>Join Study Session</Text>
      </TouchableOpacity>

      {/* Create New Study Session */}
      <TextInput
        style={styles.input}
        placeholder="Enter Session Title"
        value={newSessionTitle}
        onChangeText={setNewSessionTitle}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateSession}>
        <Text style={styles.createButtonText}>Create New Study Session</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top: 40,
    backgroundColor: '#f0f4f7',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sessionCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sessionDetails: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  join:{
    bottom: 40,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StudySessions;
