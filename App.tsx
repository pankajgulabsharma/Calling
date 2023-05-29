import React from 'react';
import {SafeAreaView} from 'react-native';
import Location from './src/screens/location';
import Contacts from './src/screens/contacts';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Location" component={Location} />
        <Tab.Screen name="Contacts" component={Contacts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
