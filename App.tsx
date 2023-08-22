import React from 'react';
import {View} from 'react-native';
import Signin from './components/Signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstLayer from './components/FirstLayer';
import * as Location from 'expo-location';
import CoodData from './components/etc_elements/CoodData';
import CreateParty from './components/CreateParty';

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync(); //위치정보중 latitude와 longitude만을 받아오는 함수

      CoodData.latitude = latitude;
      CoodData.longitude = longitude;
    })();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="로그인" component={Signin} />
        <Stack.Screen name="메인" component={FirstLayer} />
        <Stack.Screen name="파티생성" component={CreateParty} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
