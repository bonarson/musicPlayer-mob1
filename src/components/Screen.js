import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme/Colors";

// const { width, height } = Dimensions.get("window");

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
        flex: 1,
        // width,
        // height,
        backgroundColor: colors.primary,
        paddingTop: Constants.statusBarHeight,
        marginTop:-20,
    }
});
