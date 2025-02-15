import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { Image } from 'react-native';
import styles from '../styles/AccountScreenStyles';
import CircleIcon from '../components/CircleIcon';

const AccountScreen = ({ navigation }) => {
  const { state, signout, getPlayerInfo } = useContext(AuthContext);

  useEffect(() => {
    console.log('useEffect called in AccountScreen');
    getPlayerInfo();
  }, []);

  console.log(`state in AccountScreen is ${JSON.stringify(state)}`);
  const { elo, level, points, email } = state.info || {};

  return (
    <SafeAreaProvider forceInset={{ top: 'always' }} style={styles.container}>
      <Spacer>
        <Image
          style={styles.image}
          source={{
            uri: 'https://img.icons8.com/?size=512&id=111473&format=png',
          }}
        />
      </Spacer>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Επίπεδο:</Text>
          <Text style={styles.value}>{level} ({parseInt(elo, 10)} elo)</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Πόντοι:</Text>
          <Text style={styles.value}>{points}</Text>
        </View>
      </View>
      <Spacer>
        {/* <Button
          onPress={signout}
          color="#8A2BE2"
          title="ΑΠΟΣΥΝΔΕΣΗ"
        /> */}
      </Spacer>
      <CircleIcon style={styles.back} icon="keyboard-arrow-left" onPress={() => navigation.navigate('Landing')} />
    </SafeAreaProvider>
  );
};

export default AccountScreen;