import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { instance } from '../../config/axios';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import GlobalStyles from '../../config/styles';
import { authActionLogin } from '../../services/authService';

const LoginScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 32,
      width: '100%',
      height: '100%',
    },
    fontTitle: {
      fontFamily: 'Inter_Regular',
      fontWeight: 'bold',
      fontSize: 32
    },
    hr: {
      width: '100%',
      borderColor: '#9f9f9f',
      marginVertical: 12,
      borderTopWidth: 1
    },
    textInput: {
      borderColor: '#9f9f9f',
      borderWidth: 1,
      padding: 8,
      borderRadius: 8,
      marginVertical: 4,
    },
    formGroup: {
      marginBottom: 8
    }
  });

  const [formUsername, setFormUsername] = useState();
  const [formPassword, setFormPassword] = useState();
  const [shownError, setShownError] = useState(false);

  const handleSubmit = async () => {
    try {
      const httpRequest = await instance.post(
      '/login_check',
      {
        'username': formUsername,
        'password': formPassword,
      }
      );
    

    if (httpRequest.data.token) {
      await AsyncStorageLib.setItem('token', httpRequest.data.token);
      navigation.replace('Logged');
    } else {
      triggerError();
    }
  } catch (e) {
    console.warn(e);
  }
  }

  const triggerError = () => {
    if (shownError) { return; }
    setShownError(true);
    setTimeout(() => { setShownError(false) }, 3000);
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.fontTitle}>Connexion</Text>
      <View style={styles.hr}/>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.textInput}
          placeholder='Adresse e-mail'
          onChangeText={(text) => { setFormUsername(text); }}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Mot de passe'
          onChangeText={(text) => { setFormPassword(text); }}
        />
      </View>

      <Button
        onPress={handleSubmit}
        color="#261F18"
        title="Se connecter"
        borderRadius={12}
      />
    </View>
  );
};

export default LoginScreen;
