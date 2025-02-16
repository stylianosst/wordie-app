import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const isDesktop = Platform.OS === 'web';
  const { state, signin, clearErrorMessage } = useContext(Context);
  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );
  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      <AuthForm
        headerText="Συνδεθείτε στο Wordie"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Σύνδεση"
        clearErrorMessage={clearErrorMessage}
      />
      <NavLink
        text="Δεν έχετε λογαριασμό; Εγγραφείτε εδώ."
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  header: () => false,
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

export default SigninScreen;