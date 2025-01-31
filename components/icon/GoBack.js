import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <Image
        source={require('../../assets/icons/back.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    right: '12%',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
});
