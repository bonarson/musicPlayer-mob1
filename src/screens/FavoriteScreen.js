import React from "react";
import { StyleSheet, View } from "react-native";
import AppHeader from "../components/AppHeader";
import Screen from "../components/Screen";
import SongsList from "../components/SongsList";
import { songs } from "../data/Songs";
import { globalStyles } from "../theme/GlobalStyles";

const FavoriteScreen = () => {
    return (
        <Screen>
            <AppHeader title={"Favorites"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={songs} />
            </View>
        </Screen>
    )
}

export default FavoriteScreen;

const styles = StyleSheet.create({});