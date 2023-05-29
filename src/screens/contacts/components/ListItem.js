import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from '../styles';

const ListItem = ({contacts}) => {
  const _renderItem = ({item}) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            <Text style={styles.txt}>
              {item?.givenName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {item?.givenName} {item?.middleName && item.middleName + ' '}
            {item?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {item?.phoneNumbers[0]?.number}
          </Text>
        </View>
      </View>
    );
  };
  const _keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  return (
    <FlatList
      data={contacts}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      style={{flexGrow: 1}}
      //   style={styles.list}
      // contentContainerStyle={{flexGrow: 1}}
    />
  );
};

export default ListItem;
