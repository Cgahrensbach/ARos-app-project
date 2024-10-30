import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Profil = () => {
  const [isMember, setIsMember] = useState(false);

  const handleSignUp = () => {
    // This is where you would handle the sign-up logic, such as API calls
    setIsMember(true);
    Alert.alert(
      'Tilmelding fuldført',
      'Du er nu tilmeldt vores loyalitetsprogram! Du kan nu se dine belønninger.',
      [{ text: 'OK' }]
    );
  };

  const handleViewRewards = () => {
    if (!isMember) {
      Alert.alert(
        'Ikke medlem',
        'Tilmeld dig loyalitetsprogrammet for at se belønninger.',
        [{ text: 'OK' }]
      );
    } else {
      // Show rewards or navigate to rewards screen
      Alert.alert(
        'Belønninger',
        '10% rabat på billetter og eksklusive forhåndsvisninger med rabatkoden "#JegElskerARos".',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../billeder/Profil.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Martin Holm</Text>
        <Text style={styles.welcome}>Se oversigt over din profil</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>34</Text>
          <Text style={styles.statLabel}>Følgere</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>78</Text>
          <Text style={styles.statLabel}>Antal besøg</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>1500</Text>
          <Text style={styles.statLabel}>Point optjent</Text>
        </View>
      </View>

      {/* Loyalty Program Section */}
      <View style={styles.loyaltyProgram}>
        <Text style={styles.loyaltyTitle}>Kundeklub</Text>
        <Text style={styles.loyaltyDescription}>
          Tilmeld dig vores loyalitetsprogram for at få eksklusive rabatter på billetter og i museumsbutikken. Optjen point ved hver besøgs- og interaktion med museet!
        </Text>
        {!isMember ? (
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Tilmeld dig</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.viewRewardsButton} onPress={handleViewRewards}>
            <Text style={styles.buttonText}>Se Belønninger</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
  },
  profileImage: {
    width: 500,
    height: 250,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  welcome: {
    fontSize: 16,
    color: '#888',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#888',
  },
  loyaltyProgram: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  loyaltyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loyaltyDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  signUpButton: {
    padding: 10,
    backgroundColor: '#4CAF50', // Green button
    borderRadius: 10,
  },
  viewRewardsButton: {
    padding: 10,
    backgroundColor: '#FFC107', // Amber button
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Profil;
