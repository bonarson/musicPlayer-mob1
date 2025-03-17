import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import Screen from "../components/Screen";
import SongsList from "../components/SongsList";
import { globalStyles } from "../theme/GlobalStyles";

const RecentPlayScreen = () => {
    const recentlyPlayed = useSelector((state) => state.storage.recentlyPlayed);
    return (
        <Screen>
            <AppHeader title={"Recently Played"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={recentlyPlayed} />
            </View>
        </Screen>
    )
}

export default RecentPlayScreen;
