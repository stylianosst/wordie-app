import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Context as KeyboardContext } from '../context/KeyBoardContext';

const CircleKeyboard = ({ keys: initialKeys }) => {
  const [keys, setKeys] = useState(initialKeys);
  const { state, updateKeyboardData } = useContext(KeyboardContext);
  const handleKeyPress = (key) => {
    updateKeyboardData(key);
  };

  const shuffleLetters = () => {
    let shuffledKeys = [...keys].sort(() => Math.random() - 0.5);
    setKeys(shuffledKeys);
  };

  return (
    <View style={styles.circle}>
      {keys && keys.map((key, index) => (
        <TouchableOpacity
          onTouchStart={() => { console.log('onTouchStart') }}
          key={index}
          style={[
            styles.key,
            {
              width: keys.length < 7 ? 50 : 40,
              height: keys.length < 7 ? 50 : 40,
              transform: [
                { rotate: `${(index * 360) / keys.length}deg` },
                { translateY: -70 },
                { rotate: `${-(index * 360) / keys.length}deg` },
              ],
            },
          ]}
          onPress={() => handleKeyPress(key)}
        >
          <Text style={styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => shuffleLetters()}>
        <Icon
          reverse
          name='shuffle-outline'
          type='ionicon'
          color='#fff'
          reverseColor='#000'
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    position: 'absolute',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  keyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CircleKeyboard;
