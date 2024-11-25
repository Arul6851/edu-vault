import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const DiscussionZone = () => {
  const router = useRouter();

  const [topics, setTopics] = useState([]);  // Store questions and their replies
  const [newTopic, setNewTopic] = useState('');  // New topic input
  const [newReply, setNewReply] = useState('');  // New reply input
  const [expandedTopicId, setExpandedTopicId] = useState(null);  // Track expanded topic for toggling replies
  const [replies, setReplies] = useState({});  // Store replies for each topic by ID

  // Fetch all questions when the component is mounted
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/questions');
        const data = await response.json();

        if (response.ok) {
          // Set the topics with empty replies initially
          const topicsWithReplies = data.map(topic => ({
            ...topic,
            replies: [],  // Initialize with an empty array for replies
          }));
          setTopics(topicsWithReplies); // Update the topics state
        } else {
          console.error('Failed to fetch questions:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchTopics();
  }, []);

  // Function to handle adding a new topic
  const handleAddTopic = async () => {
    if (!newTopic.trim()) {
      window.alert("Please enter a valid question.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5500/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: newTopic }),
      });

      if (response.ok) {
        const data = await response.json();
        setTopics([
          ...topics,
          { id: data.question.id, question: newTopic, replies: [] },  // Initialize replies as an empty array
        ]);
      } else {
        const data = await response.json();
        window.alert(data.message || "Failed to create the question.");
      }
    } catch (error) {
      console.error("Error during adding topic:", error);
      window.alert("An error occurred while posting the question.");
    }

    setNewTopic('');  // Clear input field after submission
  };

  // Function to fetch replies for a specific topic (question)
  const fetchReplies = async (topicId) => {
    try {
      const response = await fetch(`http://localhost:5500/api/answers?questionID=${topicId}`);
      const repliesData = await response.json();

      if (response.ok) {
        // Store the replies for the specific topic ID
        setReplies(prevReplies => ({
          ...prevReplies,
          [topicId]: repliesData || [],  // Update the replies for the topic
        }));
      } else {
        console.error('Failed to fetch replies:', repliesData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during fetching replies:', error);
    }
  };

  // Function to handle adding a reply to a topic
  const handleAddReply = async (topicId) => {
    if (!newReply.trim()) {
      window.alert("Please enter a valid reply.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5500/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionID: topicId,
          answer: newReply,  // Send the reply text
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the replies for the specific topic
        setReplies(prevReplies => ({
          ...prevReplies,
          [topicId]: [...(prevReplies[topicId] || []), { answer: data.answer }],  // Add the new reply
        }));
      } else {
        window.alert(data.message || "Failed to add reply.");
      }
    } catch (error) {
      console.error("Error during adding reply:", error);
      window.alert("An error occurred while posting the reply.");
    }

    setNewReply('');  // Clear input field after submission
  };

  // Toggle the visibility of replies
  const handleToggleReplies = (topicId) => {
    if (expandedTopicId === topicId) {
      setExpandedTopicId(null);  // Hide replies if they are already expanded
    } else {
      setExpandedTopicId(topicId);  // Show replies for the selected topic
      fetchReplies(topicId);  // Fetch replies when expanding
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discussion Zone</Text>

      {/* Input for creating new topic */}
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

      {/* List of Discussion Topics */}
      <FlatList
        data={topics}
        keyExtractor={item => item.id.toString()}  // Ensure the id is a string
        renderItem={({ item }) => (
          <View style={styles.topicCard}>
            <Text style={styles.topicTitle}>{item.question}</Text>

            <TouchableOpacity
              style={styles.viewRepliesButton}
              onPress={() => handleToggleReplies(item.id)}  // Toggle replies visibility
            >
              <Text style={styles.viewRepliesText}>
                {expandedTopicId === item.id ? 'Hide Replies' : 'View Replies'}
              </Text>
            </TouchableOpacity>

            {/* Show replies if the topic is expanded */}
            {expandedTopicId === item.id && (
              <View style={styles.repliesContainer}>
                {replies[item.id] && replies[item.id].length > 0 ? (
                  replies[item.id].map((reply, index) => (
                    <View key={index} style={styles.replyCard}>
                      <Text style={styles.replyText}>{reply.answer}</Text>  {/* Render the 'answer' */}
                    </View>
                  ))
                ) : (
                  <Text>No replies yet.</Text>
                )}

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
    marginTop: 10,
    alignItems: 'center',
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DiscussionZone;
