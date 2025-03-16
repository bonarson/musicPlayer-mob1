import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import AppHeader from "../components/AppHeader";
import Screen from '../components/Screen';
import Albums from "../tabs/Albums";
import Artists from "../tabs/Artists";
import Genres from "../tabs/Genres";
import Library from "../tabs/Library";
import { colors } from "../theme/Colors";


const renderScene = SceneMap({
    library: Library,
    artists: Artists,
    albums: Albums,
    genres: Genres,
});

const LibraryScreen = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const [routes] = useState([

        { key: "library", title: "Library" },
        { key: "artists", title: "Artists" },
        { key: "albums", title: "Albums" },
        { key: "genres", title: "Genres" },
    ]);

    return (
        <Screen>
            <AppHeader title={"Library"} searchIcon />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) =>
                    <TabBar
                        {...props}
                        style={styles.TabBar}
                        indicatorStyle={styles.tabBarIndicatorStyle}

                    />}
            />
        </Screen>
    )
};

export default LibraryScreen;

const styles = StyleSheet.create({
    TabBar: {
        backgroundColor: colors.primary,
    },
    tabBarIndicatorStyle: {
        backgroundColor: colors.white,
    },
})