import React, {useEffect} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  SafeAreaView,
  Platform,
  Linking,
} from 'react-native';
// import {
//   check,
//   request,
//   PERMISSIONS,
//   RESULTS,
//   Permission,
// } from 'react-native-permissions';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Location = () => {
  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  // useEffect(() => {

  // const requestLocationPermission = async () => {
  //   try {
  //     const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // Change to appropriate permission for Android
  //     console.log('status', status);

  //     if (status === RESULTS.GRANTED) {
  //       console.log('status === RESULTS.GRANTED', status === RESULTS.GRANTED);
  //       // Permission already granted
  //       // Proceed with using location data
  //     } else if (status === RESULTS.DENIED) {
  //       console.log('status === RESULTS.DENIED', status === RESULTS.DENIED);
  //       const requestStatus = await request(
  //         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //       ); // Change to appropriate permission for Android

  //       console.log('requestStatus', requestStatus);
  //       if (requestStatus === RESULTS.GRANTED) {
  //         // Permission granted
  //         // Proceed with using location data
  //       } else if (requestStatus === RESULTS.DENIED) {
  //         // Permission denied
  //         // Display a message or handle the denial gracefully
  //       } else if (requestStatus === RESULTS.NEVER_ASK_AGAIN) {
  //         // Permission denied with "Never ask again" activated
  //         // Guide the user to app settings to enable the permission manually
  //         openAppSettings();
  //       }
  //     }
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  // requestLocationPermission();

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access Location',
          message: 'App wants to view your phone contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      ).then(androidContactPermission => {
        if (androidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location Permission granted');
        } else {
          console.log('Location permission denied', androidContactPermission);
        }
      });
    }
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Location</Text>
      </View>
    </SafeAreaView>
  );
};

export default Location;
