import * as MusicLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import AppHeader from "../components/AppHeader";
import Card from "../components/Card";
import Screen from "../components/Screen";
import { globalStyles } from "../theme/GlobalStyles";

const FolderScreen = ({ navigation }) => {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        // Utilisation de getAlbumsAsync pour récupérer les albums, que vous pouvez traiter comme des dossiers
        MusicLibrary.getAlbumsAsync()
            .then((albums) => {
                // Vous pouvez ajuster la manière dont vous organisez ces albums (en les traitant comme des dossiers)
                setFolders(albums);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des albums:", error);
            });
    }, []);

    return (
        <Screen>
            <AppHeader title={"Folders"} searchIcon />
            <View style={globalStyles.container}>
                <FlatList
                    data={folders}
                    renderItem={({ item }) => (
                        <Card
                            {...item}
                            type={"folder"}
                            onPress={() => navigation.navigate("SongsList", {
                                folderId: item.id,
                                title: `Folders - ${item.title}`
                            })}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Screen>
    );
};

export default FolderScreen;
