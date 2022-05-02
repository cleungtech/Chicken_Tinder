import { 
    TextInput,  
} from 'react-native';

import styles from "../../styles/css.js";

// need to find a way to lower state so the entire screen is not
// re-rendered when the user types into the textinput

export const Credentials = (props) => {
    return (
      <TextInput
        style={styles.credentials}
        placeholder={props.inputfield}
        onChangeText={props.change_function}
      />
    );
}