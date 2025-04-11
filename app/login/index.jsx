import { View, Text, Image, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession(); // Ensure session is completed

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }), // Fixed redirect URL
      });

      if (createdSessionId) {
        console.log('Authentication successful!');
      } else {
        console.log('Sign-in or sign-up required.');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow]); // Added dependency

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image source={require('./../../assets/images/login.png')}
        style={{ width: '100%', height: 500 }}
      />
      <View style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, textAlign: 'center' }}>
          Ready to make a new friend?
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 18, textAlign: 'center', color: Colors.GRAY }}>
          Let's adopt the pet which you like and make their life happy again
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14,
          }}
        >
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center' }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
