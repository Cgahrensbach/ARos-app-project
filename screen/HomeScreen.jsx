import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, FlatList, Dimensions, SafeAreaView } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';


// Sample data for the image collage
const { width } = Dimensions.get('window');
const images = [
  { id: '1', uri: 'https://i.imgur.com/1ynDbtg.jpeg', text: 'Mange ansigter - Peter Pan' },
  { id: '2', uri: 'https://i.imgur.com/wXXVfMd.jpeg', text: 'Davincis eksklusive kunst samling' },
  { id: '3', uri: 'https://i.imgur.com/tsKxgbe.jpeg', text: 'Vincent Van Gogh udstillingen' },
];

const HeartIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Circle cx="12" cy="12" r="12" fill="white" stroke="black" strokeWidth="2" />
    <Path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill="none" 
      stroke="black" 
      strokeWidth="1.5" 
      transform="scale(0.8 0.8) translate(3 3)" 
    />
  </Svg>
);

const HeaderWithSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();  // Add this line to use the navigation hook

  const handleSearch = () => {
    console.log('Search:', searchText);
  };

  const handleProfilePress = () => {
    console.log('Profile Pressed');
  };

  const handleOrderPress = () => {
    console.log('Order Pressed');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.heartIconContainer}>
        <HeartIcon />
      </View>
      <View style={styles.descriptionBox}>
        <View style={styles.descriptionContent}>
          <Image
            source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/user.png' }}
            style={styles.profilePicture}
          />
          <Text style={styles.descriptionText}>{item.text}</Text>
          <TouchableOpacity style={styles.orderButton} onPress={handleOrderPress}>
            <Text style={styles.orderButtonText}>Bestil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            style={styles.largeIcon}
            source={{ uri: 'https://img.icons8.com/material-outlined/48/000000/user-male-circle.png' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchContainer}>
          <Image
            style={styles.searchIcon}
            source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/search--v1.png' }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Header "Populær kunst" */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Populær kunst</Text>
      </View>

      {/* Image Collage */}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageCollageContainer}
        style={styles.imageCollage}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Udstillinger</Text>
      </View>

      <View style={styles.sectionWrapper}>
        <View style={styles.sectionContainer}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: 'https://i.imgur.com/1ynDbtg.jpeg' }} 
              style={styles.photo}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.sectionHeader}>Mange ansigter</Text>
            <Text style={styles.sectionDescription}>
              Dette er udstillingen for "Mange Ansigter - Peter Pan"
            </Text>
            <TouchableOpacity 
  style={styles.sectionButton} 
  onPress={() => navigation.navigate('Udforsk')}  // Add this line for navigation
>
  <Text style={styles.sectionButtonText}>Se mere</Text>
</TouchableOpacity>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  largeIcon: {
    width: 48,
    height: 48,
    tintColor: '#000',
  },
  searchBarContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  itemContainer: {
    width: width - 40,
    margin: 10,
    paddingBottom: 60,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionBox: {
    position: 'absolute',
    top: 140,// Increased bottom margin to move the box further up
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descriptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  descriptionText: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: '#D90429',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  imageCollageContainer: {
    marginBottom: 0,
  },
  imageCollage: {
    marginTop: 0,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionWrapper: {
    paddingBottom: 30,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  photoContainer: {
    marginRight: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  sectionButton: {
    backgroundColor: '#D90429',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  sectionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HeaderWithSearchBar;