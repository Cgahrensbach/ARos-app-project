import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen'; // OplevScreen
import Udforsk from './screen/Udforsk';
import Kamera from './screen/Kamera';
import Profil from './screen/Profil';
import LoginScreen from './screen/LoginScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Udforsk') {
            iconName = 'explore';
          } else if (route.name === 'Kamera') {
            iconName = 'camera';
          } else if (route.name === 'Profil') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarStyle: { display: 'flex' }, // Vis altid tabbar
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Udforsk" component={Udforsk} />
      <Tab.Screen name="Kamera" component={Kamera} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* LoginScreen bør komme først */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        {/* MainTabs indeholder tab navigator */}
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
