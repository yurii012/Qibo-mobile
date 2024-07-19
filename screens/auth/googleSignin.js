import React, { useState, useEffect } from 'react';
import { Button, Platform, StyleSheet, View, Text, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';

// Replace with your actual Google Client ID
const CLIENT_ID = '581856682342-46a024dgi7uhacs9ucra5trilq366vf1.apps.googleusercontent.com';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
  // For standalone apps
  native: "qibo-app://redirect", 
  // Web (if needed)
  web: "https://auth.expo.io/@kaithompson/qibo"
});

const GoogleSignIn = () => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['profile', 'email'],
      redirectUri,
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    }
  );
  
  useEffect(() => {
    if (response) {
      if (response.type === 'success') {
        const { authentication } = response.params;
        console.log('Authentication', authentication);
        Alert.alert('Authenticated', `Token: ${authentication.accessToken}`, [{ text: 'OK' }]);
        // Handle the authentication result here
      } else if (response.type === 'error') {
        Alert.alert('Error', `Authentication failed: ${response.error.message}`, [{ text: 'OK' }]);
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Sign in with Google"
        onPress={() => {
          promptAsync({ useProxy });
        }}
      />
      {response?.type === 'error' && <Text style={styles.errorText}>Error: {response.error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  }
});

export default GoogleSignIn;