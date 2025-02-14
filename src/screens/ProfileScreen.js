import React from 'react';
import { Button, View, Text } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
    return (
        <View>
            < Button
                title="Go to landing"
                onPress={() =>
                    navigation.navigate('Landing')
                }
            />
            <Text>This is {route.params.name}'s profile</Text>
        </View>
    );
};
export default ProfileScreen;