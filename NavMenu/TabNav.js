import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Timer, Diary, Advice, Settings} from '../screen/T';
import GameWelcomeScreen from '../screen/T/GameWelcomeScreen';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFD700', // Golden color for active icons
        tabBarInactiveTintColor: '#FFFFFF', // White color for inactive icons
      }}>
      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcon/timer.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : '#FFFFFF'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcon/thumb.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : '#FFFFFF'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Advice"
        component={Advice}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcon/sun.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : '#FFFFFF'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GameWelcomeScreen"
        component={GameWelcomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcon/game.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : '#FFFFFF'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcon/settings.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FFD700' : '#FFFFFF'},
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0A1E42',
    borderTopWidth: 0,
    height: 90,
    paddingBottom: 8,
    paddingTop: 18,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
  tabIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
});

export default TabNav;
