import { 
    StyleSheet, 
} from 'react-native';

export const chicken_colors = {
    red: '#ff6a6a',
    yellow: '#ecaa1d',
    red_light: '#fc9797',
    yellow_light: '#eace92',
    yellow_dark:'#b87f04',
}

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
        backgroundColor: 'white',
    },
    button: {
        marginTop: 30,
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: chicken_colors.yellow_light,
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
    vote_button: {
        backgroundColor: 'rgba(128, 128, 128, 0.0)',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 50
    },
    vote_icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 10,
    },


    welcome_header: {
        flex: 1,
        backgroundColor: chicken_colors.red,
        alignItems: 'center',
        justifyContent: 'center',
      },
    header: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome_container: {
        flex: 1,
        backgroundColor: chicken_colors.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    container_inner: {
        margin: '20',
        alignItems: 'center',
    },
    no_click_button: {
        marginTop: 30,
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: chicken_colors.red,
    },
    image_container: {
        marginTop: 30,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        borderColor: chicken_colors.red_light,
        borderWidth: 5,
    },
    button_text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'black',
    },
    title_text: {
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
    },
    lobby_text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: chicken_colors.red,
    },
    image_rounded: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    image_icon: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 10,
    },
});