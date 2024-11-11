import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';


const ReferenceMaterials = () => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Sample data for reference books by subject
  const subjects = [
    { id: 1, name: 'Computer Networks', books: ['Computer Networking: A Top-Down Approach', 'Data and Computer Communications', 'Network+ Guide to Managing and Troubleshooting Networks'] },
    { id: 2, name: 'Compiler Design', books: ['Compilers: Principles, Techniques, and Tools', 'Modern Compiler Implementation in C', 'Engineering a Compiler'] },
    { id: 3, name: 'App Development', books: ['Android Programming: The Big Nerd Ranch Guide', 'The Swift Programming Language', 'React Native in Action'] },
    { id: 4, name: 'Web Technologies', books: ['HTML and CSS: Design and Build Websites', 'JavaScript: The Good Parts', 'Learning Web Design: A Beginner\'s Guide to HTML, CSS, JavaScript, and Web Graphics'] },
    { id: 5, name: 'Cryptography', books: ['Cryptography and Network Security', 'Understanding Cryptography: A Textbook for Students and Practitioners', 'Introduction to Modern Cryptography'] },
    { id: 6, name: 'Distributed Computing', books: ['Distributed Systems: Concepts and Design', 'Designing Data-Intensive Applications', 'Distributed Computing: Principles and Applications'] },
  ];
  

  const handleSubjectPress = (subject) => {
    // Toggle visibility of books for the selected subject
    if (selectedSubject && selectedSubject.id === subject.id) {
      setSelectedSubject(null); // Close the books list if the subject is already selected
    } else {
      setSelectedSubject(subject); // Show books for the selected subject
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image source={require('../assets/images/arrow_back.png')} style={styles.backImage} />
      </TouchableOpacity>
      
      {/* Render the subject buttons */}
      {subjects.map((subject) => (
        <View key={subject.id} style={styles.subjectContainer}>
          <TouchableOpacity
            style={styles.subjectButton}
            onPress={() => handleSubjectPress(subject)}
          >
            <Text style={styles.subjectText}>{subject.name}</Text>
          </TouchableOpacity>

          {/* Render books for the selected subject */}
          {selectedSubject && selectedSubject.id === subject.id && (
            <View style={styles.booksContainer}>
              <FlatList
                data={subject.books}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.bookItem}>
                    <Text style={styles.bookText}>{item}</Text>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Text style={styles.downloadText}>Download</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
    paddingTop: 100,
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
  subjectContainer: {
    width: '100%',
    marginVertical: 15,
  },
  subjectButton: {
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  subjectText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  booksContainer: {
    marginTop: 10,
    paddingLeft: 20,
    width: '100%',
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  downloadButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  downloadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ReferenceMaterials;
