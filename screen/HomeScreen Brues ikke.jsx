import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
    const navigation = useNavigation();


    const navigateToLogin = () => {
        navigation.navigate('Login');
    };


    return (
      <ImageBackground
      source={{ uri: 'https://i.imgur.com/wNh4eQP.png' }}  // Reference the local image file
      style={styles.background}
      >
      <View style={styles.headerContainer}>
          <Text style={styles.header1}>Aros</Text>
          <Text style={styles.header2}>Kunst museum</Text>
          <Text style={styles.header3}>Kreativitet er intelligens, der har det sjovt.�- Albert Einstein</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Oplev AROS</Text>
      </TouchableOpacity>
      </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Cover the whole screen
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center items horizontally
    },
    headerContainer: {
        position: 'absolute', // Position the header container absolutely
        top: 150, // Distance from the top of the screen
        left: 20, // Align headers to the left
        width: '100%', // Full width of the screen
        alignItems: 'flex-start', // Align items to the start (left)
    },
    header1: {
        fontSize: 100,       // Large font size
        fontWeight: 'bold',
        color: '#fff',     // White text color to stand out on background
        marginBottom: 0,   // Space below the header
        textAlign: 'left',  // Align text to the left
        textShadowColor: '#000',
        textShadowRadius: 5,
    },
    header2: {
        fontSize: 28,       // Medium font size
        fontWeight: '600',
        color: '#fff',     // White text color to stand out on background
        marginBottom: 10,   // Space below the header
        textAlign: 'left',
        textShadowColor: '#000',
        textShadowRadius: 5,
    },
    header3: {
        fontSize: 13,       // Small font size
        fontWeight: '400',
        color: '#fff',     // White text color to stand out on background
        marginBottom: 10,   // Space below the header
        textAlign: 'left',
        textShadowColor: '#000',
        textShadowRadius: 5,
    },
    button: {
        backgroundColor: '#2B2D42',
        paddingVertical: 18,
        paddingHorizontal: 60,
        borderRadius: 22,
        position: 'absolute', // Position button absolutely
        bottom: 150, // Distance from the bottom of the screen
        alignSelf: 'center', // Center button horizontally
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
    },
});

