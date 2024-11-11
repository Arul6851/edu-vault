import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Function to generate alternate days with different event types
const generateAlternateDays = (startDate, numberOfEvents) => {
  const eventTypes = [
    { type: 'Assignment', description: 'Assignment Due', time: '10:00 AM' },
    { type: 'Workshop', description: 'Workshop on React', time: '2:00 PM' },
    { type: 'Test', description: 'Midterm Test', time: '11:00 AM' },
    { type: 'Seminar', description: 'Seminar on AI', time: '4:00 PM' },
    { type: 'Project', description: 'Project Submission Deadline', time: '5:00 PM' }
  ];

  let events = {};
  let currentDate = new Date(startDate);
  for (let i = 0; i < numberOfEvents; i++) {
    let formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'
    if (!events[formattedDate]) {
      events[formattedDate] = [];
    }
    
    // Randomly select an event type
    const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    events[formattedDate].push({
      time: randomEvent.time,
      title: `${randomEvent.type} - ${randomEvent.description}`,
    });

    currentDate.setDate(currentDate.getDate() + 2); // Move to the next alternate day
  }
  return events;
};

export default function Planner() {
  const [selectedDay, setSelectedDay] = useState(null);

  // Generate alternate day events starting from '2024-01-01' (example start date)
  const events = generateAlternateDays('2024-01-01', 30); // 30 events, for example

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  const renderEvents = () => {
    if (!selectedDay || !events[selectedDay]) {
      return <Text style={styles.noEvents}>No events or assignments scheduled.</Text>;
    }

    return events[selectedDay].map((event, index) => (
      <View key={index} style={styles.eventContainer}>
        <Text style={styles.eventTime}>{event.time}</Text>
        <Text style={styles.eventTitle}>{event.title}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Planner - 2024</Text>

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <Calendar
          current={'2024-01-01'}
          markedDates={{
            [selectedDay]: { selected: true, selectedColor: '#4CAF50', selectedTextColor: 'white' },
          }}
          onDayPress={handleDayPress}
          monthFormat={'yyyy MM'}
          hideExtraDays={true}
          style={styles.calendar}
        />
      </View>

      {/* Display selected date and events below the calendar */}
      <ScrollView contentContainerStyle={styles.eventsContainer}>
        <Text style={styles.selectedDate}>
          {selectedDay ? `Selected Date: ${selectedDay}` : 'Select a date to view events'}
        </Text>
        {renderEvents()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    top: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
  },
  calendarContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  calendar: {
    borderRadius: 12,
    overflow: 'hidden',
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  eventsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  selectedDate: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  eventContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  eventTime: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  noEvents: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
