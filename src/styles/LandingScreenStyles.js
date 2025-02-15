import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        color: '#FFF',
        margin: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.2)',
        borderRadius: 20,
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer2: {

        width: '25%',
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.2)',
        borderRadius: 20,
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
    },
    account: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    settings: {
        position: 'absolute',
        right: 10,
        top: 10,
    }
});
export default styles;