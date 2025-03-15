import React, { useState } from "react";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import AppHeader from "../components/AppHeader";
import LibraryFlatlist from "../components/LibraryFlatlist";
import Screen from '../components/Screen';
import Song from "../components/Song";
import { libraryData } from "../data/LibraryData";
import { songs } from "../data/Songs";
import { colors } from "../theme/Colors";


const Library = () => {
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
            <FlatList
                data={songs}
                renderItem={({ item }) => <Song  {...item} />}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View >
    )

};

const Artists = () => {
    return (
        <View style={{ flex: 1 }}>
            <LibraryFlatlist data={libraryData} />
        </View>
    )
};

const Albums = () => {
    return (
        <View style={{ flex: 1 }}>
            <LibraryFlatlist data={libraryData} />
        </View>
    )
};

const Genres = () => {
    return (
        <View style={{ flex: 1 }}>
            <LibraryFlatlist data={libraryData} />
        </View>
    )

};


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