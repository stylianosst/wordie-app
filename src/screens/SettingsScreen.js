import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { Image } from 'react-native';
import styles from '../styles/AccountScreenStyles';
import CircleIcon from '../components/CircleIcon';

const SettingsScreen = ({ navigation }) => {
  const { state, signout, getPlayerInfo } = useContext(AuthContext);

  useEffect(() => {
    console.log('useEffect called in SettingsScreen');
    getPlayerInfo();
  }, []);

  console.log(`state in SettingsScreen is ${JSON.stringify(state)}`);
  const { elo, level, points } = state.info || {};

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
      <Text style={styles.text}>Επίπεδο: {level} με {parseInt(elo, 10)} elo</Text>
      <Text style={styles.text}>Πόντοι: {points}</Text>
      <Spacer>
        <Button
          onPress={signout}
          color="#8A2BE2"
          title="ΑΠΟΣΥΝΔΕΣΗ"
        />
      </Spacer>
      <CircleIcon style={styles.back} icon="keyboard-arrow-left" onPress={() => navigation.navigate('Landing')} />
    </SafeAreaProvider>
  );
};

export default SettingsScreen;