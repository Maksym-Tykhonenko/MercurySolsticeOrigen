import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DiaryIcon = () => {
  const navigation = useNavigation();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startBounceAnimation();
  }, []);

  const startBounceAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const bounceInterpolation = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10], // Adjust this value to control bounce height
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('DiaryDetails')}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{translateY: bounceInterpolation}],
            },
          ]}>
          <Image
            source={require('../../assets/icons/diary.png')}
            style={styles.icon}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    right: 50,
  },
  iconContainer: {
    // Add shadow or other styling here if needed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default DiaryIcon;
