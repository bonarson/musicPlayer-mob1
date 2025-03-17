import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { get, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setFavorites,
    setMostPlayed,
    setPlaylists,
    setRecentlyPlayed
} from "./features/storage/storageSlice";
import RootNavigator from "./navigation/RootNavigation";

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        loadLocalData();  // Charger d'abord les données locales
        initializeData();  // Puis synchroniser avec Firebase
    }, []);

    /**
     * Récupère les données locales enregistrées avec AsyncStorage
     * et les envoie au Redux Store.
     */
    const loadLocalData = async () => {
        try {
            const favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
            const recentlyPlayed = JSON.parse(await AsyncStorage.getItem("recentlyPlayed")) || [];
            const mostPlayed = JSON.parse(await AsyncStorage.getItem("mostPlayed")) || [];
            const playlists = JSON.parse(await AsyncStorage.getItem("playlists")) || [];

            // Mettre à jour Redux avec les données locales
            dispatch(setFavorites(favorites));
            dispatch(setRecentlyPlayed(recentlyPlayed));
            dispatch(setMostPlayed(mostPlayed));
            dispatch(setPlaylists(playlists));
        } catch (error) {
            console.error("Erreur lors du chargement des données locales :", error);
        }
    };

    /**
     * Récupère les données depuis Firebase, les enregistre en local
     * et les met à jour dans Redux.
     */
    const initializeData = async () => {
        try {
            const db = getDatabase();
            
            // Récupération depuis Firebase
            const favoritesSnap = await get(ref(db, "favorites"));
            const favorites = favoritesSnap.exists() ? favoritesSnap.val() : [];

            const recentlyPlayedSnap = await get(ref(db, "recentlyPlayed"));
            const recentlyPlayed = recentlyPlayedSnap.exists() ? recentlyPlayedSnap.val() : [];

            const mostPlayedSnap = await get(ref(db, "mostPlayed"));
            const mostPlayed = mostPlayedSnap.exists() ? mostPlayedSnap.val() : [];

            const playlistsSnap = await get(ref(db, "playlists"));
            const playlists = playlistsSnap.exists() ? playlistsSnap.val() : [];

            // Stocker en local
            await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
            await AsyncStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
            await AsyncStorage.setItem("mostPlayed", JSON.stringify(mostPlayed));
            await AsyncStorage.setItem("playlists", JSON.stringify(playlists));

            // Mettre à jour Redux
            dispatch(setFavorites(favorites));
            dispatch(setRecentlyPlayed(recentlyPlayed));
            dispatch(setMostPlayed(mostPlayed));
            dispatch(setPlaylists(playlists));

        } catch (error) {
            console.log("Erreur lors de la récupération des données Firebase :", error);
        }
    };

    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
};

export default Main;
