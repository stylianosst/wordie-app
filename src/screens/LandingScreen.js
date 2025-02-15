import React from 'react';
import { View, Text, Button, ImageBackground, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/LandingScreenStyles';
import CircleIcon from '../components/CircleIcon';
// import image from '../../assets/landing.png'; // Import the image

const LandingScreen = ({ navigation }) => {
    const isDesktop = Platform.OS === 'web';

    return (
        <SafeAreaProvider style={styles.container} forceInset={{ top: 'always' }}>
            <ImageBackground
                source={isDesktop ? require('../../assets/landing2.png') : require('../../assets/landing.png')}
                style={styles.image}>
                <View style={styles.container}>
                    <View style={isDesktop ? styles.buttonContainer2 : styles.buttonContainer}>
                        <Text style={styles.text}>Καλώς ήρθατε στο woordie</Text>
                        <Button
                            color="#42c957"
                            title="ΞΕΚΙΝΗΣΤΕ ΤΟ ΠΑΙΧΝΙΔΙ"
                            onPress={() => navigation.navigate('Game')}
                        />
                    </View>
                </View>
                <CircleIcon style={styles.account} icon="person" onPress={() => navigation.navigate('Account')} />
                <CircleIcon style={styles.settings} icon="settings" onPress={() => navigation.navigate('Settings')} />
            </ImageBackground>
        </SafeAreaProvider>
    );
};

export default LandingScreen;