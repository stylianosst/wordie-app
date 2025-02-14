import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
const PointsLayout = ({ icon, points, style }) => {
  return (
    <View style={[styles.circle, style]}>
      <Icon name={icon} type='material' color='#fff' size={22} />
      <Text style={styles.text}>{points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 75,
    height: 25,
    borderRadius: 35 / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    alignItems: 'center'
  }
});

export default PointsLayout;