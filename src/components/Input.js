import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../theme/Colors";


const Input = ({ placeholder, customStyles, ...otherProps }) => {

    return (
        <TextInput placeholder={placeholder}
            style={[styles.textInput, customStyles]}
            placeholderTextColor={colors.white}
            {...otherProps}
        />
    );

}
export default Input;

const styles = StyleSheet.create({
    textInput: {

        width: '80%',
        alignSelf: 'center',
        color: colors.white,
        borderBottomColor: colors.white,
        borderBottomWidth: 1,

    },
});