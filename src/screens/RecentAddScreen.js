import { SortBy } from "expo-media-library"
import React from "react"
import { ActivityIndicator, View } from "react-native"
import AppHeader from "../components/AppHeader"
import Screen from "../components/Screen"
import SongsList from "../components/SongsList"
import useMusicLibrary from "../hooks/useMusicLibrary"
import { colors } from "../theme/Colors"
import { globalStyles } from "../theme/GlobalStyles"

const RecentAddScreen = () => {
    const { assets, isLoadingMore, loadMore } = useMusicLibrary(
        SortBy.modificationTime
    );
    return (
        <Screen>
            <AppHeader title={"Recently Added"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={assets}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMore}
                    ListFooterComponent={() => isLoadingMore ? (
                        <ActivityIndicator size={"large"} color={colors.white} />) : null}
                />
            </View>
        </Screen>
    )
}

export default RecentAddScreen
