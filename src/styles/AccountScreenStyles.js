import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
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
    infoContainer: {
        width: '60%',
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10, // Add some space between label and value
    },
    value: {
        fontSize: 16,
        color: '#555',
        textAlign: 'left',
    },
});

export default styles;