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
        flex: 1,
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
    search_icon: {
        width: 24,
        height: 24,
        opacity: 0.8,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome_header: {
        flex: 1,
        backgroundColor: chicken_colors.red,
        alignItems: 'center',
        justifyContent: 'center',
      },
    header: {
        position: 'absolute',
        width: '50%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    header_container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        resizeMode: 'contain',
        backgroundColor: '#fff',
    },
    welcome_container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        resizeMode: 'contain',
        backgroundColor: chicken_colors.red,
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
    bold_text_yellow: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: chicken_colors.yellow,
    },
    normal_text_yellow: {
        fontSize: 12,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: chicken_colors.yellow,
    },
    note_text_white: {
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0,
        color: 'white',
    },
    note_text_black: {
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0,
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
    result_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    error_text: {
        padding: 10
    },
    winner_name: {
        padding: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    winner_info: {
        padding: 5,
        textAlign: 'center'
    },
    winner_button_header: {
        fontWeight: 'bold',
    },
    maps_button: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: chicken_colors.yellow,
    },
    contact_button: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: chicken_colors.yellow,
    },

});