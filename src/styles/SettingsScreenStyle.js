import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: '#000',
        margin: 10,
    },
    image: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: 100,
        height: 120,
        borderRadius: 5,
        marginBottom: 5,
    },
    back: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
});

export default styles;