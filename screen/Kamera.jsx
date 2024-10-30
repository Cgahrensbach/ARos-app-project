import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library';

export default function CameraComponent({ setPhotoToDisplay, setCamera }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoAlbum, setPhotoAlbum] = useState([]); // Store photos taken in the app
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const [cameraPermission, mediaLibraryPermission] = await Promise.all([
          Camera.requestCameraPermissionsAsync(),
          MediaLibrary.requestPermissionsAsync(),
        ]);
        setHasCameraPermission(cameraPermission.status === 'granted');
        setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    })();
  }, []);

  const requestConsent = useCallback(() => {
    Alert.alert(
      'Samtykke til brug af billede',
      'Vil du tillade ARoS at bruge dette billede til en kommende fotomosaik? Du vil også blive opfordret til at dele billedet på sociale medier.',
      [
        {
          text: 'Nej',
          onPress: () => console.log('Samtykke afvist'),
          style: 'cancel',
        },
        { text: 'Ja', onPress: () => console.log('Samtykke givet') },
      ]
    );
  }, []);

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo);
        setPhotoToDisplay?.(photo); // Optional chaining to check if setPhotoToDisplay exists
        requestConsent(); // Ask for consent after taking the picture
      } catch (error) {
        console.error('Error taking picture:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [setPhotoToDisplay, requestConsent]);

  const savePicture = useCallback(async () => {
    if (photo && hasMediaLibraryPermission) {
      setLoading(true);
      try {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        setPhotoAlbum([...photoAlbum, { uri: photo.uri, id: asset.id }]); // Only add new photos taken in the app
        setPhoto(null);
        setPhotoToDisplay?.(null);
        setCamera?.(false);
      } catch (error) {
        console.error('Error saving picture:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [photo, hasMediaLibraryPermission, setPhotoToDisplay, setCamera, photoAlbum]);

  const discardPicture = useCallback(() => {
    setPhoto(null);
    setPhotoToDisplay?.(null);
    setCamera?.(false);
  }, [setPhotoToDisplay, setCamera]);

  if (hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>Camera permission not granted. Please enable it in your device settings.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
      {photo ? (
        <View style={styles.buttonContainer}>
          <Image source={{ uri: photo.uri }} style={styles.preview} />
          <TouchableOpacity style={styles.saveButton} onPress={savePicture}>
            <Text style={styles.buttonText}>Gem Billede</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.discardButton} onPress={discardPicture}>
            <Text style={styles.buttonText}>Slet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      {/* Photo Album */}
      <ScrollView style={styles.albumContainer}>
        <Text style={styles.albumTitle}>Fotoalbum</Text>
        <View style={styles.albumGrid}>
          {photoAlbum.map((asset) => (
            <Image key={asset.id} source={{ uri: asset.uri }} style={styles.albumPhoto} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: 20,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  preview: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },

  captureButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff', // Button background color
    borderRadius: 30, // Half of the width/height to make it perfectly round
    borderWidth: 4, // Thickness of the outer line
    borderColor: '#333', // Color of the outer line (match the button color or choose a contrasting one)
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4, // Increased to match the outer line's effect
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#fff', // Text color if needed
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  saveButton: {
    backgroundColor: '#4CAF50', // Green save button
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  discardButton: {
    backgroundColor: '#f44336', // Red discard button
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  // Photo Album Styles
  albumContainer: {
    flex: 1,
    padding: 15,
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  albumPhoto: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
