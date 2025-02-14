import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: 'white',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: 'white',
        textAlign: 'center',
        alignItems: 'center'
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)', // Semi-transparent background
        padding: 10,
        borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 5, // For Android shadow
    },
    cell: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wordRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    image: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
    },
    wordContainer: {
        top: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80%',
        gap: 10,
        marginTop: 15,
        marginBottom: 15
    },
    deleteContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleView: {
        flex: 1,
        top: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20%',
    },
    gavel: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    lightbulb: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    settings: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    points: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        fontSize: 16,
        color: 'blue',
    },
    timerContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
    },
    timerText: {
        color: 'white',
        fontSize: 16,
    },
});

export default styles;