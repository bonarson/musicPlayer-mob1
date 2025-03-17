import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import Screen from "../components/Screen";
import SongsList from "../components/SongsList";
import { globalStyles } from "../theme/GlobalStyles";

const FavoriteScreen = () => {
    const favorites = useSelector((state) => state.storage.favorites);

    return (
        <Screen>
            <AppHeader title={"Favorites"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={favorites} />
            </View>
        </Screen>
    )
}

export default FavoriteScreen;

const styles = StyleSheet.create({});