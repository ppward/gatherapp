import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Maps from './layer_elements/Maps';
import Party from './layer_elements/Party';
import Rank from './layer_elements/Rank';
import Profile from './layer_elements/Profile';
import icons from '../assets/icons';
const Tab = createBottomTabNavigator();

const SecondLayer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="파티"
        component={Party}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? '#00bfff' : 'black',
                }}
                source={icons.NETWORK}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="지도"
        component={Maps}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? '#00bfff' : 'black',
                }}
                source={icons.MAP}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="랭크"
        component={Rank}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? '#00bfff' : 'black',
                }}
                source={icons.RANKING}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="프로필"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? '#00bfff' : 'black',
                }}
                source={icons.USER}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    width: 24,
    height: 24,
  },
});
export default SecondLayer;
