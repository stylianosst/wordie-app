import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Context as KeyboardContext } from '../context/KeyBoardContext';

const CircleKeyboard = ({ keys: initialKeys }) => {
  const [keys, setKeys] = useState(initialKeys);
  const [clickedKeys, setClickedKeys] = useState([]);
  const { state, updateKeyboardData, clearKeyboardData } = useContext(KeyboardContext);

  useEffect(() => {
    if (state.keyboardData === "") {
      setClickedKeys([]);
    } else{
      console.log(`Keyboard Data: ${state.keyboardData}`);
    }
  }, [state.keyboardData]);

  const handleKeyPress = (key, index) => {
    if (!clickedKeys.includes(index)) {
      updateKeyboardData(key);
      setClickedKeys([...clickedKeys, index]);
    }
  };

  const shuffleLetters = () => {
    let shuffledKeys = [...keys].sort(() => Math.random() - 0.5);
    setKeys(shuffledKeys);
  };

  return (
    <View style={styles.circle}>
      {keys && keys.map((key, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.key,
            {
              width: keys.length < 7 ? 50 : 40,
              height: keys.length < 7 ? 50 : 40,
              backgroundColor: clickedKeys.includes(index) ? '#7e7e7e' : '#f0f0f0',
              transform: [
                { rotate: `${(index * 360) / keys.length}deg` },
                { translateY: -70 },
                { rotate: `${-(index * 360) / keys.length}deg` },
              ],
            },
          ]}
          onPress={() => handleKeyPress(key, index)}
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
  },
  keyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CircleKeyboard;