import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Profile Button with Avatar Image */}
      <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')}>
        <Image source={require('../assets/images/avatar.png')} style={styles.profileImage} />
      </TouchableOpacity>

         {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Image source={require('../assets/images/arrow_back.png')} style={styles.backImage} />
      </TouchableOpacity>

      {/* Grid of Buttons with Images */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/reference-materials')}>
          <Image source={require('../assets/images/ref-mat.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Reference Materials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/study-sessions')}>
          <Image source={require('../assets/images/stu-ses.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Study Sessions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => {}}>
          <Image source={require('../assets/images/dis-zon.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Discussion Zone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => {}}>
          <Image source={require('../assets/images/plan.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Planner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 50,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'cover'
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80, // Adjust as per your design needs
    width: '100%',
  },
  card: {
    width: '43%', // 2x2 grid, each card takes 45% of the container width
    height: 160,
    backgroundColor: '#fff',
    borderRadius: 7,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'column', // Stack the image and text vertically
  },
  cardImage: {
    width: '100%',
    height: '85%', // Occupy most of the space inside the card
    resizeMode: 'cover', // Ensure the image fills the card
  },
  cardText: {
    marginTop: 10, // Space between image and text
    fontSize: 16,
    color: '#333',
    fontWeight: '800',
    textAlign: 'center',
    width: '100%',
    marginBottom: 20, // Space between text and card border
  },
});
