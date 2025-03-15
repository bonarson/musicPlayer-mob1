import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../theme/Colors";

const { width, height } = Dimensions.get("window");

const Screen = ({ children, customStyles }) => {
    return (
        <View style={[styles.container, customStyles]}>
            {children}
        </View>
    );
};

export default Screen;

const styles = StyleSheet.create({
    container: {
        width, 
        height, 
        backgroundColor: colors.primary,
        marginTop: 30,
    }
});
