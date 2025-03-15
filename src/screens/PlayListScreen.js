import React from "react"
import { View } from "react-native"
import AppHeader from "../components/AppHeader"
import Screen from "../components/Screen"
import SongsList from "../components/SongsList"
import { songs } from "../data/Songs"
import { globalStyles } from "../theme/GlobalStyles"

const PlayListScreen = () => {
    return (
        <Screen>
            <AppHeader title={"New PlayList"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={songs} />
            </View>
        </Screen>
    )
}

export default PlayListScreen;

