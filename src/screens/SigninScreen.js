import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  // useFocusEffect(
  //   useCallback(() => {
  //     clearErrorMessage();
  //   }, [])
  // );
  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Συνδεθείτε στο Wordie"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Σύνδεση"
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
});

export default SigninScreen;
