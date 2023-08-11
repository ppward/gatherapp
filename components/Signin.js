import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import icons from '../assets/icons';

const googleWebClientId =
  '217081821472-n2r6i504k9sl88kmmji0niflgaeeqee9.apps.googleusercontent.com';

export default function Signin(props) {
  const [idToken, setIdToken] = React.useState('');
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleWebClientId,
    });
  }, []);

  const onPressGoogleBtn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();

      console.log('idToekn : ', idToken);
      if (idToken) {
        setIdToken(idToken);
        console.log(idToken);
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        console.log('loggedIn');
        const {uid, email, displayName, accessToken} = user;
        props.navigation.reset({
          routes: [
            {name: '메인', params: {uid, email, displayName, accessToken}},
          ],
        });
      } else {
        setLoggedIn(false);
        console.log('loggedOut');
      }
    });
  }, []);

  const logoShakeAnimation = React.useRef(new Animated.Value(0)).current;
  const shakeCount = 2;

  React.useEffect(() => {
    const shakeAnimation = Animated.sequence([
      Animated.timing(logoShakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoShakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoShakeAnimation, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoShakeAnimation, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoShakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]);

    let iterations = 0;
    const animationLoop = () => {
      Animated.loop(shakeAnimation, {iterations: shakeCount}).start(() => {
        iterations++;
        if (iterations < shakeCount) {
          animationLoop();
        }
      });
    };

    animationLoop();

    return () => {
      logoShakeAnimation.stopAnimation();
    };
  }, [logoShakeAnimation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={icons.LOGO}
        style={[styles.logo, {transform: [{translateX: logoShakeAnimation}]}]}
      />
      <Text style={styles.title}>여러 사람과의 특별한 만남!</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={{...styles.buttonText, color: 'black'}}>Log In</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.orText}>OR</Text>
      <GoogleSigninButton onPress={onPressGoogleBtn} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  input: {
    width: 240,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
  },
  loginButton: {
    width: 100,
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
});
