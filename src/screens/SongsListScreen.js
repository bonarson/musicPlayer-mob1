import { useRoute } from "@react-navigation/native";
import * as MusicLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AppHeader from "../components/AppHeader";
import Screen from "../components/Screen";
import SongsList from "../components/SongsList";
import { globalStyles } from "../theme/GlobalStyles";

const SongsListScreen = () => {
    const { albumName, artisId, genreId, title } = useRoute().params; // Assurez-vous que vous accédez bien aux paramètres
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        if (albumName) {
            fetchAlbumsAssets(); // Appel de la fonction pour albums
        } else if (artisId) {
            fetchArtistsAssets(); // Appel de la fonction pour artistes
        } else if (genreId) {
            fetchGenresAssets(); // Appel de la fonction pour genres
        }
    }, [albumName, artisId, genreId]); // Dépendances mises à jour

    const fetchAlbumsAssets = async () => {
        try {
            const songs = await MusicLibrary.getAssetsAsync({ album: albumName, mediaType: MusicLibrary.MediaType.audio });
            setAssets(songs.assets); // Filtrage des fichiers audio
        } catch (error) {
            console.error("Erreur de récupération des albums : ", error);
        }
    };

    const fetchArtistsAssets = async () => {
        try {
            const songs = await MusicLibrary.getAssetsAsync({ artist: artisId, mediaType: MusicLibrary.MediaType.audio });
            setAssets(songs.assets); // Filtrage des fichiers audio
        } catch (error) {
            console.error("Erreur de récupération des artistes : ", error);
        }
    };

    const fetchGenresAssets = async () => {
        try {
            const songs = await MusicLibrary.getAssetsAsync({ genre: genreId, mediaType: MusicLibrary.MediaType.audio });
            setAssets(songs.assets); // Filtrage des fichiers audio
        } catch (error) {
            console.error("Erreur de récupération des genres : ", error);
        }
    };

    return (
        <Screen>
            <AppHeader title={title} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={assets} />
            </View>
        </Screen>
    );
};

export default SongsListScreen;
