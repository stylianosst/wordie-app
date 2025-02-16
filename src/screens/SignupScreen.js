import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
  const isDesktop = Platform.OS === 'web';
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      <AuthForm
        headerText="Εγγραφή στο Wordie"
        errorMessage={state.errorMessage}
        submitButtonText="Εγγραφή"
        onSubmit={signup}
        clearErrorMessage={clearErrorMessage}
      />
      <NavLink
        routeName="Signin"
        text="Έχετε ήδη λογαριασμό; Συνδεθείτε!"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
  },
    desktopContainer: {
      width: '50%',
      alignSelf: 'center',
  },
});

export default SignupScreen;