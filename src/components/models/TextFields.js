import { 
    TextInput,  
} from 'react-native';

import styles from "../../styles/css.js";

export const Credentials = (props) => {
    return (
      <TextInput
        style={styles.credentials}
        placeholder={props.inputfield}
        onChangeText={props.change_function}
      />
    );
}