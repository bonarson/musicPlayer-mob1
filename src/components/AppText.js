import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../theme/Colors";

const AppText = ({ text, customStyles }) => (
    <Text style={[styles.text, customStyles]}>{text}</Text>
);


export default AppText;
const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontWeight: 'bolder',
        fontFamily: "italic",

    },
});