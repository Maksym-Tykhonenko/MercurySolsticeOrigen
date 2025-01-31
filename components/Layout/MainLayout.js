import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const MainLayout = ({children}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/bg/bg.jpg')}>
      {children}
    </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
