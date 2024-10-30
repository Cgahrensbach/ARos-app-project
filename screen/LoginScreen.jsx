import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username !== '' && password !== '') {
      // Navigate to MainTabs after successful login
      navigation.replace('MainTabs');
    } else {
      console.log('Please enter both username and password.');
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
    // Add your social login logic here
  };

  return (
      <View style={styles.container}>
        {/* Social Login Buttons */}
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Google')}>
            <Icon name="google" size={30} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Facebook')}>
            <Icon name="facebook" size={30} color="#4267B2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Apple')}>
            <Icon name="apple" size={30} color="#000000" />
          </TouchableOpacity>
        </View>

      {/* Header */}
      <Text style={styles.header}>Indtast din e-mail</Text>
      
      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="E-mail eller telefonnummer"
        value={username}
        onChangeText={setUsername}
      />
      
      {/* Password Input */}
      <Text style={styles.header}>Indtast din adgangskode</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {/* Login Button */}
      <TouchableOpacity style={styles.logIndButton} onPress={handleLogin}>
        <Text style={styles.logIndText}>Log Ind</Text>
      </TouchableOpacity>

      {/* Sign Up / Guest Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.replace('MainTabs')}>
        <Text style={styles.signUpText}>Fortsæt som gæst</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#FFF', // Add background color if needed
  },
  header: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
    textAlign: 'left',
  },
  input: {
    height: 40,
    borderBottomWidth: 1, // Bottom border only
    borderBottomColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  logIndButton: {
    backgroundColor: '#2B2D42',
    paddingVertical: 20,
    borderRadius: 22,
    marginBottom: 20, // Add space between buttons
  },
  logIndText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#920F0F',
    paddingVertical: 20,
    borderRadius: 22,
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;
