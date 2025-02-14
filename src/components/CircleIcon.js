import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
const CircleIcon = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.circle, style]} onPress={() => onPress(onPress)}>
      <Icon name={icon} type='material' color='#fff' size={25} />
      {/* <Text styles={styles.text}></Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text : {
    color: '#fff',
  }
});

export default CircleIcon;