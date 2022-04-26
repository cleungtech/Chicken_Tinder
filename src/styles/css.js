import { 
    StyleSheet, 
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    credentials: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        margin: 25,
        alignItems: 'center',
        backgroundColor: '#ff9800',
        padding: 10,
        borderRadius: 10
    },
    placeholder: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    card: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});