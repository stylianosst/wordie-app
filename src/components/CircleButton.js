import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CircleButton = ({ letter, onPress }) => (
  <TouchableOpacity style={styles.circle} onPress={() => onPress(letter)}>
    <Text style={styles.text}>{letter}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  circle: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
});

export default CircleButton;