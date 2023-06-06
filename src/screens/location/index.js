// by chatgpt

import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationTrackingComponent = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    let watchId = null;

    const startLocationTracking = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission denied');
            return;
          }
        }

        watchId = Geolocation.watchPosition(
          position => {
            console.log('Latitude:', position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.log('Location tracking error:', error);
          },
          {enableHighAccuracy: true, distanceFilter: 100}, // Customize options as needed
        );
      } catch (error) {
        console.log('Location tracking error:', error);
      }
    };

    startLocationTracking();

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <>
      <Text>Location </Text>
      <Text>Latitude : {latitude}</Text>
      <Text>Longitude : {longitude}</Text>
    </>
  );
};

export default LocationTrackingComponent;
