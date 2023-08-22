import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useState} from 'react';
import * as Location from 'expo-location';
import icons from '../../assets/icons';

import CoodData from '../etc_elements/CoodData';

const API_KEY = 'AIzaSyCbqqW_U3VQSunxkN97dOg37eN4JnxzDjw';

const coordSet = (lat, lng) => {
  coord = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };
};

export default function Maps(props) {
  const [location, setLocation] = React.useState([0, 0]);
  // const [errorMsg, setErrorMsg] = React.useState(null);
  // React.useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     const {
  //       coords: { latitude, longitude },
  //     } = await Location.getCurrentPositionAsync(); //위치정보중 latitude와 longitude만을 받아오는 함수
  //     setLocation(latitude, longitude);
  //   })();
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const [pushPlus, setPushPlus] = React.useState(false); //plus버튼을 눌렀을 때
  /// place api 자동완성 코드
  const [query, setQuery] = React.useState('');
  const [predictions, setPredictions] = React.useState([]);
  const country = 'KR';
  const handlePredictionPress = predict => {
    setQuery(predict);
  };
  const handleQueryChange = async value => {
    ///아직 해야됨..
    setQuery(value);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          value,
        )}&key=${API_KEY}&components=country:${country}`,
      );

      if (response.ok) {
        const data = await response.json();
        if (data.predictions) {
          const topPredictions = data.predictions.slice(0, 4);
          setPredictions(topPredictions);
        } else {
          setPredictions([]);
        }
      } else {
        setPredictions([]);
      }
    } catch (error) {
      setPredictions([]);
    }
  };
  ///place api  여기까지

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {CoodData == null && (
          <View
            style={{
              ...styles.container,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 23,
              }}>
              현재 사용자의 위치를 가져오는 중입니다..
            </Text>
          </View>
        )}
        {CoodData && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={
              CoodData
              // latitude: 36.7985,
              // longitude: 127.0758,
              // latitudeDelta: 0.09,
              // longitudeDelta: 0.04,
            }
            region={CoodData /*coordSet(Location[0], location[1])*/}
            showsMyLocationButton={true}
            onUserLocationChange={
              CoodData /*coordSet(Location[0], location[1])*/
            }
            showsUserLocation={true}
          />
        )}
        <View style={styles.iconPosition}>
          <TouchableOpacity
            onPress={() => (pushPlus ? setPushPlus(false) : setPushPlus(true))}>
            <Image style={styles.plusIcon} source={icons.PLUS}></Image>
          </TouchableOpacity>
        </View>
        {pushPlus === true && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="장소를 검색해주세요"
              value={query}
              onChangeText={handleQueryChange}
            />

            <ScrollView
              style={{backgroundColor: 'lightgrey', borderRadius: 10}}>
              {predictions.map(prediction => (
                <View
                  style={{
                    backgroundColor: '#fff',
                    marginBottom: 5,
                    borderWidth: 0.2,
                    padding: 5,
                    borderRadius: 10,
                    borderColor: 'gray',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      handlePredictionPress(prediction.description)
                    }>
                    <Text
                      key={prediction.place_id}
                      style={styles.predictionText}>
                      {prediction.description}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {pushPlus === true && (
          <View style={{position: 'absolute', bottom: 20, left: '45%'}}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#4caf50',
                borderRadius: 10,
              }}
              onPress={() => props.navigation.navigate('파티생성')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                다음
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  plusIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  input: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  iconPosition: {
    position: 'absolute',
    top: '81%',
    right: 15,
  },
  inputContainer: {
    position: 'absolute',
    top: 25,
    left: 20,
    right: 20,
    marginTop: 20,
    padding: 15,

    borderRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  predictionsContainer: {
    maxHeight: 120,
    overflow: 'scroll',
  },
});
