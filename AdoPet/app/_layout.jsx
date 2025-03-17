import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

const { secureStore } = require("@clerk/clerk-expo/secure-store")

const tokenCache ={
    async getToken(key) {
        try {
            const item = await SecureStore.getItemAsync(key)
            if (item) {
                console.log(`${key} was used \n`)
            } else {
                console.log('No values stored under key:' + key)
            }
            return item
        }   catch(error) {
            console.error('SecureStore get item error:', error)
            await SecureStore.deleteItemAsync(key)
            return null
        }
    },
    async saveToken(key, value) {
        try {
            return SecureStore.setItemAsync(key, value)
        }   catch (err) {
            return
        }
    },
}   

const originalConsoleLog = console.log;

console.log = (...args) => {
  if (args[0] && args[0].includes('__clerk_client_jwt was used')) {
    return; // Suppress the log
  }
  originalConsoleLog(...args);
};

export default function RootLayout() { 

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  useFonts({
    'Spacemono': require('./../assets/fonts/SpaceMono-Regular.ttf'),
  })

  return (
    <ClerkProvider 
    tokenCache={tokenCache}
     publishableKey={publishableKey}
     debug = {false} //disable debug logs
     >

      
  <Stack>
    <Stack.Screen name="index" />
    <Stack.Screen name="(tabs)" 
    options={{
      headerShown:false
    }}
    />
    <Stack.Screen name="login/index" 
    options={{
      headerShown:false
    }}
    />
  </Stack>
  </ClerkProvider>
  );
}
