import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate("Home");
        }, 2000);
        return () => {
            clearTimeout(timeout);
        }
    }, [])


    return (
        <Screen customStyles={styles.container}>
            <Image source={require("../../assets/icon.png")}
                style={styles.image}
                resizeMethod="contain"
            />
            <AppText text={"Welcome"} customStyles={styles.title} />
        </Screen>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    title: {
        fontSize: 40,
    },
});