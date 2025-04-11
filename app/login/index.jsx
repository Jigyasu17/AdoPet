import { View, Text, Image, ImageBackground, Pressable, StyleSheet, Animated } from 'react-native';
import React, { useCallback, useState } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const [scaleValue] = useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // Handle successful authentication
      } else {
        // Handle failed authentication
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <ImageBackground 
      source={require('./../../assets/images/ppaw.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <View style={styles.textBackground}>
            <Text style={styles.heading}>Ready to make a new Friend</Text>
          </View>
          <View style={styles.textBackground}>
            <Text style={styles.subheading}>Let's AdoPet the pet you like and make their life happy</Text>
          </View>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
          </Animated.View>
        </View>
        <Image source={require('./../../assets/images/logic.png.png')} style={styles.centerImage} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adds a slight overlay for text readability
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  textBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 5,
  },
  textWrapper: {
    backgroundColor: 'rgba(218, 231, 40, 0.85)', // Softer elegant background
    borderRadius: 20, // Rounded corners
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Adds shadow for Android
  },
  heading: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 28,
    textAlign: 'center',
    color: '#333', // Slightly softer black for readability
    fontWeight: '700',
  },
  subheading: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#555', // Dark gray for contrast
    fontWeight: '600',
    marginTop: 5,
  },
  button: {
    padding: 20,
    marginTop: 30,
    width: 200,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#FFDB58',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  centerImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginTop: 20,
  },
});
