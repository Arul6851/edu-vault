import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const DiscussionZone = () => {
  const router = useRouter();
  
  // Local state to store the discussion topics and replies
  const [topics, setTopics] = useState([
    { id: '1', title: 'How to solve linear equations?', replies: ['Use substitution or elimination methods.', 'Try graphing method.'] },
    { id: '2', title: 'Best practices for React development?', replies: ['Use hooks for state management.', 'Follow component-based architecture.'] },
    { id: '3', title: 'What is the difference between front-end and back-end development?', replies: ['Front-end deals with the user interface, back-end handles server-side logic.', 'Front-end uses HTML, CSS, JS, while back-end uses languages like Python, Java, etc.'] },
    { id: '4', title: 'How can I improve my coding skills?', replies: ['Practice consistently on platforms like LeetCode, HackerRank.', 'Read code written by others to understand different approaches.'] },
    { id: '5', title: 'What is Agile methodology?', replies: ['Agile focuses on iterative development and flexibility.', 'It emphasizes collaboration, customer feedback, and rapid delivery.'] },
  ]);
  
  const [newTopic, setNewTopic] = useState('');
  const [newReply, setNewReply] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(null); // Track expanded topic ID for dropdown effect

  // Function to handle adding a new topic
  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopics([
        ...topics,
        { id: String(topics.length + 1), title: newTopic, replies: [] }
      ]);
      setNewTopic('');
    }
  };

  // Function to handle adding a reply to a topic
  const handleAddReply = (topicId) => {
    if (newReply.trim()) {
      setTopics(topics.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            replies: [...topic.replies, newReply]
          };
        }
        return topic;
      }));
      setNewReply('');
    }
  };

  // Toggle the visibility of replies
  const handleToggleReplies = (topicId) => {
    setExpandedTopicId(expandedTopicId === topicId ? null : topicId); // Toggle visibility
  };

  return (
    <View style={styles.container}>
      

      {/* List of Discussion Topics */}
      <Text style={styles.title}>Discussion Zone</Text>
      <View style={styles.post}>
      <TextInput
        style={styles.input}
        placeholder="Ask a question..."
        value={newTopic}
        onChangeText={setNewTopic}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleAddTopic}>
        <Text style={styles.createButtonText}>Post</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={topics}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.topicCard}>
            <Text style={styles.topicTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.viewRepliesButton}
              onPress={() => handleToggleReplies(item.id)} // Toggle replies visibility
            >
              <Text style={styles.viewRepliesText}>
                {expandedTopicId === item.id ? 'Hide Replies' : 'View Replies'}
              </Text>
            </TouchableOpacity>

            {/* Show replies if the topic is expanded */}
            {expandedTopicId === item.id && (
              <View style={styles.repliesContainer}>
                {item.replies.map((reply, index) => (
                  <View key={index} style={styles.replyCard}>
                    <Text style={styles.replyText}>{reply}</Text>
                  </View>
                ))}
                {/* Input for adding a reply */}
                <TextInput
                  style={styles.input}
                  placeholder="Add a reply"
                  value={newReply}
                  onChangeText={setNewReply}
                />
                <TouchableOpacity
                  style={styles.replyButton}
                  onPress={() => handleAddReply(item.id)}
                >
                  <Text style={styles.replyButtonText}>Post Reply</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
      
      {/* Input for Creating New Topic */}
      
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
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  backText: {
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topicCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewRepliesButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewRepliesText: {
    color: '#fff',
  },
  repliesContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  replyCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  replyText: {
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  replyButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
    post: {
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
});

export default DiscussionZone;
