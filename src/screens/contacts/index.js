import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Contacts from 'react-native-contacts';
import ListItem from './components/ListItem';
import styles from './styles';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Access Contacts',
        message: 'App wants to view your phone contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(androidContactPermission => {
        if (androidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Contacts Permission granted');
          loadContacts();
        } else {
          console.log('Contacts permission denied', androidContactPermission);
        }
      });
    }
  }, []);

  const sortContacts = contacts => {
    contacts.sort((a, b) => {
      if (a.givenName.toLowerCase() < b.givenName.toLowerCase()) {
        return -1;
      }
      if (a.givenName.toLowerCase() > b.givenName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    // console.log('contacts =>>', contacts);
    setContacts(contacts);
  };

  const loadContacts = () => {
    Contacts.getAll().then(contacts => {
      sortContacts(contacts);
    });
  };

  const search = text => {
    // console.log('text', text);
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        sortContacts(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        sortContacts(contacts);
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'pink'
        }}>
        <TextInput
          placeholder="Search here..."
          onChangeText={search}
          style={styles.searchinput}
        />
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
          }}>
          <ListItem contacts={contacts} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contact;
