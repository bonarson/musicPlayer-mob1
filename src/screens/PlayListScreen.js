import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import SelectSong from "../components/SelectSong";
import SongsList from "../components/SongsList";
import { updatePlaylists } from "../features/storage/storageSlice";
import useMusicLibrary from "../hooks/useMusicLibrary";
import { colors } from "../theme/Colors";
import { globalStyles } from "../theme/GlobalStyles";

const PlayListScreen = ({ route }) => {
    const { id } = route.params;
    const [showModal, setShowModal] = useState(false);
    const { assets, isLoadingMore, loadMore } = useMusicLibrary();
    const playlists = useSelector(state => state.storage.playlists);
    const [playlist, setPlaylist] = useState(null);
    const [tempItems, setTempItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setPlaylist(playlists.find(playlist => playlist.id === id));
    }, [playlists, id]);

    const clearPlaylist = () => {
        dispatch(updatePlaylists({
            ...playlist,
            assets: [],
        }));
    };

    const addSongToTempItems = (song) => {
        const index = tempItems.findIndex((tempItem) => tempItem.id === song.id);
        if (index === -1) {
            setTempItems([...tempItems, song]);
        } else {
            // If already in the list, do nothing or handle as needed
            console.log('Song already in tempItems');
        }
    };

    const validateChoices = () => {
        if (!playlist) {
            console.error("Playlist is undefined");
            return;
        }
    
        dispatch(
            updatePlaylists({
                ...playlist,
                assets: [...(playlist.assets || []), ...tempItems], 
            })
        );
    
        setShowModal(false);
        setTempItems([]);
    };
    

    return (
        <Screen>
            <AppHeader title={playlist?.title} plusIcon onPlusIconPress={() => setShowModal(true)} clearIcon
                onClearIconPress={clearPlaylist} />
            <View style={globalStyles.container}>
                <SongsList
                    songs={playlist?.assets}
                    playlist
                />
            </View>
            <Modal
                transparent
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContent}>
                    <View style={styles.flatlistContainer}>
                        <FlatList
                            data={assets}
                            renderItem={({ item }) => (
                                <SelectSong {...item} onSelect={addSongToTempItems} />
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            extraData={tempItems}
                            onEndReachedThreshold={0.5}
                            onEndReached={loadMore}
                            ListFooterComponent={() =>
                                isLoadingMore ? (
                                    <ActivityIndicator size="large" color={colors.white} />
                                ) : null
                            }
                        />
                    </View>
                    {tempItems.length > 0 && (
                        <TouchableOpacity onPress={validateChoices} style={styles.done}>
                            <AppText text={"Done"} />
                        </TouchableOpacity>
                    )}
                </View>
            </Modal>
        </Screen>
    );
};

export default PlayListScreen;

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    flatlistContainer: {
        flex: 1,
        marginTop: 20,
    },
    flatlistContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    done: {
        backgroundColor: colors.danger,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        
    }

});
